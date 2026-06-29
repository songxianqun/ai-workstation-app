import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { travelRecords, travelStats } from '../data/mockData'

export default function TravelAnalysis() {
  const navigate = useNavigate()

  const statusLabel = {
    reimbursed: { text: '已报销', color: 'bg-green-50 text-green-600' },
    pending: { text: '待报销', color: 'bg-orange-50 text-orange-600' },
    approved: { text: '已审批', color: 'bg-blue-50 text-blue-600' },
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Header title="差旅分析" showBack onBack={() => navigate(-1)} />

      <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-4">
        {/* 统计卡片 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <p className="text-[12px] text-gray-400">本月出差</p>
            <p className="text-[24px] font-bold text-gray-900 mt-1">{travelStats.totalTrips}<span className="text-[14px] text-gray-400 font-normal ml-1">次</span></p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <p className="text-[12px] text-gray-400">差旅费用</p>
            <p className="text-[24px] font-bold text-gray-900 mt-1">¥{(travelStats.totalAmount / 10000).toFixed(1)}<span className="text-[14px] text-gray-400 font-normal ml-1">万</span></p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <p className="text-[12px] text-gray-400">平均费用</p>
            <p className="text-[24px] font-bold text-gray-900 mt-1">¥{travelStats.avgAmount}<span className="text-[14px] text-gray-400 font-normal ml-1">元</span></p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <p className="text-[12px] text-gray-400">待报销</p>
            <p className="text-[24px] font-bold text-orange-500 mt-1">{travelStats.pendingCount}<span className="text-[14px] text-gray-400 font-normal ml-1">笔</span></p>
          </div>
        </div>

        {/* 趋势占位 */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[14px] font-semibold text-gray-800">差旅趋势</p>
            <span className="text-[12px] text-green-500">↑ {travelStats.monthlyChange}%</span>
          </div>
          <div className="h-24 flex items-end gap-2">
            {[40, 65, 50, 80, 60, 90, 75, 85].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-primary-200 to-primary-400"
                  style={{ height: `${h}%` }}
                />
                <span className="text-[9px] text-gray-400">W{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 差旅明细 */}
        <div>
          <p className="text-[14px] font-semibold text-gray-800 mb-3 px-1">差旅明细</p>
          <div className="space-y-2">
            {travelRecords.map((record) => (
              <div key={record.id} className="bg-white rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[16px]">✈️</span>
                    <div>
                      <p className="text-[14px] font-medium text-gray-800">{record.destination}</p>
                      <p className="text-[12px] text-gray-400 mt-0.5">{record.date} · {record.purpose}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[15px] font-semibold text-gray-900">¥{record.amount}</p>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full mt-1 inline-block ${statusLabel[record.status].color}`}>
                      {statusLabel[record.status].text}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
