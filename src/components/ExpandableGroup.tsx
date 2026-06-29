import { useState } from 'react'
import type { TaskGroup } from '../data/types'
import TaskCard from './TaskCard'
import { useNavigate } from 'react-router-dom'

interface ExpandableGroupProps {
  group: TaskGroup
}

/** 可折叠任务分组（支持中心用） */
export default function ExpandableGroup({ group }: ExpandableGroupProps) {
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      {/* 分组头 */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2.5 px-3.5 py-3 active:bg-gray-50"
      >
        <span className="text-[18px]">{group.roleIcon}</span>
        <span className="text-[14px] font-medium text-gray-800 flex-1 text-left">
          {group.roleName}
        </span>
        <span className="text-[12px] text-gray-400">({group.count}项待办)</span>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          className={`transition-transform ${expanded ? 'rotate-90' : ''}`}
        >
          <path d="M9 18L15 12L9 6" stroke="#C7C7CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* 展开内容 */}
      {expanded && (
        <div className="px-3 pb-3 space-y-2 animate-fadeIn">
          {group.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => navigate(`/task/${task.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
