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

/** 对话消息气泡 */
export default function MessageBubble({
  role,
  content,
  icon,
  image,
  output,
  isTyping,
  onPromptClick,
}: MessageBubbleProps) {
  const isAI = role === 'ai'

  return (
    <div className={`flex gap-2 mb-4 px-4 animate-fadeIn ${isAI ? '' : 'flex-row-reverse'}`}>
      {/* 头像 */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-[16px] flex-shrink-0 overflow-hidden ${
          isAI ? 'bg-gradient-to-br from-primary-200 to-primary-400' : 'bg-gradient-to-br from-blue-400 to-blue-600'
        }`}
      >
        {isAI ? (image ? <img src={image} alt="AI" className="w-full h-full object-cover" /> : (icon || '🤖')) : '我'}
      </div>

      {/* 消息内容 */}
      <div className={`flex-1 ${isAI ? '' : 'flex flex-col items-end'}`}>
        <div
          className={`inline-block max-w-[280px] px-3.5 py-2.5 text-[14px] leading-relaxed ${
            isAI
              ? 'bg-gray-50 text-gray-800 rounded-2xl rounded-tl-md'
              : 'bg-gradient-to-br from-primary-300 to-primary-400 text-white rounded-2xl rounded-tr-md whitespace-pre-wrap'
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
          <div className="mt-2 max-w-[280px]">
            <OutputCard output={output} />
          </div>
        )}
      </div>
    </div>
  )
}
