import React from 'react'

interface HeaderProps {
  title?: string
  showBack?: boolean
  showMenu?: boolean
  showAvatar?: boolean
  onBack?: () => void
  onMenu?: () => void
  rightSlot?: React.ReactNode
}

/** 通用顶部栏 */
export default function Header({
  title,
  showBack = false,
  showMenu = false,
  showAvatar = false,
  onBack,
  onMenu,
  rightSlot,
}: HeaderProps) {
  return (
    <div className="flex-shrink-0 h-[52px] flex items-center justify-between px-4 bg-white border-b border-gray-100">
      {/* 左侧 */}
      <div className="w-[60px] flex items-center">
        {showBack && (
          <button
            onClick={onBack}
            className="w-9 h-9 flex items-center justify-center -ml-1 active:opacity-60"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        {showMenu && (
          <button
            onClick={onMenu}
            className="w-9 h-9 flex items-center justify-center -ml-1 active:opacity-60"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3 6H21M3 12H21M3 18H21" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      {/* 标题 */}
      {title && (
        <h1 className="text-[17px] font-semibold text-gray-900 truncate">{title}</h1>
      )}

      {/* 右侧 */}
      <div className="w-[60px] flex items-center justify-end">
        {rightSlot}
        {showAvatar && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-300 to-primary-500 flex items-center justify-center text-white text-sm font-medium">
            我
          </div>
        )}
      </div>
    </div>
  )
}
