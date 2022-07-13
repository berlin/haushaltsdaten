import { EmbeddPopup } from '@components/EmbeddPopup'
import { ListBox } from '@components/ListBox'
import { ToggleSwitch } from '@components/Toggle'
import { districts } from '@data/districts'
import { mapRawQueryToState, ParsedPageQueryType } from '@lib/utils/queryUtil'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { FC } from 'react'

export type HeaderPropType = Partial<ParsedPageQueryType>

const Separator: FC = () => <span className="h-10 w-[1px] bg-gray-200" />

export const Header: FC<HeaderPropType> = ({ district }) => {
  const { query, push, pathname } = useRouter()
  const mappedQuery = mapRawQueryToState(query)
  const mappedDistricts = Object.keys(districts)
    .sort()
    .map((key) => ({
      id: key,
      name: districts[key as keyof typeof districts] || ' ',
    }))
  const foundDistrict = mappedDistricts.find(({ id }) => id === district)

  const updateUrl = (newQuery: Partial<ParsedPageQueryType>): void => {
    void push({ pathname, query: { ...mappedQuery, ...newQuery } }, undefined, {
      shallow: true,
    })
  }

  return (
    <header
      className={classNames(
        'fixed px-8 py-4',
        'w-screen inset-0 bottom-auto bg-gray-50',
        'border-b border-gray-100'
      )}
    >
      <div className="container max-w-8xl mx-auto flex justify-between items-center">
        <h1 className="font-bold text-xl">
          Berliner Haushaltsdaten <span className="font-normal">2022</span>
        </h1>
        <nav className="flex gap-6">
          <ToggleSwitch
            value={mappedQuery.showExpenses ?? true}
            optionA="Einnahmen"
            optionB="Ausgaben"
            onChange={(isOn) => updateUrl({ showExpenses: isOn })}
          />
          <Separator />
          <ListBox
            selected={foundDistrict}
            onChange={(district) =>
              updateUrl({
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
          <Separator />
          <EmbeddPopup />
        </nav>
      </div>
    </header>
  )
}
