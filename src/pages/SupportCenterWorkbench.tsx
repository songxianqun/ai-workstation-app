import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import RoleAvatarBar from '../components/RoleAvatarBar'
import AssistantQuickBar from '../components/AssistantQuickBar'
import BottomInputBar from '../components/BottomInputBar'
import SideDrawer from '../components/SideDrawer'
import { useAppStore } from '../store/useAppStore'
import { supportAssistants } from '../data/mockData'
import type { Assistant } from '../data/types'

export default function SupportCenterWorkbench() {
  const navigate = useNavigate()
  const setDrawerOpen = useAppStore((s) => s.setDrawerOpen)
  const { username, userRole } = useAppStore()
  const [selectedAssistant, setSelectedAssistant] = useState<Assistant | null>(null)

  const department = userRole === 'team' ? '业务团队' : '业务支持中心'

  return (
    <div className="h-full flex flex-col bg-white relative">
      <SideDrawer />

      {/* 顶部栏 */}
      <Header
        title="员工工作台"
        showMenu
        onMenu={() => setDrawerOpen(true)}
      />

      {/* 智能体导航（紧跟顶部栏） */}
      <RoleAvatarBar />

      {/* 主内容区 */}
      <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col items-center justify-center">
        {/* 员工信息区 */}
        <div className="flex flex-col items-center w-full">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center text-[24px] font-bold text-white mb-3 shadow-md shadow-primary-200/50">
            {(username || '员')[0]}
          </div>
          <h2 className="text-[20px] font-bold text-gray-900">{username || '员工'}</h2>
          <p className="text-[13px] text-gray-400 mt-1">{department}</p>

          {/* 提示词列表 */}
          <div className="mt-6 w-full px-5">
            <div className="rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
              <button
                onClick={() => navigate('/chat/task-assistant', { state: { initialMessage: '我的今日任务是什么？' } })}
                className="w-full flex items-center justify-between px-4 py-3.5 border-b border-gray-100 active:bg-gray-100 transition-colors"
              >
                <span className="text-[14px] text-gray-700 text-left flex-1">我的今日任务是什么？</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gray-400 flex-shrink-0">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => navigate('/chat/business-analysis', { state: { initialMessage: '分析一下我的工作情况' } })}
                className="w-full flex items-center justify-between px-4 py-3.5 border-b border-gray-100 active:bg-gray-100 transition-colors"
              >
                <span className="text-[14px] text-gray-700 text-left flex-1">分析一下我的工作情况</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gray-400 flex-shrink-0">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => navigate('/chat/customer-analysis', { state: { initialMessage: '分析一下我的客户' } })}
                className="w-full flex items-center justify-between px-4 py-3.5 active:bg-gray-100 transition-colors"
              >
                <span className="text-[14px] text-gray-700 text-left flex-1">分析一下我的客户</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gray-400 flex-shrink-0">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 助手快捷栏（输入框上方） */}
      <AssistantQuickBar
        assistants={supportAssistants}
        onSelect={(id) => {
          const assistant = supportAssistants.find((a) => a.id === id)
          if (assistant) setSelectedAssistant(assistant)
        }}
      />

      {/* 底部输入栏 */}
      <BottomInputBar
        tag={selectedAssistant ? {
          label: selectedAssistant.name,
          icon: selectedAssistant.icon,
          onClose: () => setSelectedAssistant(null),
        } : null}
        prompts={selectedAssistant?.prompts}
        onSend={(text) => {
          const assistantId = selectedAssistant?.id || 'task-assistant'
          navigate(`/chat/${assistantId}`, { state: { initialMessage: text } })
        }}
      />
    </div>
  )
}
