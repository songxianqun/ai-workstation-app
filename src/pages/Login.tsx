import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import type { UserRole } from '../data/types'

export default function Login() {
  const navigate = useNavigate()
  const login = useAppStore((s) => s.login)
  const [account, setAccount] = useState('demo')
  const [password, setPassword] = useState('••••••')
  const [role, setRole] = useState<UserRole>('team')

  const handleLogin = () => {
    const name = role === 'team' ? '王辉' : '陈均瑞'
    login(role, name)
    navigate(role === 'team' ? '/team' : '/support')
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-primary-50 to-white overflow-y-auto scrollbar-hide">
      {/* 品牌区 */}
      <div className="flex flex-col items-center pt-16 pb-10">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-300 to-primary-500 flex items-center justify-center text-[40px] mb-5 shadow-lg shadow-primary-300/50">
          🤖
        </div>
        <h1 className="text-[24px] font-bold text-gray-900">员工工作台</h1>
        <p className="text-[14px] text-gray-500 mt-2">智能办公助手，让工作更高效</p>
      </div>

      {/* 表单区 */}
      <div className="px-8 flex-1">
        {/* OA账号 */}
        <div className="mb-4">
          <div className="flex items-center gap-3 px-4 py-3.5 bg-white rounded-2xl border border-primary-200 shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="#C19A6B" strokeWidth="1.8" />
              <path d="M4 21C4 16.5 7.5 13 12 13C16.5 13 20 16.5 20 21" stroke="#C19A6B" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              placeholder="请输入OA账号"
              className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-gray-300"
            />
          </div>
        </div>

        {/* 密码 */}
        <div className="mb-6">
          <div className="flex items-center gap-3 px-4 py-3.5 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="5" y="11" width="14" height="10" rx="2" stroke="#E8804C" strokeWidth="1.8" />
              <path d="M8 11V8C8 5.8 9.8 4 12 4C14.2 4 16 5.8 16 8V11" stroke="#E8804C" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
              className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-gray-300"
            />
          </div>
        </div>

        {/* 角色选择 */}
        <p className="text-[13px] text-gray-500 mb-2.5">选择角色</p>
        <div className="grid grid-cols-2 gap-3 mb-7">
          <button
            onClick={() => setRole('team')}
            className={`py-3.5 rounded-2xl text-[14px] font-medium transition-all ${
              role === 'team'
                ? 'bg-primary-50 border-2 border-primary-300 text-primary-500'
                : 'bg-gray-50 border-2 border-transparent text-gray-500'
            }`}
          >
            业务团队
          </button>
          <button
            onClick={() => setRole('support')}
            className={`py-3.5 rounded-2xl text-[14px] font-medium transition-all ${
              role === 'support'
                ? 'bg-primary-50 border-2 border-primary-300 text-primary-500'
                : 'bg-gray-50 border-2 border-transparent text-gray-500'
            }`}
          >
            业务支持中心
          </button>
        </div>

        {/* 登录按钮 */}
        <button
          onClick={handleLogin}
          className="w-full py-4 rounded-2xl text-[16px] font-semibold text-white bg-gradient-to-r from-primary-300 to-primary-500 shadow-lg shadow-primary-300/40 active:scale-[0.98] transition-transform"
        >
          登 录
        </button>

        {/* 辅助链接 */}
        <div className="text-center mt-4">
          <button className="text-[14px] text-blue-500 active:opacity-60">
            使用用户名登录
          </button>
        </div>
      </div>
    </div>
  )
}
