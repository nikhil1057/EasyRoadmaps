import express from 'express'
import multer from 'multer'
import session from 'express-session'
import fs from 'fs'
import path from 'path'
import {
  findUserByEmail,
  getContentIndex,
  getEditableTopicPage,
  getPublishedTopicPage,
  getSessionUser,
  getTopicPageRevisions,
  publishTopicPage,
  sanitizeUser,
  saveAsset,
  saveTopicPageDraft,
  verifyUserPassword,
} from './store.mjs'

const app = express()
const port = Number(process.env.PORT || 8787)
const root = process.cwd()
const uploadDir = path.join(root, 'server', 'uploads')
const distDir = path.join(root, 'dist')

fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || '') || '.bin'
    const safeBase = path
      .basename(file.originalname || 'upload', ext)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    cb(null, `${Date.now()}-${safeBase || 'asset'}${ext}`)
  },
})

const upload = multer({ storage })

app.use(express.json({ limit: '10mb' }))
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'easyroadmaps-local-session',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  }),
)
app.use('/uploads', express.static(uploadDir))

app.use((req, _res, next) => {
  const userId = req.session?.userId
  req.user = userId ? getSessionUser(userId) : null
  next()
})

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    res.status(401).json({ error: 'Admin authentication required.' })
    return
  }

  next()
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, user: sanitizeUser(req.user) })
})

app.get('/api/auth/session', (req, res) => {
  res.json({ user: sanitizeUser(req.user) })
})

app.post('/api/auth/login', (req, res) => {
  const email = String(req.body?.email || '').trim().toLowerCase()
  const password = String(req.body?.password || '')
  const user = findUserByEmail(email)

  if (!user || !verifyUserPassword(user, password)) {
    res.status(401).json({ error: 'Invalid email or password.' })
    return
  }

  req.session.userId = user.id
  req.session.save(() => {
    res.json({ user: sanitizeUser(user) })
  })
})

app.post('/api/auth/logout', (req, res) => {
  if (!req.session) {
    res.json({ ok: true })
    return
  }

  req.session.destroy(() => {
    res.clearCookie('connect.sid')
    res.json({ ok: true })
  })
})

app.get('/api/topic-page/:topicId', (req, res) => {
  const topicId = req.params.topicId
  const entry = getPublishedTopicPage(topicId)
  res.json({ item: entry })
})

app.get('/api/admin/topic-page-index', requireAdmin, (_req, res) => {
  res.json({ items: getContentIndex() })
})

app.get('/api/admin/topic-page/:topicId', requireAdmin, (req, res) => {
  const topicId = req.params.topicId
  const entry = getEditableTopicPage(topicId)
  res.json({ item: entry })
})

app.get('/api/admin/topic-page/:topicId/revisions', requireAdmin, (req, res) => {
  const topicId = req.params.topicId
  res.json({ items: getTopicPageRevisions(topicId) })
})

app.put('/api/admin/topic-page/:topicId', requireAdmin, (req, res) => {
  const topicId = req.params.topicId
  const payload = req.body ?? {}
  const entry = saveTopicPageDraft(
    topicId,
    {
      title: payload.title ?? '',
      summary: payload.summary ?? '',
      contentHtml: payload.contentHtml ?? '',
      contentJson: payload.contentJson ?? null,
    },
    req.user?.id ?? null,
  )

  res.json({ item: entry })
})

app.post('/api/admin/topic-page/:topicId/publish', requireAdmin, (req, res) => {
  const topicId = req.params.topicId
  const entry = publishTopicPage(topicId, req.user?.id ?? null)

  if (!entry) {
    res.status(404).json({ error: 'Topic page not found.' })
    return
  }

  res.json({ item: entry })
})

app.post('/api/admin/topic-page/:topicId/revisions/:revisionId/restore', requireAdmin, (req, res) => {
  const topicId = req.params.topicId
  const revisionId = Number(req.params.revisionId)
  const entry = restoreTopicPageRevision(topicId, revisionId, req.user?.id ?? null)

  if (!entry) {
    res.status(404).json({ error: 'Revision not found.' })
    return
  }

  res.json({ item: entry })
})

app.post('/api/admin/uploads/image', requireAdmin, upload.single('file'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded.' })
    return
  }

  const url = `/uploads/${req.file.filename}`
  const asset = saveAsset({
    topicId: req.body?.topicId || null,
    url,
    storagePath: req.file.path,
    mimeType: req.file.mimetype,
    sizeBytes: req.file.size,
    uploadedBy: req.user?.id ?? null,
  })

  res.json({ url, asset })
})

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir))
  app.use((req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      next()
      return
    }

    res.sendFile(path.join(distDir, 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`EasyRoadmaps server running on http://localhost:${port}`)
})

