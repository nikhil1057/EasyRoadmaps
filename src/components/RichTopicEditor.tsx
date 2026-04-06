import { useEffect, useMemo, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import type { JSONContent } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { ImagePlus } from 'lucide-react'

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

  return (
    <div className="rich-editor-shell">
      <div className="rich-editor-actions">
        <button type="button" onClick={() => fileInputRef.current?.click()} className="btn-secondary text-sm" disabled={isUploading}>
          <ImagePlus className="h-4 w-4" />
          {isUploading ? 'Uploading image...' : 'Upload image'}
        </button>
        <span className="text-xs text-[color:var(--muted)]">Paste formatted text, drag images in, or upload from your device.</span>
      </div>

      <EditorContent editor={editor} />
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
    </div>
  )
}




