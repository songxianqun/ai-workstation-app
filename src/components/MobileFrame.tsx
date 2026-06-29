import React from 'react'

interface MobileFrameProps {
  children: React.ReactNode
}

/** iPhone风格手机外壳框架 */
export default function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div className="relative" style={{ width: '375px', height: '812px' }}>
      {/* 手机外框 */}
      <div className="relative w-full h-full bg-white rounded-[44px] shadow-2xl overflow-hidden border-[10px] border-[#1a1a1a]">
        {/* 灵动岛 */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[110px] h-[32px] bg-[#1a1a1a] rounded-full z-50" />

        {/* 状态栏 */}
        <div className="absolute top-0 left-0 right-0 h-[50px] flex items-end justify-between px-7 pb-1 z-40">
          <span className="text-[14px] font-semibold text-black">9:41</span>
          <div className="flex items-center gap-1">
            {/* 信号 */}
            <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
              <rect x="0" y="7" width="3" height="4" rx="1" fill="black" />
              <rect x="4.5" y="5" width="3" height="6" rx="1" fill="black" />
              <rect x="9" y="2.5" width="3" height="8.5" rx="1" fill="black" />
              <rect x="13.5" y="0" width="3" height="11" rx="1" fill="black" />
            </svg>
            {/* WiFi */}
            <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
              <path d="M8 2C5 2 2.5 3.2 0.8 4.8L2 6C3.4 4.7 5.6 3.8 8 3.8C10.4 3.8 12.6 4.7 14 6L15.2 4.8C13.5 3.2 11 2 8 2Z" fill="black"/>
              <path d="M8 5.2C6 5.2 4.2 6 3 7.2L4.2 8.4C5.2 7.5 6.5 7 8 7C9.5 7 10.8 7.5 11.8 8.4L13 7.2C11.8 6 10 5.2 8 5.2Z" fill="black"/>
              <circle cx="8" cy="10" r="1.5" fill="black"/>
            </svg>
            {/* 电池 */}
            <div className="flex items-center gap-0.5">
              <div className="w-[24px] h-[11px] rounded-[3px] border border-black/40 flex items-center px-[1px]">
                <div className="w-[18px] h-[7px] bg-black rounded-[1px]" />
              </div>
              <div className="w-[1.5px] h-[4px] bg-black/40 rounded-r-sm" />
            </div>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="absolute top-[50px] left-0 right-0 bottom-0 flex flex-col overflow-hidden">
          {children}
        </div>

        {/* Home指示条 */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-full z-50" />
      </div>
    </div>
  )
}
