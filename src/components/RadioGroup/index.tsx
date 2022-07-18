import { FC, useEffect, useState } from 'react'
import { RadioGroup as HUIRadioGroup } from '@headlessui/react'
import classNames from 'classnames'

interface RadioGroupPropTypeOption {
  name: string
  title: string
  subtitle: string
}

export interface RadioGroupPropType {
  options: RadioGroupPropTypeOption[]
  value: RadioGroupPropTypeOption
  onChange?: (newOption: RadioGroupPropTypeOption) => void
}

export const RadioGroup: FC<RadioGroupPropType> = ({
  options,
  value = options[0],
  onChange = () => undefined,
}) => {
  const [selected, setSelected] = useState(value)

  useEffect(() => {
    if (value === selected) return
    setSelected(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <div className="mx-auto w-full max-w-md py-2">
      <HUIRadioGroup
        value={selected}
        onChange={(newOption: RadioGroupPropTypeOption) => {
          setSelected(newOption)
          onChange(newOption)
        }}
      >
        <HUIRadioGroup.Label className="sr-only">Options</HUIRadioGroup.Label>
        {options.map((option) => (
          <HUIRadioGroup.Option
            key={option.name}
            value={option}
            className={({ active, checked }) =>
              `${checked ? 'text-gray-600' : ''}
              ${
                active || checked
                  ? 'ring-2 ring-brand ring-opacity-60 ring-offset-2 ring-offset-white'
                  : ''
              }
              relative flex cursor-pointer rounded-[1px] px-2 -ml-2 py-2 focus:outline-none`
            }
          >
            {({ checked }) => (
              <>
                <div className="flex w-full items-center justify-between group">
                  <div className="flex flex-col">
                    <HUIRadioGroup.Label
                      as="h4"
                      className={`
                          font-bold group-hover:text-brand
                          transition-colors
                          ${checked ? 'text-brand' : 'text-gray-900'}`}
                    >
                      {option.title}
                    </HUIRadioGroup.Label>
                    <HUIRadioGroup.Description
                      as="span"
                      className={`inline text-sm ${
                        checked
                          ? 'text-sky-100'
                          : 'text-gray-900 text-opacity-50'
                      }`}
                    >
                      {option.subtitle}
                    </HUIRadioGroup.Description>
                  </div>
                  <div
                    className={classNames(
                      'rounded-full h-3 w-3 transition-colors',
                      'ring-offset-4 ring-offset-white',
                      'ring-1',
                      checked
                        ? 'bg-brand ring-brand'
                        : 'bg-white ring-gray-300 group-hover:bg-gray-300'
                    )}
                  />
                </div>
              </>
            )}
          </HUIRadioGroup.Option>
        ))}
      </HUIRadioGroup>
    </div>
  )
}
