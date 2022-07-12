import { FC, ReactNode, useState } from 'react'
import { Switch } from '@headlessui/react'
import classNames from 'classnames'

export interface ToggleSwitchPropType {
  defaultEnabled?: boolean
  optionA?: ReactNode
  optionB?: ReactNode
}

export const ToggleSwitch: FC<ToggleSwitchPropType> = ({
  defaultEnabled = false,
  optionA,
  optionB,
}) => {
  const [enabled, setEnabled] = useState(defaultEnabled)

  return (
    <Switch.Group>
      <div className="flex items-center gap-3">
        {optionA && (
          <Switch.Label
            onClick={() => setEnabled(false)}
            role="button"
            className={classNames(
              optionB && !enabled ? 'text-brand' : 'text-gray-500',
              'font-semibold'
            )}
          >
            {optionA}
          </Switch.Label>
        )}
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={classNames(
            !optionB && (enabled ? 'bg-brand' : 'bg-gray-400'),
            optionB && 'bg-brand',
            'relative inline-flex h-6 w-11 items-center',
            'rounded-full transition-colors focus:outline-none',
            'focus:ring-2 focus:ring-brand focus:ring-offset-2'
          )}
        >
          <span
            className={`${
              enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
        {optionB && (
          <Switch.Label
            onClick={() => setEnabled(true)}
            role="button"
            className={classNames(
              enabled ? 'text-brand' : 'text-gray-500',
              'font-semibold'
            )}
          >
            {optionB}
          </Switch.Label>
        )}
      </div>
    </Switch.Group>
  )
}
