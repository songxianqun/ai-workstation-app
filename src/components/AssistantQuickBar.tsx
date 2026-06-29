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

/** 助手快捷栏：平铺横滑显示，无更多按钮 */
export default function AssistantQuickBar({ assistants, extraItems, onSelect }: AssistantQuickBarProps) {
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

  return (
    <div className="flex-shrink-0 px-4 py-2 flex gap-2 items-center overflow-x-auto scrollbar-hide">
      {allItems.map((item) => (
        <button
          key={item.id}
          onClick={item.onClick}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 active:bg-gray-100 transition-colors flex-shrink-0"
        >
          {item.image ? (
            <img src={item.image} alt={item.name} className="w-5 h-5 rounded-full object-cover" />
          ) : (
            <span className="text-[16px]">{item.icon}</span>
          )}
          <span className="text-[13px] font-medium text-gray-700 whitespace-nowrap">
            {item.name}
          </span>
        </button>
      ))}
    </div>
  )
}
