import type { Task } from '../data/types'

interface TaskCardProps {
  task: Task
  index?: number
  onClick?: () => void
}

/** 任务列表项 */
export default function TaskCard({ task, index, onClick }: TaskCardProps) {
  const statusColor = {
    pending: 'bg-orange-50 text-orange-600',
    processing: 'bg-blue-50 text-blue-600',
    done: 'bg-green-50 text-green-600',
  }[task.status]

  const priorityColor = {
    high: 'bg-red-500',
    medium: 'bg-orange-400',
    low: 'bg-gray-300',
  }

  return (
    <button
      onClick={onClick}
      className="w-full flex items-start gap-3 p-3.5 bg-white border border-gray-100 rounded-2xl active:bg-gray-50 transition-colors text-left"
    >
      {/* 序号 */}
      {index !== undefined && (
        <div className="w-6 h-6 rounded-full bg-red-500 text-white text-[12px] font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
          {index}
        </div>
      )}

      {/* 优先级条 */}
      {task.priority && (
        <div className={`w-1 self-stretch rounded-full ${priorityColor[task.priority]} flex-shrink-0`} />
      )}

      {/* 内容 */}
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-medium text-gray-800 leading-snug line-clamp-2">
          {task.title}
        </p>
        {task.customer && (
          <p className="text-[12px] text-gray-400 mt-1">客户：{task.customer}</p>
        )}
        <div className="flex items-center gap-2 mt-2">
          <span className={`text-[11px] px-2 py-0.5 rounded-full ${statusColor}`}>
            {task.statusLabel}
          </span>
          {task.relatedModel && (
            <span className="text-[11px] text-gray-400">{task.relatedModel}</span>
          )}
        </div>
      </div>

      {/* 箭头 */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-1">
        <path d="M9 18L15 12L9 6" stroke="#C7C7CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
