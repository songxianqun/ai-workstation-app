import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import RoleAvatarBar from '../components/RoleAvatarBar'
import AssistantQuickBar from '../components/AssistantQuickBar'
import BottomInputBar from '../components/BottomInputBar'
import SideDrawer from '../components/SideDrawer'
import { useAppStore } from '../store/useAppStore'
import { supportAssistants, exceptionAlerts } from '../data/mockData'
import type { Assistant } from '../data/types'

export default function SupportCenterWorkbench() {
  const navigate = useNavigate()
  const setDrawerOpen = useAppStore((s) => s.setDrawerOpen)
  const [selectedAssistant, setSelectedAssistant] = useState<Assistant | null>(null)

  return (
    <div className="h-full flex flex-col bg-white relative">
      <SideDrawer />

      {/* 顶部栏 */}
      <Header
        title="业务支持中心工作台"
        showMenu
        onMenu={() => setDrawerOpen(true)}
        rightSlot={
          <button
            onClick={() => navigate('/support/alerts')}
            className="w-9 h-9 flex items-center justify-center active:opacity-60 relative"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C10.3431 2 9 3.34315 9 5V5.29348C6.5 6.14677 5 8.5 5 11.5V16L3 18H21L19 16V11.5C19 8.5 17.5 6.14677 15 5.29348V5C15 3.34315 13.6569 2 12 2Z" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 21C10 22.1046 10.8954 23 12 23C13.1046 23 14 22.1046 14 21" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {exceptionAlerts.length > 0 && (
              <span className="absolute top-0.5 right-0.5 min-w-[16px] h-[16px] px-1 bg-red-500 rounded-full text-[10px] text-white font-medium flex items-center justify-center">{exceptionAlerts.length}</span>
            )}
          </button>
        }
      />

      {/* 智能体导航（紧跟顶部栏） */}
      <RoleAvatarBar />

      {/* 主内容区 */}
      <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col items-center justify-center">
        {/* 品牌区 */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-100 to-primary-300 flex items-center justify-center text-[40px] mb-3 shadow-md shadow-primary-200/50">
            🤖
          </div>
          <h2 className="text-[20px] font-bold text-gray-900">业务支持中心工作台</h2>
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
