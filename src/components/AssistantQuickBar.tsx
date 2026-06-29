import { useState } from 'react'
import type { Assistant } from '../data/types'

/** 额外快捷项（非AI助手，如今日任务、差旅分析） */
export interface ExtraItem {
  id: string
  name: string
  subtitle?: string
  icon: string
  bgColor: string
  onClick: () => void
}

/** 统一展示项 */
interface DisplayItem {
  id: string
  name: string
  subtitle?: string
  icon: string
  bgColor: string
  image?: string
  onClick: () => void
}

interface AssistantQuickBarProps {
  assistants: Assistant[]
  extraItems?: ExtraItem[]
  onSelect: (assistantId: string) => void
}

/** 助手快捷栏：显示2个 + 更多按钮，点击更多展开底部面板 */
export default function AssistantQuickBar({ assistants, extraItems, onSelect }: AssistantQuickBarProps) {
  const [expanded, setExpanded] = useState(false)

  // 合并助手和额外快捷项
  const allItems: DisplayItem[] = [
    ...assistants.map((a) => ({
      id: a.id,
      name: a.name,
      subtitle: a.subtitle,
      icon: a.icon,
      bgColor: a.bgColor,
      image: a.image,
      onClick: () => onSelect(a.id),
    })),
    ...(extraItems || []),
  ]

  const visibleItems = allItems.slice(0, 2)
  const hasMore = allItems.length > 2

  return (
    <>
      {/* 快捷栏 */}
      <div className="flex-shrink-0 px-4 py-2 flex gap-2 items-center overflow-x-auto scrollbar-hide">
        {visibleItems.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 active:bg-gray-100 transition-colors flex-shrink-0"
          >
            <span className="text-[16px]">{item.icon}</span>
            <span className="text-[13px] font-medium text-gray-700 whitespace-nowrap">
              {item.name}
            </span>
          </button>
        ))}

        {hasMore && (
          <button
            onClick={() => setExpanded(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary-50 border border-primary-100 active:bg-primary-100 transition-colors flex-shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" rx="1.5" fill="#C19A6B" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" fill="#C19A6B" opacity="0.6" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" fill="#C19A6B" opacity="0.6" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" fill="#C19A6B" opacity="0.3" />
            </svg>
            <span className="text-[13px] font-medium text-primary-500">更多</span>
          </button>
        )}
      </div>

      {/* 底部面板遮罩 */}
      {expanded && (
        <div
          className="absolute inset-0 z-50 flex flex-col justify-end"
          onClick={() => setExpanded(false)}
        >
          {/* 背景遮罩 */}
          <div className="absolute inset-0 bg-black/30 animate-[fadeInBg_0.2s_ease-out]" />

          {/* 面板内容 */}
          <div
            className="relative bg-white rounded-t-3xl pt-3 pb-6 px-4 shadow-2xl animate-[slideUp_0.25s_ease-out] max-h-[70%] overflow-y-auto scrollbar-hide"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 拖拽指示条 */}
            <div className="w-10 h-1 rounded-full bg-gray-300 mx-auto mb-4" />

            {/* 标题栏 */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] font-bold text-gray-900">全部助手</h3>
              <span className="text-[12px] text-gray-400">{allItems.length}个</span>
            </div>

            {/* 助手网格 */}
            <div className="grid grid-cols-3 gap-3">
              {allItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    item.onClick()
                    setExpanded(false)
                  }}
                  className="flex flex-col items-center gap-2 p-3 rounded-2xl active:scale-95 transition-transform border border-gray-100"
                  style={{ backgroundColor: item.bgColor }}
                >
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-[24px] overflow-hidden"
                    style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
                  >
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      item.icon
                    )}
                  </div>
                  <p className="text-[12px] font-semibold text-gray-800 text-center leading-tight">
                    {item.name}
                  </p>
                  {item.subtitle && (
                    <p className="text-[10px] text-gray-500 text-center leading-tight">
                      {item.subtitle}
                    </p>
                  )}
                </button>
              ))}
            </div>

            {/* 收起按钮 */}
            <button
              onClick={() => setExpanded(false)}
              className="w-full mt-4 py-2.5 rounded-xl bg-gray-50 text-[14px] font-medium text-gray-600 active:bg-gray-100 transition-colors flex items-center justify-center gap-1.5"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M18 15L12 9L6 15" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              收起
            </button>
          </div>
        </div>
      )}
    </>
  )
}
