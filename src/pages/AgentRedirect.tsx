import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { roles } from '../data/mockData'

export default function AgentRedirect() {
  const { agentId } = useParams()
  const navigate = useNavigate()

  const role = roles.find((r) => r.id === agentId)

  if (!role) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-400">智能体未找到</p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <Header title={role.name} showBack onBack={() => navigate(-1)} />

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center text-[48px] mb-6 shadow-lg overflow-hidden"
          style={{ backgroundColor: role.bgColor }}
        >
          {role.image ? (
            <img src={role.image} alt={role.name} className="w-full h-full object-cover" />
          ) : (
            role.icon
          )}
        </div>

        <h2 className="text-[20px] font-bold text-gray-900 mb-2">{role.name}</h2>
        <p className="text-[14px] text-gray-500 text-center mb-8">
          即将跳转到{role.name}的独立页面，该智能体由{role.shortName}业务部门独立维护。
        </p>

        <button
          onClick={() => navigate(-1)}
          className="w-full py-3.5 rounded-2xl text-[15px] font-semibold text-white bg-gradient-to-r from-primary-300 to-primary-500 active:scale-[0.98] transition-transform mb-3"
        >
          前往{role.shortName}智能体
        </button>

        <button
          onClick={() => navigate(-1)}
          className="w-full py-3.5 rounded-2xl text-[15px] font-medium text-gray-500 border-2 border-gray-200 active:bg-gray-50"
        >
          返回
        </button>
      </div>
    </div>
  )
}
