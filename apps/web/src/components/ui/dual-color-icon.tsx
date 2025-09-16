import * as React from "react"

export interface DualColorIconProps {
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>
  primaryColor?: string
  secondaryColor?: string
  className?: string
}

const DualColorIcon: React.FC<DualColorIconProps> = ({
  icon,
  primaryColor = "#3B82F6",
  secondaryColor = "#10B981",
  className,
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={secondaryColor} />
        </linearGradient>
      </defs>
      {React.cloneElement(icon, {
        fill: "url(#gradient)",
        stroke: "url(#gradient)"
      } as React.SVGProps<SVGSVGElement>)}
    </svg>
  )
}

DualColorIcon.displayName = "DualColorIcon"
