import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { historySessions } from '../data/mockData'

/** 侧边抽屉菜单 */
export default function SideDrawer() {
  const navigate = useNavigate()
  const { drawerOpen, setDrawerOpen, userRole, username, logout } = useAppStore()

  if (!drawerOpen) return null

  const department = userRole === 'team' ? '资产管理部' : '投资银行部'

  const handleClose = () => setDrawerOpen(false)

  const handleNavigate = (path: string, initialMessage?: string) => {
    setDrawerOpen(false)
    navigate(path, initialMessage ? { state: { initialMessage } } : undefined)
  }

  const handleLogout = () => {
    logout()
    setDrawerOpen(false)
    navigate('/login')
  }

  // 快捷入口（今日任务、差旅分析在前，待办事项、通知提醒在后）
  const quickEntries = [
    { name: '今日任务', icon: '📋', path: '/chat/task-assistant', initialMessage: '查看今日待办任务' },
    { name: '差旅分析', icon: '✈️', path: '/chat/travel-analysis', initialMessage: '查看差旅分析' },
    { name: '待办事项', icon: '✅', path: '/chat/approval-assistant', initialMessage: '查看待审批事项' },
    { name: '通知提醒', icon: '🔔', path: '/chat/notification-assistant', initialMessage: '查看今日通知概览' },
  ]

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

  const handleSessionClick = (assistantName: string) => {
    const assistantId = assistantIdMap[assistantName] || 'customer-analysis'
    setDrawerOpen(false)
    navigate(`/chat/${assistantId}`)
  }

  return (
    <>
      {/* 遮罩 */}
      <div
        className="absolute inset-0 bg-black/40 z-50 animate-fadeInBg"
        onClick={handleClose}
      />

      {/* 抽屉 */}
      <div className="absolute top-0 left-0 bottom-0 w-[280px] bg-white z-50 animate-slideInLeft flex flex-col">
        {/* 用户信息区 */}
        <div className="pt-10 pb-3 px-5 bg-gradient-to-br from-primary-200 to-primary-400">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center text-[22px] flex-shrink-0">
              🤖
            </div>
            <div className="flex-1">
              <p className="text-[16px] font-semibold text-white">{username}</p>
              <p className="text-[12px] text-white/80">{department}</p>
            </div>
            <button onClick={() => handleNavigate('/settings')} className="w-8 h-8 flex items-center justify-center active:opacity-60 flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9.6 3l-.3 2.2c-.5.2-1 .5-1.4.8L5.8 5.2 4 7l.8 1.6c-.3.5-.5 1-.7 1.5L2 10.5v2.5l2.1.4c.2.5.4 1 .7 1.5L4 16.5l1.8 1.8 2.1-.8c.4.3.9.6 1.4.8l.3 2.2h2.8l.3-2.2c.5-.2 1-.5 1.4-.8l2.1.8 1.8-1.8-.8-1.6c.3-.5.5-1 .7-1.5l2.1-.4v-2.5l-2.1-.4c-.2-.5-.4-1-.7-1.5L20 7l-1.8-1.8-2.1.8c-.4-.3-.9-.6-1.4-.8L14.4 3H9.6z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                <circle cx="12" cy="11.5" r="3" stroke="white" strokeWidth="1.5"/>
              </svg>
            </button>
          </div>
        </div>

        {/* 新建会话按钮 */}
        <button
          onClick={() => handleNavigate('/new-chat')}
          className="mx-5 mt-3 flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-100 active:bg-gray-200 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 20h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-[14px] font-medium text-gray-700">新建会话</span>
        </button>

        {/* 快捷入口（无标题） */}
        <div className="px-5 pt-2 pb-2 flex gap-2">
          {quickEntries.map((entry) => (
            <button
              key={entry.name}
              onClick={() => handleNavigate(entry.path, entry.initialMessage)}
              className="flex flex-col items-center gap-1 flex-1 py-2.5 rounded-xl bg-gray-100 active:bg-gray-200 transition-colors"
            >
              <span className="text-[20px]">{entry.icon}</span>
              <span className="text-[11px] text-gray-600">{entry.name}</span>
            </button>
          ))}
        </div>

        {/* 分隔线 */}
        <div className="border-t border-gray-100 mx-5"></div>

        {/* 历史会话列表 */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="px-5 pt-2 pb-1">
            <p className="text-[12px] font-medium text-gray-400">历史会话</p>
          </div>
          {historySessions.map((session) => (
            <button
              key={session.id}
              onClick={() => handleSessionClick(session.assistantName)}
              className="w-full flex items-center gap-2.5 px-5 py-2.5 active:bg-gray-50 text-left"
            >
              <div className="w-9 h-9 rounded-full bg-primary-50 flex items-center justify-center text-[18px] flex-shrink-0">
                {session.assistantIcon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-medium text-gray-800 truncate">{session.assistantName}</p>
                  <span className="text-[10px] text-gray-400 flex-shrink-0 ml-1">{session.time}</span>
                </div>
                <p className="text-[12px] text-gray-400 mt-0.5 truncate">{session.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>

        {/* 退出登录 */}
        <div className="border-t border-gray-100 pb-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-5 py-3.5 active:bg-gray-50"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="#FF3B30" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 17L21 12L16 7" stroke="#FF3B30" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 12H9" stroke="#FF3B30" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[15px] text-red-500">退出登录</span>
          </button>
        </div>
      </div>
    </>
  )
}
