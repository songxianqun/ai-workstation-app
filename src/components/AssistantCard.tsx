import type { Assistant } from '../data/types'

interface AssistantCardProps {
  assistant: Assistant
  onClick?: () => void
}

/** 助手卡片（紧凑型，横向滚动用） */
export default function AssistantCard({ assistant, onClick }: AssistantCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-[130px] rounded-2xl p-4 flex flex-col items-center gap-2 active:scale-95 transition-transform border border-gray-100 shadow-sm"
      style={{ backgroundColor: assistant.bgColor }}
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-[26px] overflow-hidden"
        style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
      >
        {assistant.image ? (
          <img src={assistant.image} alt={assistant.name} className="w-full h-full object-cover" />
        ) : (
          assistant.icon
        )}
      </div>
      <div className="text-center">
        <p className="text-[14px] font-semibold text-gray-800">{assistant.name}</p>
        <p className="text-[11px] text-gray-500 mt-0.5">{assistant.subtitle}</p>
      </div>
    </button>
  )
}
