import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import RoleAvatarBar from '../components/RoleAvatarBar'
import AssistantQuickBar from '../components/AssistantQuickBar'
import BottomInputBar from '../components/BottomInputBar'
import SideDrawer from '../components/SideDrawer'
import { useAppStore } from '../store/useAppStore'
import { teamAssistants } from '../data/mockData'
import type { Assistant } from '../data/types'

export default function BusinessTeamWorkbench() {
  const navigate = useNavigate()
  const setDrawerOpen = useAppStore((s) => s.setDrawerOpen)
  const [selectedAssistant, setSelectedAssistant] = useState<Assistant | null>(null)

  return (
    <div className="h-full flex flex-col bg-white relative">
      <SideDrawer />

      {/* 顶部栏 */}
      <Header
        title="业务团队工作台"
        showMenu
        onMenu={() => setDrawerOpen(true)}
      />

      {/* 智能体导航（紧跟顶部栏） */}
      <RoleAvatarBar />

      {/* 主内容区（可滚动） */}
      <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col items-center justify-center">
        {/* 品牌区 */}
        <div className="flex flex-col items-center w-full">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-100 to-primary-300 flex items-center justify-center text-[40px] mb-3 shadow-md shadow-primary-200/50">
            🤖
          </div>
          <h2 className="text-[20px] font-bold text-gray-900">业务团队工作台</h2>
          <p className="text-[14px] text-primary-400 mt-1">你的业务超能力</p>

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
                onClick={() => navigate('/team/travel')}
                className="w-full flex items-center justify-between px-4 py-3.5 border-b border-gray-100 active:bg-gray-100 transition-colors"
              >
                <span className="text-[14px] text-gray-700 text-left flex-1">帮我分析一下我的差旅情况</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gray-400 flex-shrink-0">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => navigate('/chat/approval-assistant', { state: { initialMessage: '查一下我的审批待办' } })}
                className="w-full flex items-center justify-between px-4 py-3.5 border-b border-gray-100 active:bg-gray-100 transition-colors"
              >
                <span className="text-[14px] text-gray-700 text-left flex-1">查一下我的审批待办</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gray-400 flex-shrink-0">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => navigate('/chat/notification-assistant', { state: { initialMessage: '最新的通知公告有哪些？' } })}
                className="w-full flex items-center justify-between px-4 py-3.5 active:bg-gray-100 transition-colors"
              >
                <span className="text-[14px] text-gray-700 text-left flex-1">最新的通知公告有哪些？</span>
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
        assistants={teamAssistants}
        onSelect={(id) => {
          const assistant = teamAssistants.find((a) => a.id === id)
          if (assistant) setSelectedAssistant(assistant)
        }}
        extraItems={[
          { id: 'today-tasks', name: '今日任务', subtitle: '6项待办', icon: '📋', bgColor: '#E8EFFF', onClick: () => navigate('/chat/task-assistant', { state: { initialMessage: '我的今日任务是什么？' } }) },
          { id: 'travel', name: '差旅分析', subtitle: '本月5次', icon: '✈️', bgColor: '#E8F8EE', onClick: () => navigate('/team/travel') },
        ]}
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
          const assistantId = selectedAssistant?.id || 'customer-analysis'
          navigate(`/chat/${assistantId}`, { state: { initialMessage: text } })
        }}
      />
    </div>
  )
}
