interface QuickChip {
  label: string
  icon: string
  onClick: () => void
}

interface QuickAccessChipsProps {
  chips: QuickChip[]
}

/** 输入框上方快捷标签 */
export default function QuickAccessChips({ chips }: QuickAccessChipsProps) {
  return (
    <div className="flex-shrink-0 px-4 py-2 flex gap-2">
      {chips.map((chip, idx) => (
        <button
          key={idx}
          onClick={chip.onClick}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gray-50 border border-gray-200 active:bg-gray-100 transition-colors"
        >
          <span className="text-[14px]">{chip.icon}</span>
          <span className="text-[13px] font-medium text-gray-700">{chip.label}</span>
        </button>
      ))}
    </div>
  )
}
