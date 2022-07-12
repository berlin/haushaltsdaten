import { Header } from '@components/Header'
import { useAnimationFrame } from '@lib/hooks/useAnimationFrame'
import classNames from 'classnames'
import { FC, useCallback, useRef, useState } from 'react'

export const SCROLL_THRESHOLD = 10

export const StoriesOverviewHeader: FC = () => {
  const prevScrollY = useRef(0)
  const headerRef = useRef<HTMLElement | null>(null)
  const [headerHeight, setHeaderHeight] = useState<number | null>(null)
  const [hasScrolledPastThreshold, setHasScrolledPastThreshold] =
    useState(false)

  const animationFrameCallback = useCallback(function onAnimationFrame(): void {
    if (headerRef.current && !headerHeight) {
      setHeaderHeight(headerRef.current.getBoundingClientRect().height)
    }
    const main = document.getElementsByTagName('main')[0]
    if (!main) return
    const currentScrollY = main.scrollTop

    if (prevScrollY.current > SCROLL_THRESHOLD) {
      setHasScrolledPastThreshold(true)
    }
    if (prevScrollY.current < SCROLL_THRESHOLD) {
      setHasScrolledPastThreshold(false)
    }

    prevScrollY.current = currentScrollY
  }, [])

  useAnimationFrame(animationFrameCallback)

  return (
    <>
      <header
        className={classNames(
          'fixed bg-white shadow-gray-400/10 z-10',
          hasScrolledPastThreshold ? 'shadow-lg' : 'shadow-none'
        )}
        ref={headerRef}
      >
        <Header compact={hasScrolledPastThreshold} />
        <h1
          className={classNames(
            'border-b border-gray-200 px-4',
            'transition-all',
            hasScrolledPastThreshold ? 'pb-3 pt-0' : 'pb-6 pt-3',
            hasScrolledPastThreshold ? 'text-xl' : 'text-3xl',
            hasScrolledPastThreshold ? 'font-bold' : 'font-semibold'
          )}
        >
          Stories
        </h1>
      </header>
      <div style={{ height: headerHeight || 121 }} />
    </>
  )
}
