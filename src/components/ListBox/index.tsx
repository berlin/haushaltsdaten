import { useState, Fragment, FC, ReactNode } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Check, ChevronDown } from '@components/Icons'
import classNames from 'classnames'

interface ListBoxOptionType {
  id: string | number
  name: ReactNode
}

export interface ListBoxPropType {
  options: ListBoxOptionType[]
}

export const ListBox: FC<ListBoxPropType> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<ListBoxOptionType>(
    options[0]
  )

  return (
    <Listbox value={selectedOption} onChange={setSelectedOption}>
      <div className="relative mt-1">
        <Listbox.Button
          className={classNames(
            'group',
            'relative w-full cursor-default rounded transition-colors',
            'bg-white py-2 pl-3 pr-10 text-left border border-gray-200',
            'hover:text-brand cursor-pointer hover:border-brand',
            'focus:outline-none focus-visible:border-brand',
            'focus-visible:ring-2 focus-visible:ring-brand',
            'focus-visible:ring-opacity-75 focus-visible:ring-offset-2',
            'focus-visible:ring-offset-white sm:text-sm'
          )}
        >
          <span className="block truncate font-bold">
            {selectedOption.name}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDown
              className="h-5 w-5 text-gray-400 group-hover:text-brand transition-colors"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className={classNames(
              'absolute mt-1 max-h-60 w-full overflow-auto',
              'rounded bg-white py-1 text-base shadow-lg',
              'ring-1 ring-gray-200 focus:outline-none',
              'sm:text-sm'
            )}
          >
            {options.map((option, optionIdx) => (
              <Listbox.Option
                key={optionIdx}
                className={({ active, selected }) =>
                  classNames(
                    `transition-all`,
                    `relative cursor-default select-none py-2 pl-10 pr-4`,
                    !selected && 'cursor-pointer',
                    active && !selected
                      ? 'bg-gray-50 text-brand font-bold'
                      : 'text-gray-900'
                  )
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-bold' : ''
                      }`}
                    >
                      {option.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <Check className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
