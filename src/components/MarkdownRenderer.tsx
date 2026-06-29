import { useState } from 'react'

interface MarkdownRendererProps {
  content: string
  onPromptClick?: (prompt: string) => void
}

/** 轻量级Markdown渲染器（支持标题、粗体、表格、列表、引用、分割线、提示词卡片） */
export default function MarkdownRenderer({ content, onPromptClick }: MarkdownRendererProps) {
  const lines = content.replace(/\r\n/g, '\n').split('\n')
  const elements: React.ReactNode[] = []
  let i = 0
  let key = 0

  // 解析行内格式：**bold** → <strong>
  const renderInline = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = []
    let remaining = text
    let partKey = 0
    while (remaining.length > 0) {
      const match = remaining.match(/\*\*(.+?)\*\*/)
      if (!match) {
        parts.push(remaining)
        break
      }
      const idx = match.index!
      if (idx > 0) parts.push(remaining.substring(0, idx))
      parts.push(<strong key={partKey++} className="font-semibold text-gray-900">{match[1]}</strong>)
      remaining = remaining.substring(idx + match[0].length)
    }
    return parts
  }

  // 解析表格行
  const parseTableRow = (line: string): string[] => {
    return line.split('|').map(c => c.trim()).filter((_, idx, arr) => {
      // 去掉首尾空元素
      if (idx === 0 && _.trim() === '') return false
      if (idx === arr.length - 1 && _.trim() === '') return false
      return true
    })
  }

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    // 空行
    if (!trimmed) {
      i++
      continue
    }

    // 表格
    if (trimmed.match(/^\|.*\|$/)) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].trim().match(/^\|.*\|$/)) {
        tableLines.push(lines[i].trim())
        i++
      }
      // 跳过分隔行 |---|---|
      const dataLines = tableLines.filter(l => !l.match(/^\|[\s\-:|]+\|$/))
      if (dataLines.length > 0) {
        const header = parseTableRow(dataLines[0])
        const body = dataLines.slice(1).map(parseTableRow)
        elements.push(
          <div key={key++} className="my-2 overflow-x-auto scrollbar-hide">
            <table className="w-full text-[13px] border-collapse">
              <thead>
                <tr>
                  {header.map((cell, ci) => (
                    <th key={ci} className="px-2 py-1.5 bg-gray-100 text-gray-700 font-semibold border border-gray-200 text-left whitespace-nowrap">
                      {renderInline(cell)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((row, ri) => (
                  <tr key={ri}>
                    {header.map((_, ci) => (
                      <td key={ci} className="px-2 py-1.5 border border-gray-200 text-gray-600 whitespace-nowrap">
                        {renderInline(row[ci] || '')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
      continue
    }

    // h1: # text
    if (trimmed.startsWith('# ')) {
      elements.push(
        <h1 key={key++} className="text-[17px] font-bold text-gray-900 mt-3 mb-2">
          {renderInline(trimmed.replace(/^#\s*/, ''))}
        </h1>
      )
      i++
      continue
    }

    // h2: ## text
    if (trimmed.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="text-[16px] font-bold text-gray-900 mt-3 mb-1.5">
          {renderInline(trimmed.replace(/^##\s*/, ''))}
        </h2>
      )
      i++
      continue
    }

    // h3: ### text
    if (trimmed.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="text-[15px] font-bold text-primary-600 mt-2.5 mb-1">
          {renderInline(trimmed.replace(/^###\s*/, ''))}
        </h3>
      )
      i++
      continue
    }

    // 分割线 ---
    if (/^---+$/.test(trimmed)) {
      elements.push(<hr key={key++} className="my-2.5 border-t border-gray-200" />)
      i++
      continue
    }

    // 提示词卡片 >>> text
    if (trimmed.startsWith('>>> ')) {
      const promptText = trimmed.replace(/^>>>\s*/, '')
      elements.push(
        <button
          key={key++}
          onClick={() => onPromptClick?.(promptText)}
          className="block w-full text-left mt-1.5 px-3 py-2 rounded-lg bg-primary-50 border border-primary-100 text-[13px] text-primary-600 active:bg-primary-100 transition-colors"
        >
          💬 {renderInline(promptText)}
        </button>
      )
      i++
      continue
    }

    // 引用 > text
    if (trimmed.startsWith('> ')) {
      elements.push(
        <blockquote key={key++} className="my-2 pl-3 py-1.5 border-l-[3px] border-primary-300 bg-primary-50/50 rounded-r-lg text-[13px] text-gray-600">
          {renderInline(trimmed.replace(/^>\s*/, ''))}
        </blockquote>
      )
      i++
      continue
    }

    // 有序列表 1. 2. 3.
    if (trimmed.match(/^\d+\.\s/)) {
      const items: string[] = []
      while (i < lines.length && lines[i].trim().match(/^\d+\.\s/)) {
        items.push(lines[i].trim().replace(/^\d+\.\s*/, ''))
        i++
      }
      elements.push(
        <ol key={key++} className="my-1.5 space-y-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-2 text-[14px] text-gray-700">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 text-primary-600 text-[11px] font-bold flex items-center justify-center mt-0.5">
                {idx + 1}
              </span>
              <span className="flex-1">{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      )
      continue
    }

    // 无序列表 - 或 •
    if (trimmed.match(/^[-•]\s/)) {
      const items: string[] = []
      while (i < lines.length && lines[i].trim().match(/^[-•]\s/)) {
        items.push(lines[i].trim().replace(/^[-•]\s*/, ''))
        i++
      }
      elements.push(
        <ul key={key++} className="my-1.5 space-y-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-2 text-[14px] text-gray-700">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary-400 mt-2" />
              <span className="flex-1">{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      )
      continue
    }

    // 普通段落
    elements.push(
      <p key={key++} className="text-[14px] text-gray-700 leading-relaxed my-1">
        {renderInline(trimmed)}
      </p>
    )
    i++
  }

  return <div className="markdown-body">{elements}</div>
}
