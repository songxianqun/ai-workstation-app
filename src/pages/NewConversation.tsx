import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import AssistantQuickBar from '../components/AssistantQuickBar'
import BottomInputBar from '../components/BottomInputBar'
import SideDrawer from '../components/SideDrawer'
import { useAppStore } from '../store/useAppStore'
import { teamAssistants } from '../data/mockData'
import type { Assistant } from '../data/types'

export default function NewConversation() {
  const navigate = useNavigate()
  const setDrawerOpen = useAppStore((s) => s.setDrawerOpen)
  const [selectedAssistant, setSelectedAssistant] = useState<Assistant | null>(null)

  return (
    <div className="h-full flex flex-col bg-white relative">
      <SideDrawer />

      {/* 顶部栏 */}
      <Header
        title="新建会话"
        showBack
        onBack={() => navigate(-1)}
        showMenu
        onMenu={() => setDrawerOpen(true)}
      />

      {/* 空白内容区 */}
      <div className="flex-1" />

      {/* 助手快捷栏（输入框上方按钮） */}
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
