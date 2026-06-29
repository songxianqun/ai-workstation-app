import { useNavigate } from 'react-router-dom'
import { roles } from '../data/mockData'

/** 角色头像横向滚动条（仅展示+点击跳转到智能体页面） */
export default function RoleAvatarBar() {
  const navigate = useNavigate()

  return (
    <div className="flex-shrink-0 w-full overflow-hidden py-3 border-b border-gray-50">
      <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-1">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => navigate(`/agent/${role.id}`)}
            className="flex flex-col items-center gap-1.5 flex-shrink-0 active:opacity-60"
          >
            <div
              className="w-[52px] h-[52px] rounded-full flex items-center justify-center border-2 border-white shadow-sm overflow-hidden"
              style={{ backgroundColor: role.bgColor }}
            >
              {role.image ? (
                <img src={role.image} alt={role.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[22px]">{role.icon}</span>
              )}
            </div>
            <span className="text-[11px] text-gray-600 whitespace-nowrap">
              {role.shortName}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
