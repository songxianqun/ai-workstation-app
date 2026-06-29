// ===== 类型定义 =====

/** 用户角色 */
export type UserRole = 'team' | 'support'

/** 业务助理角色（8个智能体） */
export interface Role {
  id: string
  name: string
  shortName: string
  color: string
  bgColor: string
  icon: string
  image?: string
}

/** 提示词项 */
export type PromptItem = string | { text: string; fillPlaceholder?: string }

/** AI助手 */
export interface Assistant {
  id: string
  name: string
  subtitle: string
  icon: string
  color: string
  bgColor: string
  image?: string
  welcomeMessage: string
  /** 提示词（选中助手后展示，点击直接发送或填充输入框） */
  prompts?: PromptItem[]
  /** 模拟回复关键词 → 回复内容 */
  responses: { keywords: string[]; reply: string; output?: OutputItem }[]
}

/** 对话流步骤 */
export interface FlowStep {
  /** 对应助手的id */
  assistantId: string
  /** 用户指令 */
  userCommand: string
  /** AI回复内容 */
  reply: string
  /** 输出物 */
  output?: OutputItem
}

/** 任务 */
export interface Task {
  id: string
  title: string
  description: string
  customer?: string
  status: 'pending' | 'processing' | 'done'
  statusLabel: string
  priority?: 'high' | 'medium' | 'low'
  relatedModel?: string
}

/** 支持中心任务分组 */
export interface TaskGroup {
  roleName: string
  roleIcon: string
  count: number
  tasks: Task[]
}

/** 异常提醒 */
export interface ExceptionAlert {
  id: string
  title: string
  description: string
  level: 'high' | 'medium' | 'low'
  levelLabel: string
  time: string
}

/** 输出物 */
export interface OutputItem {
  fileName: string
  fileType: string
  generatedBy: string
  relatedModel: string
  relatedCustomer: string
  content: string
}

/** 对话消息 */
export interface ChatMessage {
  id: string
  role: 'ai' | 'user'
  content: string
  output?: OutputItem
  timestamp: string
}

/** 历史会话 */
export interface HistorySession {
  id: string
  assistantName: string
  assistantIcon: string
  lastMessage: string
  time: string
  messageCount: number
}

/** 差旅数据 */
export interface TravelRecord {
  id: string
  date: string
  destination: string
  purpose: string
  amount: number
  status: 'reimbursed' | 'pending' | 'approved'
}
