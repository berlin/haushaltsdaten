import { mapRawQueryToState } from '@lib/utils/queryUtil'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useHashIdScroll = (): void => {
  const { query } = useRouter()
  const { hashId } = mapRawQueryToState(query)

  useEffect(() => {
    if (!hashId) return
    const elToScrollTo = document.getElementById(hashId)
    if (!elToScrollTo) return
    elToScrollTo.scrollIntoView({ behavior: 'smooth' })
  }, [hashId])
}
