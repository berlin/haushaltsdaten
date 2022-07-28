import React, { useState } from 'react'
import { FC, useEffect, useRef } from 'react'

export const FadeInWrapper: FC = ({ children }) => {
  const [isVisible, setVisible] = useState(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!wrapperRef.current) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(entry.isIntersecting)
        }
      })
    })
    observer.observe(wrapperRef.current)
  }, [])
  return (
    <div
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
      ref={wrapperRef}
    >
      {children}
    </div>
  )
}
