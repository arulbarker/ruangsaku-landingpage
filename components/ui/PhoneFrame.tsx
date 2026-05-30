'use client'

import { ReactNode, CSSProperties } from 'react'

interface PhoneFrameProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export function PhoneFrame({ children, className, style }: PhoneFrameProps) {
  return (
    <div className={`phone-frame-v2 ${className ?? ''}`} style={style}>
      <div className="phone-notch-v2" aria-hidden="true" />
      <div className="phone-screen-v2">{children}</div>
    </div>
  )
}
