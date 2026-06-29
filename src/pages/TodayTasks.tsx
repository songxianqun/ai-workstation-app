import { useNavigate, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import TaskCard from '../components/TaskCard'
import ExpandableGroup from '../components/ExpandableGroup'
import { teamTasks, supportTaskGroups } from '../data/mockData'

export default function TodayTasks() {
  const navigate = useNavigate()
  const location = useLocation()
  const isSupport = location.pathname.includes('support')

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Header
        title="今日任务"
        showBack
        onBack={() => navigate(-1)}
        rightSlot={
          <span className="text-[13px] font-semibold text-primary-500">
            {isSupport ? 4 : 6}项
          </span>
        }
      />

      <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-3">
        {isSupport ? (
          <>
            {/* 支持中心：按角色分组 */}
            <div className="text-[13px] text-gray-400 px-1">按业务助理分组</div>
            {supportTaskGroups.map((group) => (
              <ExpandableGroup key={group.roleName} group={group} />
            ))}
          </>
        ) : (
          <>
            {/* 业务团队：平铺列表 */}
            {teamTasks.map((task, idx) => (
              <TaskCard
                key={task.id}
                task={task}
                index={idx + 1}
                onClick={() => navigate(`/task/${task.id}`)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}
