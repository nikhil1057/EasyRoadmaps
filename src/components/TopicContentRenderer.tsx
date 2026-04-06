export function TopicContentRenderer({ html }: { html: string }) {
  return <div className="content-prose rich-content mt-8" dangerouslySetInnerHTML={{ __html: html }} />
}
