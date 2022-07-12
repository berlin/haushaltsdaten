import { InternalLink } from '@components/InternalLink'
import classNames from 'classnames'
import { DOMAttributes, FC } from 'react'

const scaleClasses = [
  'border-scale-1',
  'border-scale-2',
  'border-scale-3',
  'border-scale-4',
  'border-scale-5',
  'border-scale-6',
  'border-scale-7',
  'border-scale-8',
]

interface ChapterType {
  path: string
  title: string
}

export interface TableOfContentsPropType {
  chapters: ChapterType[]
  onChapterClick?: (chapter: ChapterType) => void
  activeChapterPath?: string
}

interface ChapterLinkPropType extends ChapterType {
  onClick: TableOfContentsPropType['onChapterClick']
  colorClass: string
  isActive?: boolean
}

const ChapterLink: FC<ChapterLinkPropType> = ({
  path,
  title,
  onClick = () => undefined,
  colorClass = scaleClasses[0],
  isActive = false,
}) => {
  const onChapterClick: DOMAttributes<HTMLElement>['onClick'] = (evt) => {
    evt.preventDefault()
    onClick({ path, title })
  }

  const wrapperStyles = classNames('block')
  const linkStyles = classNames(
    colorClass,
    'py-1 block transition-all',
    'hover:text-gray-900',
    'hover:border-l-8 hover:pl-5',
    isActive ? 'font-bold text-gray-900' : 'font-medium text-gray-600',
    isActive ? 'border-l-[12px] pl-4' : 'border-l-4 pl-6'
  )

  if (path.startsWith('/')) {
    return (
      <li className={wrapperStyles}>
        <InternalLink
          href={path}
          onClick={onChapterClick}
          className={linkStyles}
        >
          {title}
        </InternalLink>
      </li>
    )
  }
  return (
    <li className={wrapperStyles}>
      <a
        href={path}
        onClick={onChapterClick}
        rel="noreferrer nofollow"
        className={linkStyles}
      >
        {title}
      </a>
    </li>
  )
}

export const TableOfContents: FC<TableOfContentsPropType> = ({
  chapters,
  onChapterClick = () => undefined,
  activeChapterPath,
}) => (
  <ul className={classNames()}>
    {chapters.map((chapter, idx) => (
      <ChapterLink
        key={chapter.path}
        {...chapter}
        onClick={onChapterClick}
        isActive={chapter.path === activeChapterPath}
        colorClass={scaleClasses[Math.min(idx, scaleClasses.length - 1)]}
      />
    ))}
  </ul>
)
