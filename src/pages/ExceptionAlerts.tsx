import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { exceptionAlerts } from '../data/mockData'

export default function ExceptionAlerts() {
  const navigate = useNavigate()
  const [processedIds, setProcessedIds] = useState<Set<string>>(new Set())

  const handleMarkProcessed = (id: string) => {
    setProcessedIds((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }

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
          <span className="text-[13px] font-semibold text-red-500">{exceptionAlerts.length - processedIds.size}项</span>
        }
      />

      <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-3">
        {exceptionAlerts.map((alert) => {
          const cfg = levelConfig[alert.level]
          const isProcessed = processedIds.has(alert.id)
          return (
            <div
              key={alert.id}
              className={`rounded-2xl p-4 border border-gray-100 border-l-4 ${
                isProcessed
                  ? 'bg-gray-100 border-l-gray-300 opacity-60'
                  : `bg-white ${cfg.border} active:bg-gray-50`
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                      isProcessed ? 'bg-gray-200 text-gray-500' : `${cfg.bg} ${cfg.text}`
                    }`}>
                      {isProcessed ? '已处理' : alert.levelLabel}
                    </span>
                    <span className="text-[11px] text-gray-400">{alert.time}</span>
                  </div>
                  <p className={`text-[14px] font-semibold ${isProcessed ? 'text-gray-500' : 'text-gray-800'}`}>{alert.title}</p>
                  <p className="text-[13px] text-gray-500 mt-1.5 leading-relaxed">{alert.description}</p>
                </div>
                <span className="text-[20px] ml-2">
                  {isProcessed ? '⚪' : alert.level === 'high' ? '🔴' : alert.level === 'medium' ? '🟠' : '🟡'}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
                <button className="text-[12px] text-primary-500 font-medium active:opacity-60">查看详情</button>
                <span className="text-gray-200">|</span>
                {isProcessed ? (
                  <span className="text-[12px] text-green-500 font-medium">✓ 已处理</span>
                ) : (
                  <button
                    onClick={() => handleMarkProcessed(alert.id)}
                    className="text-[12px] text-gray-500 active:opacity-60"
                  >
                    标记已处理
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
