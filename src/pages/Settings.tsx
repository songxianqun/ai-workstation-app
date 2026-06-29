import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

export default function Settings() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState(true)
  const [voiceInput, setVoiceInput] = useState(true)
  const [autoUpdate, setAutoUpdate] = useState(false)

  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className={`w-12 h-7 rounded-full transition-colors relative ${on ? 'bg-primary-400' : 'bg-gray-200'}`}
    >
      <div
        className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${
          on ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  )

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Header title="设置" showBack onBack={() => navigate(-1)} />

      <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-4">
        {/* 通知设置 */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-50">
            <span className="text-[14px] text-gray-700">消息提醒</span>
            <Toggle on={notifications} onToggle={() => setNotifications(!notifications)} />
          </div>
          <div className="flex items-center justify-between px-4 py-3.5">
            <span className="text-[14px] text-gray-700">语音输入</span>
            <Toggle on={voiceInput} onToggle={() => setVoiceInput(!voiceInput)} />
          </div>
        </div>

        {/* 其他设置 */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <button className="w-full flex items-center justify-between px-4 py-3.5 border-b border-gray-50 active:bg-gray-50">
            <span className="text-[14px] text-gray-700">清除缓存</span>
            <span className="text-[12px] text-gray-400">23.5 MB</span>
          </button>
          <button className="w-full flex items-center justify-between px-4 py-3.5 border-b border-gray-50 active:bg-gray-50">
            <span className="text-[14px] text-gray-700">自动更新</span>
            <Toggle on={autoUpdate} onToggle={() => setAutoUpdate(!autoUpdate)} />
          </button>
          <button className="w-full flex items-center justify-between px-4 py-3.5 active:bg-gray-50">
            <span className="text-[14px] text-gray-700">关于我们</span>
            <span className="text-[12px] text-gray-400">v1.0.0</span>
          </button>
        </div>

        {/* 用户信息 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-300 to-primary-500 flex items-center justify-center text-white text-[20px]">
              我
            </div>
            <div>
              <p className="text-[15px] font-medium text-gray-800">demo</p>
              <p className="text-[12px] text-gray-400">员工工作台 v1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
