import { FC } from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { mapRawQueryToState, ParsedPageQueryType } from '@lib/utils/queryUtil'

interface InternalLinkPropType extends LinkProps {
  href: string
  className?: string
  query?: Partial<ParsedPageQueryType>
}

export const InternalLink: FC<InternalLinkPropType> = ({
  href,
  children,
  query: additionalQuery = {},
  className = '',
  ...rest
}) => {
  const { query } = useRouter()
  const mappedQuery = { ...mapRawQueryToState(query), ...additionalQuery }

  return (
    <Link
      href={{
        pathname: href,
        query: mappedQuery,
      }}
      {...rest}
    >
      <a href={href} className={className}>
        {children}
      </a>
    </Link>
  )
}
