import { FileQuestionMark } from 'lucide-react'
import { ArrowLink, EmptyState, PageBody } from 'pivoshenko.ui'

export default function NotFound() {
  return (
    <PageBody>
      <EmptyState
        icon={<FileQuestionMark size={24} strokeWidth={1.5} />}
        title="Post not found"
        description="This post doesn't exist or may have been moved."
        action={<ArrowLink href="/blog">Back to blog</ArrowLink>}
      />
    </PageBody>
  )
}
