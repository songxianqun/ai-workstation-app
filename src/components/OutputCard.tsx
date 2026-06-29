import { useState } from 'react'
import type { OutputItem } from '../data/types'

interface OutputCardProps {
  output: OutputItem
}

/** 输出物卡片（内联在对话流中展示） */
export default function OutputCard({ output }: OutputCardProps) {
  const [expanded, setExpanded] = useState(false)

  const fileIcon = output.fileType === 'pdf' ? '📕' : output.fileType === 'xlsx' ? '📗' : '📘'
  const fileLabel = output.fileType === 'pdf' ? 'PDF文档' : output.fileType === 'xlsx' ? 'Excel表格' : 'Word文档'

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      {/* 文件头 */}
      <div className="flex items-center gap-3 p-3.5 border-b border-gray-50">
        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[20px] flex-shrink-0">
          {fileIcon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-gray-800 truncate">{output.fileName}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">{fileLabel} · 由{output.generatedBy}生成</p>
        </div>
      </div>

      {/* 关联信息 */}
      <div className="px-3.5 py-2.5 space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-400 w-14">关联模型</span>
          <span className="text-[12px] text-gray-700">{output.relatedModel}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-400 w-14">关联客户</span>
          <span className="text-[12px] text-gray-700">{output.relatedCustomer}</span>
        </div>
      </div>

      {/* 内容描述（可展开） */}
      {expanded && (
        <div className="px-3.5 pb-2.5 animate-fadeIn">
          <p className="text-[12px] text-gray-500 leading-relaxed">{output.content}</p>
        </div>
      )}

      {/* 操作栏 */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-gray-50/50 border-t border-gray-50">
        <span className="text-[10px] text-gray-400">内容由 AI 生成，仅供参考</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[11px] text-primary-500 font-medium active:opacity-60"
          >
            {expanded ? '收起' : '详情'}
          </button>
          <button className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-50 active:opacity-60">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" stroke="#C19A6B" strokeWidth="2" />
              <circle cx="12" cy="12" r="3" stroke="#C19A6B" strokeWidth="2" />
            </svg>
            <span className="text-[11px] text-primary-500 font-medium">查看文件</span>
          </button>
        </div>
      </div>
    </div>
  )
}
