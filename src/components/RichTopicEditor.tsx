import { useEffect, useMemo, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import type { JSONContent } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { Table } from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { Bold, Heading2, Heading3, Heading4, ImagePlus, Italic, Link2, List, ListOrdered, Quote, Redo2, Type, Undo2 } from 'lucide-react'

type RichTopicEditorValue = {
  contentHtml: string
  contentJson: JSONContent
}

export function RichTopicEditor({
  initialContentHtml,
  initialContentJson,
  onChange,
  onUploadImage,
  placeholder,
}: {
  initialContentHtml: string
  initialContentJson: JSONContent | null
  onChange: (value: RichTopicEditorValue) => void
  onUploadImage: (file: File) => Promise<string>
  placeholder: string
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const initialContent = useMemo(
    () => initialContentJson ?? initialContentHtml ?? '<p></p>',
    [initialContentHtml, initialContentJson],
  )
  const serializedInitial = useMemo(() => JSON.stringify(initialContent), [initialContent])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: initialContent,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'rich-editor-surface',
      },
    },
    onUpdate({ editor: currentEditor }) {
      onChange({
        contentHtml: currentEditor.getHTML(),
        contentJson: currentEditor.getJSON(),
      })
    },
  })

  useEffect(() => {
    if (!editor) return
    editor.commands.setContent(initialContent, { emitUpdate: false })
  }, [editor, serializedInitial, initialContent])

  useEffect(() => {
    if (!editor) return

    const activeEditor = editor
    const dom = activeEditor.view.dom

    async function insertImage(file: File, position?: number) {
      setIsUploading(true)
      try {
        const url = await onUploadImage(file)
        const chain = activeEditor.chain().focus()
        if (typeof position === 'number') {
          chain.setTextSelection(position)
        }
        chain.setImage({ src: url, alt: file.name }).run()
      } finally {
        setIsUploading(false)
      }
    }

    function handlePaste(event: ClipboardEvent) {
      const files = Array.from(event.clipboardData?.files || [])
      const file = files.find((entry) => entry.type.startsWith('image/'))
      if (!file) return

      event.preventDefault()
      void insertImage(file)
    }

    function handleDrop(event: DragEvent) {
      const files = Array.from(event.dataTransfer?.files || [])
      const file = files.find((entry) => entry.type.startsWith('image/'))
      if (!file) return

      event.preventDefault()
      const coordinates = activeEditor.view.posAtCoords({ left: event.clientX, top: event.clientY })
      void insertImage(file, coordinates?.pos)
    }

    dom.addEventListener('paste', handlePaste)
    dom.addEventListener('drop', handleDrop)

    return () => {
      dom.removeEventListener('paste', handlePaste)
      dom.removeEventListener('drop', handleDrop)
    }
  }, [editor, onUploadImage])

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file || !editor) return

    const activeEditor = editor
    setIsUploading(true)
    try {
      const url = await onUploadImage(file)
      activeEditor.chain().focus().setImage({ src: url, alt: file.name }).run()
    } finally {
      setIsUploading(false)
      event.target.value = ''
    }
  }

  function handleLink() {
    if (!editor) return

    const currentHref = editor.getAttributes('link').href as string | undefined
    const nextHref = window.prompt('Enter a link URL', currentHref || 'https://')

    if (nextHref === null) return

    const normalizedHref = nextHref.trim()
    if (!normalizedHref) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: normalizedHref }).run()
  }

  const canEditTable = Boolean(editor?.isActive('table'))

  return (
    <div className="rich-editor-shell">
      <div className="rich-editor-actions">
        <div className="rich-editor-toolbar" role="toolbar" aria-label="Text formatting">
          <button
            type="button"
            onClick={() => editor?.chain().focus().setParagraph().run()}
            className={`rich-editor-tool ${editor?.isActive('paragraph') ? 'active' : ''}`}
            aria-label="Paragraph"
          >
            <Type className="h-4 w-4" />
            Text
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={`rich-editor-tool ${editor?.isActive('bold') ? 'active' : ''}`}
            aria-label="Bold"
          >
            <Bold className="h-4 w-4" />
            Bold
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={`rich-editor-tool ${editor?.isActive('italic') ? 'active' : ''}`}
            aria-label="Italic"
          >
            <Italic className="h-4 w-4" />
            Italic
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`rich-editor-tool ${editor?.isActive('heading', { level: 2 }) ? 'active' : ''}`}
            aria-label="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
            H2
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`rich-editor-tool ${editor?.isActive('heading', { level: 3 }) ? 'active' : ''}`}
            aria-label="Heading 3"
          >
            <Heading3 className="h-4 w-4" />
            H3
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleHeading({ level: 4 }).run()}
            className={`rich-editor-tool ${editor?.isActive('heading', { level: 4 }) ? 'active' : ''}`}
            aria-label="Heading 4"
          >
            <Heading4 className="h-4 w-4" />
            H4
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={`rich-editor-tool ${editor?.isActive('bulletList') ? 'active' : ''}`}
            aria-label="Bullet list"
          >
            <List className="h-4 w-4" />
            List
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={`rich-editor-tool ${editor?.isActive('orderedList') ? 'active' : ''}`}
            aria-label="Numbered list"
          >
            <ListOrdered className="h-4 w-4" />
            Numbered
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
            className={`rich-editor-tool ${editor?.isActive('blockquote') ? 'active' : ''}`}
            aria-label="Quote"
          >
            <Quote className="h-4 w-4" />
            Quote
          </button>
          <button
            type="button"
            onClick={handleLink}
            className={`rich-editor-tool ${editor?.isActive('link') ? 'active' : ''}`}
            aria-label="Link"
          >
            <Link2 className="h-4 w-4" />
            Link
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().undo().run()}
            className="rich-editor-tool"
            aria-label="Undo"
            disabled={!editor?.can().chain().focus().undo().run()}
          >
            <Undo2 className="h-4 w-4" />
            Undo
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().redo().run()}
            className="rich-editor-tool"
            aria-label="Redo"
            disabled={!editor?.can().chain().focus().redo().run()}
          >
            <Redo2 className="h-4 w-4" />
            Redo
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
            className={`rich-editor-tool ${editor?.isActive('table') ? 'active' : ''}`}
            aria-label="Insert table"
          >
            Table
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().addRowAfter().run()}
            className="rich-editor-tool"
            aria-label="Add row"
            disabled={!canEditTable}
          >
            Row+
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().addColumnAfter().run()}
            className="rich-editor-tool"
            aria-label="Add column"
            disabled={!canEditTable}
          >
            Col+
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().deleteTable().run()}
            className="rich-editor-tool"
            aria-label="Delete table"
            disabled={!canEditTable}
          >
            Remove table
          </button>
        </div>

        <div className="rich-editor-utility">
          <button type="button" onClick={() => fileInputRef.current?.click()} className="btn-secondary text-sm" disabled={isUploading}>
            <ImagePlus className="h-4 w-4" />
            {isUploading ? 'Uploading image...' : 'Upload image'}
          </button>
          <span className="text-xs text-[color:var(--muted)]">
            Select text to format it. You can also paste tables, drag images in, or upload from your device.
          </span>
        </div>
      </div>

      <EditorContent editor={editor} />
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
    </div>
  )
}




