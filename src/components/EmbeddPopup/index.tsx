import { ChevronDown } from '@components/Icons'
import { Paragraph } from '@components/Paragraph'
import { RadioGroup } from '@components/RadioGroup'
import { Popover, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { FC, Fragment } from 'react'

export const EmbeddPopup: FC = () => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open && 'text-opacity-90',
              'group inline-flex items-center rounded bg-gray-900',
              'px-3 py-2 text-base font-bold text-white',
              'transition-colors',
              'hover:bg-brand focus:outline-none',
              'focus-visible:ring-2 focus-visible:ring-brand',
              'focus-visible:ring-offset-2 focus-visible:ring-offset-white'
            )}
          >
            <span>Einbetten</span>
            <ChevronDown
              className={`${open ? '' : 'text-opacity-70'}
                  ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
              aria-hidden="true"
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 mt-3 w-80" static>
              <div className="overflow-hidden rounded shadow-lg shadow-gray-100 ring-1 ring-gray-200">
                <div className="bg-white px-5 py-4">
                  <h3 className="text-lg font-bold">Ansicht einbetten</h3>
                  <Paragraph className="leading-tight text-gray-500">
                    Gibt dir einen Link, den du als iframe einbetten kannst
                  </Paragraph>
                  <RadioGroup
                    options={[
                      {
                        name: 'viz',
                        title: 'Nur Visualisierung',
                        subtitle: 'Ohne Labels etc.',
                      },
                      {
                        name: 'all',
                        title: 'Ganze Seite',
                        subtitle: 'Mit kontextuellen Infos',
                      },
                    ]}
                  />
                  <label htmlFor="url" className="text-sm block mb-1 mt-4">
                    Kopieren Sie die folgende URL
                  </label>
                  <input
                    name="url"
                    type="text"
                    readOnly
                    value={`http://localhost:6007/?path=/story/ui-elements-header--default`}
                    className={classNames(
                      'w-full mb-4 font-mono text-sm',
                      'px-3 py-2 border border-gray-200 rounded outline-none',
                      'focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand',
                      'focus-visible:ring-offset-2 focus-visible:ring-offset-white'
                    )}
                  />
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}