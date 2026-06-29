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
  const [selectedAssistant, setSelectedAssistant] = useState<Assistant | null>(null)

  return (
    <div className="h-full flex flex-col bg-white relative">
      <SideDrawer />

      {/* 顶部栏 */}
      <Header
        title="业务支持中心工作台"
        showMenu
        onMenu={() => setDrawerOpen(true)}
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
