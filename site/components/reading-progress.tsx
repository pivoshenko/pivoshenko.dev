'use client'

import { ProgressBar } from 'pivoshenko.ui'
import { useEffect, useState } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const scrollable = scrollHeight - clientHeight
      setProgress(scrollable > 0 ? (scrollTop / scrollable) * 100 : 0)
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <ProgressBar value={progress} />
    </div>
  )
}
