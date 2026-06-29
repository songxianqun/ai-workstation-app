import type { OutputItem } from '../data/types'
import OutputCard from './OutputCard'
import MarkdownRenderer from './MarkdownRenderer'

interface MessageBubbleProps {
  role: 'ai' | 'user'
  content: string
  icon?: string
  image?: string
  output?: OutputItem
  isTyping?: boolean
  onPromptClick?: (prompt: string) => void
}

/** 对话消息气泡（豆包风格：无头像，内容最大化） */
export default function MessageBubble({
  role,
  content,
  output,
  isTyping,
  onPromptClick,
}: MessageBubbleProps) {
  const isAI = role === 'ai'

  return (
    <div className={`mb-4 px-4 animate-fadeIn ${isAI ? '' : 'flex justify-end'}`}>
      <div className={isAI ? 'w-full' : 'inline-block max-w-[280px]'}>
        <div
          className={`px-3.5 py-2.5 text-[14px] leading-relaxed ${
            isAI
              ? 'bg-gray-100 text-gray-800 rounded-2xl'
              : 'bg-gradient-to-br from-primary-300 to-primary-400 text-white rounded-2xl whitespace-pre-wrap'
          }`}
        >
          {isAI ? (
            <MarkdownRenderer content={content} onPromptClick={onPromptClick} />
          ) : (
            <span className={isTyping ? 'typing-cursor' : ''}>{content}</span>
          )}
        </div>

        {/* 输出物卡片（内联在AI消息后面） */}
        {output && (
          <div className="mt-2">
            <OutputCard output={output} />
          </div>
        )}
      </div>
    </div>
  )
}
