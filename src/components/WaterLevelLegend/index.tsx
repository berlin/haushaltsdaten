import { ArrowsDiagonal } from '@components/Icons/ArrowsDiagonal'
import { ArrowsDiagonalMinimize2 } from '@components/Icons/ArrowsDiagonalMinimize2'
import classNames from 'classnames'
import { FC, useState } from 'react'
import colors from '../../style/colors'

export interface WaterLevelLegendType {
  collapsable?: boolean
  initiallyCollapsed?: boolean
  hasShadow?: boolean
}

const wrapperWhenExpandedStyles = classNames(
  'py-3',
  'bg-white',
  'rounded-sm border border-gray-200',
  'flex flex-wrap place-content-between'
)

export const WaterLevelLegend: FC<WaterLevelLegendType> = ({
  collapsable = false,
  initiallyCollapsed = false,
  hasShadow = false,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(initiallyCollapsed)

  const toggleCollapsed = (): void => {
    setIsCollapsed(!isCollapsed)
  }
  return (
    <div
      className={classNames(
        'relative px-4',
        isCollapsed && 'translate-y-3',
        !isCollapsed && wrapperWhenExpandedStyles,
        hasShadow && !isCollapsed && 'shadow-md'
      )}
    >
      {!isCollapsed && <h2 className="w-full font-semibold">Wasserstand</h2>}
      <div
        className={classNames(
          'mt-2 mb-1',
          'w-full h-3',
          'bg-gray-200',
          'rounded-full',
          isCollapsed
            ? 'ring-2 ring-white'
            : 'ring-2 ring-offset-0 ring-gray-200',
          'grid grid-flow-col gap-0'
        )}
      >
        {Object.values(colors.scale).map((color) => {
          return (
            <div
              key={color}
              style={{ backgroundColor: color }}
              className={classNames(
                'w-auto h-full',
                'first-of-type:rounded-l-full last-of-type:rounded-r-full'
              )}
            ></div>
          )
        })}
      </div>
      {!isCollapsed && (
        <>
          <span className="text-xs font-semibold text-gray-800">Trocken</span>
          <span className="text-xs font-semibold text-gray-800">Versorgt</span>
        </>
      )}
      {collapsable && (
        <button
          className={classNames(
            'absolute bottom-0 right-0',
            'bg-white',
            'rounded-full',
            'w-8 h-8',
            'border border-gray-200',
            'translate-x-1/2 translate-y-1/2',
            'flex justify-center items-center'
          )}
          onClick={toggleCollapsed}
        >
          {isCollapsed ? (
            <ArrowsDiagonal className="rotate-90" />
          ) : (
            <ArrowsDiagonalMinimize2 className="rotate-90" />
          )}
        </button>
      )}
    </div>
  )
}
