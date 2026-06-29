import { useState, useEffect, useRef } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import BottomInputBar from '../components/BottomInputBar'
import MessageBubble from '../components/MessageBubble'
import { teamAssistants, supportAssistants, defaultAIReply, flowSteps } from '../data/mockData'
import type { ChatMessage } from '../data/types'

let msgIdCounter = 0
const genId = () => `msg-${++msgIdCounter}`

export default function Conversation() {
  const { assistantId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const scrollRef = useRef<HTMLDivElement>(null)

  // 找到对应助手
  const allAssistants = [...teamAssistants, ...supportAssistants]
  const assistant = allAssistants.find((a) => a.id === assistantId)

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [nextStepIndex, setNextStepIndex] = useState<number | null>(null)

  // 初始化欢迎消息
  useEffect(() => {
    if (assistant) {
      setMessages([
        {
          id: genId(),
          role: 'ai',
          content: assistant.welcomeMessage,
          timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    }
  }, [assistant])

  // 自动滚动到底部
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isTyping, nextStepIndex])

  // 模拟AI回复
  const getAIResponse = (text: string): { reply: string; output?: any } => {
    for (const resp of assistant!.responses) {
      if (resp.keywords.some((kw) => text.includes(kw))) {
        return { reply: resp.reply, output: resp.output }
      }
    }
    return { reply: defaultAIReply }
  }

  const handleSend = (text: string) => {
    // 添加用户消息
    const userMsg: ChatMessage = {
      id: genId(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages((prev) => [...prev, userMsg])
    setNextStepIndex(null)
    setIsTyping(true)

    // 检查是否匹配对话流步骤
    const flowStepIndex = flowSteps.findIndex((s) => s.userCommand === text)

    setTimeout(() => {
      let reply: string
      let output: any

      if (flowStepIndex >= 0) {
        const step = flowSteps[flowStepIndex]
        reply = step.reply
        output = step.output

        // 设置下一步联想提示
        if (flowStepIndex + 1 < flowSteps.length) {
          setNextStepIndex(flowStepIndex + 1)
        } else {
          setNextStepIndex(null)
        }
      } else {
        const resp = getAIResponse(text)
        reply = resp.reply
        output = resp.output
        setNextStepIndex(null)
      }

      const aiMsg: ChatMessage = {
        id: genId(),
        role: 'ai',
        content: reply,
        output,
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, aiMsg])
      setIsTyping(false)
    }, 1500)
  }

  // 处理从工作台输入栏带来的初始消息
  useEffect(() => {
    const state = location.state as { initialMessage?: string } | null
    if (state?.initialMessage && assistant) {
      const timer = setTimeout(() => handleSend(state.initialMessage!), 500)
      navigate(location.pathname, { replace: true, state: {} })
      return () => clearTimeout(timer)
    }
  }, [])

  if (!assistant) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-400">助手未找到</p>
      </div>
    )
  }

  // 联想提示词点击
  const handleSuggestionClick = () => {
    if (nextStepIndex !== null) {
      const nextStep = flowSteps[nextStepIndex]
      handleSend(nextStep.userCommand)
    }
  }

  // 获取联想提示词显示文本
  const getSuggestionText = () => {
    if (nextStepIndex === null) return ''
    const step = flowSteps[nextStepIndex]
    const nextAssistant = allAssistants.find((a) => a.id === step.assistantId)
    return `${nextAssistant?.name || ''}：${step.userCommand}`
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* 顶部栏 */}
      <Header
        title={assistant.name}
        showBack
        onBack={() => navigate(-1)}
        rightSlot={
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[16px] overflow-hidden"
            style={{ backgroundColor: assistant.bgColor }}
          >
            {assistant.image ? (
              <img src={assistant.image} alt={assistant.name} className="w-full h-full object-cover" />
            ) : (
              assistant.icon
            )}
          </div>
        }
      />

      {/* 消息列表 */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-hide py-4">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            role={msg.role}
            content={msg.content}
            icon={assistant.icon}
            image={assistant.image}
            output={msg.output}
            onPromptClick={handleSend}
          />
        ))}

        {/* 联想提示词 */}
        {nextStepIndex !== null && !isTyping && (
          <div className="px-4 mb-4 animate-fadeIn">
            <button
              onClick={handleSuggestionClick}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary-50 border border-primary-200 text-primary-500 text-[13px] active:bg-primary-100 transition-colors max-w-[300px]"
            >
              <span className="flex-shrink-0">🚀</span>
              <span className="flex-1 text-left line-clamp-2 leading-tight">{getSuggestionText()}</span>
              <span className="flex-shrink-0">→</span>
            </button>
          </div>
        )}

        {/* 打字中指示器 */}
        {isTyping && (
          <div className="flex gap-2 px-4 mb-4 animate-fadeIn">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center text-[16px] flex-shrink-0 overflow-hidden">
              {assistant.image ? (
                <img src={assistant.image} alt={assistant.name} className="w-full h-full object-cover" />
              ) : (
                assistant.icon
              )}
            </div>
            <div className="bg-gray-50 rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-1">
              <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      {/* 底部输入栏 */}
      <BottomInputBar
        placeholder="输入消息..."
        onSend={handleSend}
      />
    </div>
  )
}
