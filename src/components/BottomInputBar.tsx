import { useState, useEffect } from 'react'
import type { PromptItem } from '../data/types'

interface SelectedTag {
  label: string
  icon: string
  onClose: () => void
}

interface BottomInputBarProps {
  placeholder?: string
  onSend?: (text: string) => void
  onAttach?: () => void
  onVoice?: () => void
  tag?: SelectedTag | null
  prompts?: PromptItem[]
}

/** 底部输入栏（📎+输入框+🎤+发送，无技能下拉） */
export default function BottomInputBar({
  placeholder = '开启我的工作...',
  onSend,
  onAttach,
  onVoice,
  tag,
  prompts,
}: BottomInputBarProps) {
  const [text, setText] = useState('')
  const [promptPlaceholder, setPromptPlaceholder] = useState<string | null>(null)
  const [promptsVisible, setPromptsVisible] = useState(true)

  // 当助手切换时重置提示词状态
  useEffect(() => {
    setPromptPlaceholder(null)
    setPromptsVisible(true)
  }, [tag?.label])

  const handleSend = () => {
    if (!text.trim()) return
    onSend?.(text.trim())
    setText('')
  }

  const handlePromptClick = (prompt: PromptItem) => {
    if (typeof prompt === 'string') {
      onSend?.(prompt)
    } else if (prompt.fillPlaceholder) {
      setPromptPlaceholder(prompt.fillPlaceholder)
      setPromptsVisible(false)
    } else {
      onSend?.(prompt.text)
    }
  }

  return (
    <div className="relative flex-shrink-0 bg-white border-t border-gray-100 px-3 py-2.5 pb-4">
      {/* 提示词遮罩层（选中助手后展示，覆盖上方主内容区） */}
      {prompts && prompts.length > 0 && promptsVisible && (
        <div className="absolute bottom-full left-0 right-0 h-screen backdrop-blur-sm bg-black/15 flex flex-col justify-end">
          {/* 提示词面板 */}
          <div className="bg-white/95 rounded-t-2xl overflow-hidden">
            {prompts.map((prompt, idx) => {
              const promptText = typeof prompt === 'string' ? prompt : prompt.text
              return (
                <button
                  key={idx}
                  onClick={() => handlePromptClick(prompt)}
                  className="w-full flex items-center justify-between px-4 py-3.5 border-b border-gray-100 active:bg-gray-50 transition-colors"
                >
                  <span className="text-[15px] text-gray-700 text-left flex-1 truncate mr-2">{promptText}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gray-400 flex-shrink-0">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* 已选助手标签 */}
      {tag && (
        <div className="mb-2 flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary-50 border border-primary-100">
            <span className="text-[14px]">{tag.icon}</span>
            <span className="text-[12px] font-medium text-primary-500">{tag.label}</span>
            <button
              onClick={tag.onClose}
              className="ml-0.5 w-4 h-4 flex items-center justify-center rounded-full hover:bg-primary-100 transition-colors"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="#C19A6B" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* 附件按钮 */}
        <button
          onClick={onAttach}
          className="w-9 h-9 flex items-center justify-center flex-shrink-0 active:opacity-60"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 5V19M5 12H19" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* 输入框 */}
        <div className="flex-1 bg-gray-50 rounded-full px-4 py-2 flex items-center">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={promptPlaceholder || placeholder}
            className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-gray-400"
          />
        </div>

        {/* 语音按钮 */}
        <button
          onClick={onVoice}
          className="w-9 h-9 flex items-center justify-center flex-shrink-0 active:opacity-60"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="9" y="3" width="6" height="11" rx="3" stroke="#8E8E93" strokeWidth="2" />
            <path d="M5 11C5 15 8 17 12 17C16 17 19 15 19 11" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 17V21" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* 发送按钮 */}
        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
            text.trim()
              ? 'bg-gradient-to-br from-primary-300 to-primary-500'
              : 'bg-gray-200'
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 19V5M5 12L12 5L19 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
