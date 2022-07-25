import { ListBox } from '@components/ListBox'
import { ToggleSwitch } from '@components/Toggle'
import { districts } from '@data/districts'
import { mapRawQueryToState, ParsedPageQueryType } from '@lib/utils/queryUtil'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { FC } from 'react'

export type TreeMapControlsPropType = Partial<ParsedPageQueryType> & {
  onChange: (newQuery: Partial<ParsedPageQueryType>) => void
}

const Separator: FC = () => <span className="h-10 w-[1px] bg-gray-200" />

export const TreeMapControls: FC<TreeMapControlsPropType> = ({
  district,
  onChange,
}) => {
  const { query } = useRouter()

  const mappedQuery = mapRawQueryToState(query)
  const mappedDistricts = Object.keys(districts)
    .sort()
    .map((key) => ({
      id: key,
      name: districts[key as keyof typeof districts] || ' ',
    }))
  const foundDistrict = mappedDistricts.find(({ id }) => id === district)

  return (
    <div className="w-full">
      <nav
        aria-label="Navigation der Visualisierung"
        className={classNames(
          'w-full',
          'sm:flex gap-6 justify-between items-center'
        )}
      >
        <div
          className={classNames(
            'w-full sm:w-auto',
            'grid grid-cols-1 sm:grid-cols-[1fr,auto,1fr] gap-y-3 sm:gap-x-6'
          )}
        >
          <ToggleSwitch
            value={mappedQuery.showExpenses ?? true}
            optionA="Einnahmen"
            optionB="Ausgaben"
            onChange={(isOn) =>
              onChange({ ...mappedQuery, showExpenses: isOn })
            }
          />
          <div className="hidden sm:inline-flex">
            <Separator />
          </div>
          <ListBox
            selected={foundDistrict}
            onChange={(district) =>
              onChange({
                ...mappedQuery,
                district: `${district}` as ParsedPageQueryType['district'],
              })
            }
            options={Object.keys(districts)
              .sort()
              .map((key) => ({
                id: key,
                name: districts[key as keyof typeof districts] || ' ',
              }))}
          />
        </div>
      </nav>
    </div>
  )
}
