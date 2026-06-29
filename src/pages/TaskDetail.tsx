import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { teamTasks, supportTaskGroups } from '../data/mockData'

export default function TaskDetail() {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState<string>('')

  // 从所有任务中查找
  const allTasks = [
    ...teamTasks,
    ...supportTaskGroups.flatMap((g) => g.tasks),
  ]
  const task = allTasks.find((t) => t.id === taskId)

  if (!task) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-400">任务未找到</p>
      </div>
    )
  }

  const priorityLabel = {
    high: { text: '高优先级', color: 'bg-red-50 text-red-600' },
    medium: { text: '中优先级', color: 'bg-orange-50 text-orange-600' },
    low: { text: '低优先级', color: 'bg-gray-100 text-gray-500' },
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Header title="任务详情" showBack onBack={() => navigate(-1)} />

      <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-4">
        {/* 任务卡片 */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-[11px] px-2 py-0.5 rounded-full ${
              status === 'done' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
            }`}>
              {status === 'done' ? '已完成' : task.statusLabel}
            </span>
            {task.priority && (
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${priorityLabel[task.priority].color}`}>
                {priorityLabel[task.priority].text}
              </span>
            )}
          </div>
          <h2 className="text-[16px] font-bold text-gray-900 leading-snug">{task.title}</h2>
          {task.customer && (
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[13px] text-gray-400">关联客户：</span>
              <span className="text-[13px] text-primary-500 font-medium">{task.customer}</span>
            </div>
          )}
        </div>

        {/* 任务描述 */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <h3 className="text-[14px] font-semibold text-gray-800 mb-2">任务描述</h3>
          <p className="text-[13px] text-gray-600 leading-relaxed">{task.description}</p>
        </div>

        {/* 关联信息 */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <h3 className="text-[14px] font-semibold text-gray-800 mb-3">关联信息</h3>
          <div className="space-y-2.5">
            {task.relatedModel && (
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-gray-400">关联模型</span>
                <span className="text-[13px] text-gray-700">{task.relatedModel}</span>
              </div>
            )}
            {task.customer && (
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-gray-400">关联客户</span>
                <span className="text-[13px] text-gray-700">{task.customer}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-gray-400">创建时间</span>
              <span className="text-[13px] text-gray-700">2026-06-26 09:00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-gray-400">截止时间</span>
              <span className="text-[13px] text-red-500">今日 18:00</span>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-3 pt-2">
          {status !== 'done' && (
            <button
              onClick={() => setStatus('done')}
              className="flex-1 py-3.5 rounded-2xl text-[15px] font-semibold text-white bg-gradient-to-r from-primary-300 to-primary-500 active:scale-[0.98] transition-transform"
            >
              标记完成
            </button>
          )}
          {status !== 'done' && status !== 'processing' && (
            <button
              onClick={() => setStatus('processing')}
              className="flex-1 py-3.5 rounded-2xl text-[15px] font-medium text-primary-500 border-2 border-primary-200 active:bg-primary-50"
            >
              开始处理
            </button>
          )}
          {status === 'done' && (
            <div className="flex-1 py-3.5 rounded-2xl text-[15px] font-semibold text-green-600 bg-green-50 text-center">
              ✓ 任务已完成
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
