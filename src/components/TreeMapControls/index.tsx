import { ListBox } from '@components/ListBox'
import { ToggleSwitch } from '@components/Toggle'
import { districts } from '@data/districts'
import { mapRawQueryToState, ParsedPageQueryType } from '@lib/utils/queryUtil'
import { DEFAULT_YEAR, VALID_YEARS } from '@lib/utils/yearValidator'
import { DEFAULT_MODUS, VALID_MODUS } from '@lib/utils/modusValidator'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { InternalLink } from '@components/InternalLink'
import { isValidYear } from '@lib/utils/yearValidator'

export type TreeMapControlsPropType = Partial<ParsedPageQueryType> & {
  onChange: (newQuery: Partial<ParsedPageQueryType>) => void
}

const Separator: FC = () => <span className="h-10 w-[1px] bg-gray-200" />

export const TreeMapControls: FC<TreeMapControlsPropType> = ({
  district,
  onChange,
}) => {
  const { query } = useRouter()
  let { year } = query
  if (year === undefined) {
    year = `${DEFAULT_YEAR}`
  } else if (Array.isArray(year)) {
    year = `${DEFAULT_YEAR}`
  } else if (!isNaN(parseInt(year)) && !isValidYear(parseInt(year))) {
    year = `${DEFAULT_YEAR}`
  }
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
            'grid grid-cols-1 sm:grid-cols-[1fr,auto,1fr,auto,1fr,auto,1fr] gap-y-3 sm:gap-x-2 md:gap-x-6 pr-4'
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
            additionalClasses="z-20"
          />
          <div className="hidden sm:inline-flex">
            <Separator />
          </div>
          <ListBox
            selected={{
              id: (year as string | number) ?? DEFAULT_YEAR,
              name: (year as string | number) ?? DEFAULT_YEAR,
            }}
            onChange={(year) =>
              onChange({
                ...mappedQuery,
                year: year as number,
              })
            }
            options={VALID_YEARS.map((year) => {
              return {
                id: `${year}`,
                name: `${year}`,
              }
            })}
            additionalClasses="z-10"
          />
          <div className="hidden sm:inline-flex">
            <Separator />
          </div>
          <div className="flex items-center gap-2">
            <ListBox
              selected={{ id: DEFAULT_MODUS, name: DEFAULT_MODUS }}
              onChange={(modus) =>
                onChange({
                  ...mappedQuery,
                  modus: modus as string,
                })
              }
              options={VALID_MODUS.map((modus) => {
                return {
                  id: `${modus}`,
                  name: `${modus}`,
                }
              })}
              additionalClasses="w-full z-0"
            />
            <InternalLink
              href={'/faq'}
              query={{ hashId: 'Einzelplaene-und-Funktionen' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-info-circle"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <circle cx="12" cy="12" r="9"></circle>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                <polyline points="11 12 12 12 12 16 13 16"></polyline>
              </svg>
            </InternalLink>
          </div>
        </div>
      </nav>
    </div>
  )
}
