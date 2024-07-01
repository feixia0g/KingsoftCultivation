import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/atom-one-dark.css'
import React, { useEffect, useState } from 'react'
import 'github-markdown-css/github-markdown.css'
import { Terminal } from 'lucide-react'
import CopyButton from './copy-button/copy-button.component'
import style from './markdown.module.css'
import { Card } from 'antd'
import MarkdownSider from './markdown-sider/markdown-sider.component'

export default function Markdown() {
  const [mdContent, setMdContent] = useState('')

  const url = '/README.md'
  useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then((text) => setMdContent(text))
  }, [])

  return (
    <div className={style['markdown-wrapper']}>
      <Card>
        <div className={style['markdown-card-wrapper']}>
          <MarkdownSider mdContent={mdContent} />
          <div className={style['markdown-card-content']}>
            <ReactMarkdown
              rehypePlugins={[rehypeHighlight]}
              className="prose prose-zinc max-w-none dark:prose-invert"
              components={{
                pre: ({ children }) => (
                  <pre className="not-prose">{children}</pre>
                ),
                code: ({ node, className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || '')
                  if (match?.length) {
                    const id = Math.random().toString(36).substr(2, 9)
                    return (
                      <div className="not-prose rounded-md border">
                        <div className="flex h-12 items-center justify-between bg-zinc-100 px-4 dark:bg-zinc-900">
                          <div className="flex items-center gap-2">
                            <Terminal size={18} />
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                              {JSON.parse(JSON.stringify(node?.data)).meta}
                            </p>
                          </div>
                          <CopyButton id={id} />
                        </div>
                        <div className="overflow-x-auto">
                          <div id={id} className="p-4">
                            {children}
                          </div>
                        </div>
                      </div>
                    )
                  } else {
                    return (
                      <code
                        {...props}
                        className="not-prose rounded bg-gray-100 px-1 dark:bg-zinc-900"
                      >
                        {children}
                      </code>
                    )
                  }
                }
              }}
            >
              {mdContent}
            </ReactMarkdown>
          </div>
        </div>
      </Card>
    </div>
  )
}
