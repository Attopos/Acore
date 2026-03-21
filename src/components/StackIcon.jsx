import { stackIcons } from '../data/stackIcons'

function StackIconFallback({ label, className = '', chrome = true }) {
  return (
    <div
      className={`flex items-center justify-center text-[10px] font-semibold uppercase tracking-[0.06em] ${
        chrome
          ? 'rounded-2xl border border-[#b3a8a2] bg-[#ddd3cc] text-[#2d2627] shadow-[inset_0_1px_0_rgba(255,255,255,0.42)]'
          : 'text-[#eee5df]'
      } ${className}`.trim()}
      title={label}
      aria-label={label}
    >
      {label.slice(0, 2)}
    </div>
  )
}

export default function StackIcon({
  label,
  className = 'h-10 w-10',
  chrome = true,
}) {
  const icon = stackIcons[label]

  if (!icon) {
    return <StackIconFallback label={label} className={className} chrome={chrome} />
  }

  return (
    <div
      className={`flex items-center justify-center ${
        chrome
          ? 'rounded-2xl border border-[#b3a8a2] bg-[#ddd3cc] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.42)]'
          : 'text-white'
      } ${className}`.trim()}
      title={icon.title}
      aria-label={icon.title}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5"
        fill={`#${icon.hex}`}
      >
        <path d={icon.path} />
      </svg>
    </div>
  )
}
