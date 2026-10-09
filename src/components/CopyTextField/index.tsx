import { Check } from '@components/Icons'
import { useCopyToClipboard } from '@lib/hooks/useCopyToClipboard'
import classNames from 'classnames'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export interface CopyTextFieldPropType {
  name: string
  label: string
  children: string
  contentToCopy?: string
}

export const CopyTextField: FC<CopyTextFieldPropType> = ({
  name,
  label,
  children,
  contentToCopy = children,
}) => {
  const { hasCopied, copyToClipboard } = useCopyToClipboard()
  const { t } = useTranslation()
  return (
    <div className="flex-col mt-4">
      <label htmlFor={name} className="text-sm text-gray-500 mb-1 block">
        {label}
      </label>
      <input
        name={name}
        id={name}
        type="text"
        readOnly
        value={children}
        className={classNames(
          'w-full mb-1 font-mono text-sm',
          'px-3 py-2 border border-gray-200 rounded outline-none',
          'focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand',
          'focus-visible:ring-offset-2 focus-visible:ring-offset-white'
        )}
        onClick={() => {
          copyToClipboard(contentToCopy)
        }}
      />
      <div
        aria-hidden={!hasCopied}
        aria-label={t('embed.copied')}
        hidden={!hasCopied}
        className={classNames(
          'flex items-center justify-end',
          hasCopied ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div className="text-brand">
          <Check />
        </div>
        <span className="ml-1 text-xs text-gray-600">{t('embed.copied')}</span>
      </div>
    </div>
  )
}
