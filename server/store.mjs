import fs from 'fs'
import path from 'path'
import Database from 'better-sqlite3'
import bcrypt from 'bcryptjs'

const ROOT = process.cwd()
const DATA_DIR = path.join(ROOT, 'server', 'data')
const DB_PATH = path.join(DATA_DIR, 'easyroadmaps.db')
const LEGACY_STORE_PATH = path.join(DATA_DIR, 'topic-content.json')

fs.mkdirSync(DATA_DIR, { recursive: true })

const db = new Database(DB_PATH)
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS topic_pages (
    topic_id TEXT PRIMARY KEY,
    title TEXT NOT NULL DEFAULT '',
    summary TEXT NOT NULL DEFAULT '',
    content_html TEXT NOT NULL DEFAULT '',
    content_json TEXT,
    status TEXT NOT NULL DEFAULT 'draft',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    updated_by INTEGER,
    published_at TEXT,
    published_by INTEGER,
    FOREIGN KEY(updated_by) REFERENCES users(id),
    FOREIGN KEY(published_by) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS topic_page_revisions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    topic_id TEXT NOT NULL,
    title TEXT NOT NULL DEFAULT '',
    summary TEXT NOT NULL DEFAULT '',
    content_html TEXT NOT NULL DEFAULT '',
    content_json TEXT,
    status TEXT NOT NULL DEFAULT 'draft',
    note TEXT,
    created_at TEXT NOT NULL,
    updated_by INTEGER,
    FOREIGN KEY(updated_by) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS assets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    topic_id TEXT,
    url TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    mime_type TEXT,
    size_bytes INTEGER,
    uploaded_by INTEGER,
    created_at TEXT NOT NULL,
    FOREIGN KEY(uploaded_by) REFERENCES users(id)
  );
