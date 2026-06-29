import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { exceptionAlerts } from '../data/mockData'

export default function ExceptionAlerts() {
  const navigate = useNavigate()

  const levelConfig = {
    high: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-l-red-500', label: '高危' },
    medium: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-l-orange-400', label: '中危' },
    low: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-l-yellow-400', label: '低危' },
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Header
        title="异常提醒"
        showBack
        onBack={() => navigate(-1)}
        rightSlot={
          <span className="text-[13px] font-semibold text-red-500">{exceptionAlerts.length}项</span>
        }
      />

      <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-3">
        {exceptionAlerts.map((alert) => {
          const cfg = levelConfig[alert.level]
          return (
            <div
              key={alert.id}
              className={`bg-white rounded-2xl p-4 border border-gray-100 border-l-4 ${cfg.border} active:bg-gray-50`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text} font-medium`}>
                      {alert.levelLabel}
                    </span>
                    <span className="text-[11px] text-gray-400">{alert.time}</span>
                  </div>
                  <p className="text-[14px] font-semibold text-gray-800">{alert.title}</p>
                  <p className="text-[13px] text-gray-500 mt-1.5 leading-relaxed">{alert.description}</p>
                </div>
                <span className="text-[20px] ml-2">
                  {alert.level === 'high' ? '🔴' : alert.level === 'medium' ? '🟠' : '🟡'}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
                <button className="text-[12px] text-primary-500 font-medium active:opacity-60">查看详情</button>
                <span className="text-gray-200">|</span>
                <button className="text-[12px] text-gray-500 active:opacity-60">标记已处理</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
