import React, { useState, useRef, useEffect } from 'react'

interface RangeProps {
  min?: number | null
  max?: number | null
  rangeValues?: number[]
  currency: string
}

export const Range: React.FC<RangeProps> = ({ min, max, rangeValues, currency }: RangeProps) => {
  const bulletMinRef = useRef<HTMLDivElement>(null)
  const bulletMaxRef = useRef<HTMLDivElement>(null)
  const rangeContainerRef = useRef<HTMLDivElement>(null)
  const [isDraggingMin, setIsDraggingMin] = useState<boolean>(false)
  const [isDraggingMax, setIsDraggingMax] = useState<boolean>(false)

  // Initialize min and max values
  const initialMinValue = rangeValues ? rangeValues[0] : (min || 0)
  const initialMaxValue = rangeValues ? rangeValues[rangeValues.length - 1] : (max || 100)

  const [minValue, setMinValue] = useState(initialMinValue)
  const [maxValue, setMaxValue] = useState(initialMaxValue)

  // Get the closest value from rangeValues
  const getClosestValue = (position: number) => {
    if (!rangeValues) return position
    return rangeValues.reduce((prev, curr) => Math.abs(curr - position) < Math.abs(prev - position) ? curr : prev)
  }

  // Format the value for display
  const formatValue = (value: number) => {
    if (rangeValues) {
      return value.toFixed(2)
    }
    return Math.round(value).toString()
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingMin && !isDraggingMax) return

      const rect = rangeContainerRef.current!.getBoundingClientRect()
      let offsetX = e.clientX - rect.left
      offsetX = Math.max(0, Math.min(offsetX, rect.width))
      const percentage = (offsetX / rect.width) * 100
      const maxRange = rangeValues ? rangeValues[rangeValues.length - 1] : (max || 100)

      if (isDraggingMin) {
        if (percentage < maxValue) {
          const closestValue = getClosestValue((percentage / 100) * maxRange)
          if (closestValue !== maxValue) {
            bulletMinRef.current!.style.left = `${(closestValue / maxRange) * 100}%`
            setMinValue(closestValue)
          }
        }
      } else if (isDraggingMax) {
        if (percentage > minValue) {
          const closestValue = getClosestValue((percentage / 100) * maxRange)
          if (closestValue !== minValue) {
            bulletMaxRef.current!.style.left = `${(closestValue / maxRange) * 100}%`
            setMaxValue(closestValue)
          }
        }
      }
    }

    const handleMouseUp = () => {
      setIsDraggingMin(false)
      setIsDraggingMax(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    // Add event listeners when dragging starts
    if (isDraggingMin || isDraggingMax) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    // Cleanup event listeners on unmount or when dragging stops
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDraggingMin, isDraggingMax, minValue, maxValue, rangeValues, max])

  const handleMouseDownMin = () => {
    setIsDraggingMin(true)
  }

  const handleMouseDownMax = () => {
    setIsDraggingMax(true)
  }

  return (
    <div className="range">
      <div className="range__container" ref={rangeContainerRef}>
        <div className="range__line" />
        <div
          className="range__line--active"
          style={{
            left: `${(minValue / (rangeValues ? rangeValues[rangeValues.length - 1] : max || 100)) * 100}%`,
            width: `${((maxValue - minValue) / (rangeValues ? rangeValues[rangeValues.length - 1] : max || 100)) * 100}%`,
          }}
        />
        <div
          className="range__bullet range__bullet--min"
          ref={bulletMinRef}
          onMouseDown={handleMouseDownMin}
          style={{ left: `${(minValue / (rangeValues ? rangeValues[rangeValues.length - 1] : max || 100)) * 100}%` }}
        />
        <div
          className="range__bullet range__bullet--max"
          ref={bulletMaxRef}
          onMouseDown={handleMouseDownMax}
          style={{ left: `${(maxValue / (rangeValues ? rangeValues[rangeValues.length - 1] : max || 100)) * 100}%` }}
        />
        <div className="range__price">
          <label>{formatValue(minValue)} {currency}</label>
          <label>{formatValue(maxValue)} {currency}</label>
        </div>
      </div>
    </div>
  )
}
