import * as React from "react"
import { cn } from "../../lib/utils"

export interface SliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ value, onValueChange, min = 0, max = 100, step = 1, className, ...props }, ref) => (
    <input
      ref={ref}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value[0]}
      onChange={(e) => onValueChange([parseInt(e.target.value)])}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    />
  )
)
Slider.displayName = "Slider"

export { Slider }