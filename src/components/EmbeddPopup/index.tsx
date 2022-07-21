import { CopyTextField } from '@components/CopyTextField'
import { ChevronDown } from '@components/Icons'
import { Paragraph } from '@components/Paragraph'
import { Popover, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { FC, Fragment } from 'react'

export const EmbeddPopup: FC = () => {
  const { asPath } = useRouter()
  const sharableURL = `${
    typeof window !== 'undefined' ? window.location.origin : ''
  }${asPath.replace('/visualisierung', '/share')}`

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
              <div className="overflow-hidden rounded shadow-lg shadow-gray-900/5 ring-1 ring-gray-200">
                <div className="bg-white px-5 py-4">
                  <h3 className="text-lg font-bold">Auswahl einbetten</h3>
                  <Paragraph className="leading-normal text-gray-500">
                    Dieser Link kann zum Einbetten der Auswahl in ein{' '}
                    <code className="rounded-md bg-gray-100 px-1 py-0.5">
                      iframe
                    </code>{' '}
                    benutzt werden.
                  </Paragraph>
                  <CopyTextField
                    contentToCopy={sharableURL}
                    name="url"
                    label="Kopiere die folgende URL"
                  >
                    {sharableURL}
                  </CopyTextField>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
