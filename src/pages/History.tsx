import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { historySessions } from '../data/mockData'

export default function History() {
  const navigate = useNavigate()

  // 助手ID映射
  const assistantIdMap: Record<string, string> = {
    '客户分析': 'customer-analysis',
    '业务分析': 'business-analysis',
    '方案生成': 'plan-generation',
    '交叉验证': 'cross-validation',
    '客户服务': 'customer-service',
    '今日任务': 'task-assistant',
    '异常提醒': 'alert-assistant',
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Header title="历史会话" showBack onBack={() => navigate(-1)} />

      <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-2.5">
        {historySessions.map((session) => (
          <button
            key={session.id}
            onClick={() => navigate(`/chat/${assistantIdMap[session.assistantName] || 'customer-analysis'}`)}
            className="w-full flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 active:bg-gray-50 text-left"
          >
            <div className="w-11 h-11 rounded-full bg-primary-50 flex items-center justify-center text-[22px] flex-shrink-0">
              {session.assistantIcon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-[14px] font-medium text-gray-800">{session.assistantName}</p>
                <span className="text-[11px] text-gray-400">{session.time}</span>
              </div>
              <p className="text-[13px] text-gray-400 mt-1 truncate">{session.lastMessage}</p>
              <p className="text-[11px] text-gray-300 mt-1">{session.messageCount}条消息</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