`)

seedAdminUser()
migrateLegacyContent()

function nowIso() {
  return new Date().toISOString()
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

function sanitizeText(value) {
  return typeof value === 'string' ? value : ''
}

function parseJson(value) {
  if (!value) return null

  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

function stringifyJson(value) {
  return value ? JSON.stringify(value) : null
}

function escapeHtml(value) {
  return sanitizeText(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function blockToHtml(block) {
  if (!block || typeof block !== 'object') return ''

  if (block.type === 'heading' && block.text) {
    const level = block.level === 3 || block.level === 4 ? block.level : 2
    return `<h${level}>${escapeHtml(block.text)}</h${level}>`
  }

  if (block.type === 'quote' && block.text) {
    const citation = block.citation ? `<cite>${escapeHtml(block.citation)}</cite>` : ''
    return `<blockquote><p>${escapeHtml(block.text)}</p>${citation}</blockquote>`
  }

  if (block.type === 'list' && Array.isArray(block.items) && block.items.some((item) => sanitizeText(item).trim())) {
    const items = block.items
      .filter((item) => sanitizeText(item).trim())
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join('')
    return `<ul>${items}</ul>`
  }

  if (block.type === 'image' && block.url) {
    const alt = escapeHtml(block.alt || block.caption || '')
    const caption = block.caption ? `<figcaption>${escapeHtml(block.caption)}</figcaption>` : ''
    return `<figure><img src="${escapeHtml(block.url)}" alt="${alt}" />${caption}</figure>`
  }

  if (block.type === 'link' && block.url) {
    const title = escapeHtml(block.title || block.url)
    const description = block.description ? `<p>${escapeHtml(block.description)}</p>` : ''
    return `<p><a href="${escapeHtml(block.url)}" target="_blank" rel="noreferrer">${title}</a></p>${description}`
  }

  if (block.text) {
    return `<p>${escapeHtml(block.text)}</p>`
  }

  return ''
}

function blocksToHtml(blocks = [], resources = []) {
  const sections = Array.isArray(blocks) ? blocks.map((block) => blockToHtml(block)).filter(Boolean) : []

  if (Array.isArray(resources) && resources.length > 0) {
    const resourceItems = resources
      .filter((resource) => sanitizeText(resource?.url).trim())
      .map((resource) => {
        const title = escapeHtml(resource.title || resource.url)
        const note = resource.note ? `<p>${escapeHtml(resource.note)}</p>` : ''
        return `<li><a href="${escapeHtml(resource.url)}" target="_blank" rel="noreferrer">${title}</a>${note}</li>`
      })
      .join('')

    if (resourceItems) {
      sections.push(`<h2>References</h2><ul>${resourceItems}</ul>`)
    }
  }

  return sections.join('')
}

function seedAdminUser() {
  const count = db.prepare('SELECT COUNT(*) AS count FROM users').get().count
  if (count > 0) return

  const email = normalizeEmail(process.env.EASYROADMAPS_ADMIN_EMAIL || 'admin@easyroadmaps.local')
  const password = process.env.EASYROADMAPS_ADMIN_PASSWORD || 'changeme123'
  const createdAt = nowIso()
  const passwordHash = bcrypt.hashSync(password, 10)

  db.prepare(
    'INSERT INTO users (email, password_hash, role, created_at) VALUES (?, ?, ?, ?)',
  ).run(email, passwordHash, 'admin', createdAt)

  console.log(`EasyRoadmaps admin login: ${email} / ${password}`)
}

function migrateLegacyContent() {
  const count = db.prepare('SELECT COUNT(*) AS count FROM topic_pages').get().count
  if (count > 0 || !fs.existsSync(LEGACY_STORE_PATH)) return

  let parsed
  try {
    parsed = JSON.parse(fs.readFileSync(LEGACY_STORE_PATH, 'utf8'))
  } catch {
    return
  }

  const topics = parsed?.topics && typeof parsed.topics === 'object' ? Object.entries(parsed.topics) : []
  if (topics.length === 0) return

  const insertPage = db.prepare(`
    INSERT OR REPLACE INTO topic_pages (
      topic_id,
      title,
      summary,
      content_html,
      content_json,
      status,
      created_at,
      updated_at,
      updated_by,
      published_at,
      published_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const insertRevision = db.prepare(`
    INSERT INTO topic_page_revisions (
      topic_id,
      title,
      summary,
      content_html,
      content_json,
      status,
      note,
      created_at,
      updated_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const transaction = db.transaction((entries) => {
    for (const [topicId, entry] of entries) {
      const title = sanitizeText(entry?.title)
      const summary = sanitizeText(entry?.summary)
      const contentHtml = blocksToHtml(entry?.blocks || [], entry?.resources || [])
      const updatedAt = sanitizeText(entry?.updatedAt) || nowIso()
      const status = contentHtml.trim() ? 'published' : 'draft'
      const publishedAt = status === 'published' ? updatedAt : null

      insertPage.run(topicId, title, summary, contentHtml, null, status, updatedAt, updatedAt, null, publishedAt, null)
      insertRevision.run(topicId, title, summary, contentHtml, null, status, 'legacy import', updatedAt, null)
    }
  })

  transaction(topics)
}

function mapUser(row) {
  if (!row) return null

  return {
    id: row.id,
    email: row.email,
    role: row.role,
    createdAt: row.created_at,
  }
}

function mapTopicPage(row) {
  if (!row) return null

  return {
    topicId: row.topic_id,
    title: row.title,
    summary: row.summary,
    contentHtml: row.content_html,
    contentJson: parseJson(row.content_json),
    status: row.status,
    updatedAt: row.updated_at,
    publishedAt: row.published_at,
    hasContent: Boolean(sanitizeText(row.content_html).trim()),
  }
}

function createRevision(topicId, page, note, userId) {
  db.prepare(`
    INSERT INTO topic_page_revisions (
      topic_id,
      title,
      summary,
      content_html,
      content_json,
      status,
      note,
      created_at,
      updated_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    topicId,
    page.title,
    page.summary,
    page.contentHtml,
    stringifyJson(page.contentJson),
    page.status,
    note,
    page.updatedAt,
    userId ?? null,
  )
}

export function getContentIndex() {
  return db
    .prepare(`
      SELECT topic_id, title, status, updated_at, published_at
      FROM topic_pages
      ORDER BY datetime(updated_at) DESC
    `)
    .all()
    .map((row) => ({
      topicId: row.topic_id,
      title: row.title,
      status: row.status,
      updatedAt: row.updated_at,
      publishedAt: row.published_at,
    }))
}

export function getPublishedTopicPage(topicId) {
  const row = db.prepare(`
    SELECT
      topic_id,
      title,
      summary,
      content_html,
      content_json,
      status,
      created_at AS updated_at,
      created_at AS published_at
    FROM topic_page_revisions
    WHERE topic_id = ? AND status = ?
    ORDER BY id DESC
    LIMIT 1
  `).get(topicId, 'published')

  return mapTopicPage(row)
}

export function getEditableTopicPage(topicId) {
  const row = db.prepare('SELECT * FROM topic_pages WHERE topic_id = ?').get(topicId)
  return mapTopicPage(row)
}

export function getTopicPageRevisions(topicId) {
  return db
    .prepare(`
      SELECT id, topic_id, status, note, created_at
      FROM topic_page_revisions
      WHERE topic_id = ?
      ORDER BY id DESC
    `)
    .all(topicId)
    .map((row) => ({
      id: row.id,
      topicId: row.topic_id,
      status: row.status,
      note: row.note,
      createdAt: row.created_at,
    }))
}

export function saveTopicPageDraft(topicId, payload, userId) {
  const current = db.prepare('SELECT * FROM topic_pages WHERE topic_id = ?').get(topicId)
  const updatedAt = nowIso()
  const next = {
    title: sanitizeText(payload?.title ?? current?.title ?? ''),
    summary: sanitizeText(payload?.summary ?? current?.summary ?? ''),
    contentHtml: sanitizeText(payload?.contentHtml ?? current?.content_html ?? ''),
    contentJson: payload?.contentJson ?? parseJson(current?.content_json),
    status: 'draft',
    createdAt: current?.created_at ?? updatedAt,
    updatedAt,
    publishedAt: current?.published_at ?? null,
    publishedBy: current?.published_by ?? null,
  }

  if (current) {
    db.prepare(`
      UPDATE topic_pages
      SET title = ?, summary = ?, content_html = ?, content_json = ?, status = ?, updated_at = ?, updated_by = ?, published_at = ?, published_by = ?
      WHERE topic_id = ?
    `).run(
      next.title,
      next.summary,
      next.contentHtml,
      stringifyJson(next.contentJson),
      next.status,
      next.updatedAt,
      userId ?? null,
      next.publishedAt,
      next.publishedBy,
      topicId,
    )
  } else {
    db.prepare(`
      INSERT INTO topic_pages (
        topic_id,
        title,
        summary,
        content_html,
        content_json,
        status,
        created_at,
        updated_at,
        updated_by,
        published_at,
        published_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      topicId,
      next.title,
      next.summary,
      next.contentHtml,
      stringifyJson(next.contentJson),
      next.status,
      next.createdAt,
      next.updatedAt,
      userId ?? null,
      next.publishedAt,
      next.publishedBy,
    )
  }

  createRevision(topicId, next, 'draft save', userId)
  return getEditableTopicPage(topicId)
}

export function publishTopicPage(topicId, userId) {
  const current = db.prepare('SELECT * FROM topic_pages WHERE topic_id = ?').get(topicId)
  if (!current) return null

  const updatedAt = nowIso()
  const next = {
    title: current.title,
    summary: current.summary,
    contentHtml: current.content_html,
    contentJson: parseJson(current.content_json),
    status: 'published',
    updatedAt,
  }

  db.prepare(`
    UPDATE topic_pages
    SET status = ?, updated_at = ?, updated_by = ?, published_at = ?, published_by = ?
    WHERE topic_id = ?
  `).run('published', updatedAt, userId ?? null, updatedAt, userId ?? null, topicId)

  createRevision(topicId, next, 'published', userId)
  return getEditableTopicPage(topicId)
}

export function restoreTopicPageRevision(topicId, revisionId, userId) {
  const revision = db.prepare('SELECT * FROM topic_page_revisions WHERE topic_id = ? AND id = ?').get(topicId, revisionId)
  if (!revision) return null

  const current = db.prepare('SELECT * FROM topic_pages WHERE topic_id = ?').get(topicId)
  const updatedAt = nowIso()
  const next = {
    title: revision.title,
    summary: revision.summary,
    contentHtml: revision.content_html,
    contentJson: parseJson(revision.content_json),
    status: 'draft',
    createdAt: current?.created_at ?? updatedAt,
    updatedAt,
    publishedAt: current?.published_at ?? null,
    publishedBy: current?.published_by ?? null,
  }

  if (current) {
    db.prepare(`
      UPDATE topic_pages
      SET title = ?, summary = ?, content_html = ?, content_json = ?, status = ?, updated_at = ?, updated_by = ?, published_at = ?, published_by = ?
      WHERE topic_id = ?
    `).run(
      next.title,
      next.summary,
      next.contentHtml,
      stringifyJson(next.contentJson),
      next.status,
      next.updatedAt,
      userId ?? null,
      next.publishedAt,
      next.publishedBy,
      topicId,
    )
  } else {
    db.prepare(`
      INSERT INTO topic_pages (
        topic_id,
        title,
        summary,
        content_html,
        content_json,
        status,
        created_at,
        updated_at,
        updated_by,
        published_at,
        published_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      topicId,
      next.title,
      next.summary,
      next.contentHtml,
      stringifyJson(next.contentJson),
      next.status,
      next.createdAt,
      next.updatedAt,
      userId ?? null,
      next.publishedAt,
      next.publishedBy,
    )
  }

  createRevision(topicId, next, `restored revision #${revisionId}`, userId)
  return getEditableTopicPage(topicId)
}

export function saveAsset(payload) {
  const createdAt = nowIso()
  const result = db.prepare(`
    INSERT INTO assets (
      topic_id,
      url,
      storage_path,
      mime_type,
      size_bytes,
      uploaded_by,
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    payload.topicId || null,
    payload.url,
    payload.storagePath,
    payload.mimeType || null,
    payload.sizeBytes || null,
    payload.uploadedBy || null,
    createdAt,
  )

  return {
    id: Number(result.lastInsertRowid),
    topicId: payload.topicId || null,
    url: payload.url,
    storagePath: payload.storagePath,
    mimeType: payload.mimeType || null,
    sizeBytes: payload.sizeBytes || null,
    uploadedBy: payload.uploadedBy || null,
    createdAt,
  }
}

function getUserRowById(id) {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id)
}

export function getSessionUser(id) {
  return mapUser(getUserRowById(id))
}

export function findUserByEmail(email) {
  const normalized = normalizeEmail(email)
  if (!normalized) return null

  const row = db.prepare('SELECT * FROM users WHERE email = ?').get(normalized)
  if (!row) return null

  return {
    id: row.id,
    email: row.email,
    role: row.role,
    createdAt: row.created_at,
    passwordHash: row.password_hash,
  }
}

export function verifyUserPassword(user, password) {
  if (!user?.passwordHash) return false
  return bcrypt.compareSync(String(password || ''), user.passwordHash)
}

export function sanitizeUser(user) {
  if (!user) return null

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt || user.created_at || null,
  }
}


