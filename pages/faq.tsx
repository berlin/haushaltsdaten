import { GetStaticProps } from 'next'
import React, { useState } from 'react'
import { FC } from 'react'
import { GroupedBarChart } from '@components/GroupedBarChart'
import { TOTAL_EXPENSES } from '@data/totalExpenses'
import { useTranslation } from 'react-i18next'

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async () => ({
  props: {
    title: 'Infos',
  },
})

const ReadMore: FC<{ children: string }> = ({ children }) => {
  const text = children
  const [isReadMore, setIsReadMore] = useState(true)
  const toggleReadMore = (): void => {
    setIsReadMore(!isReadMore)
  }
  const { t } = useTranslation()

  return (
    <div className="mt-6">
      <span
        dangerouslySetInnerHTML={{
          __html: isReadMore ? `${text.slice(0, 300)}` : text,
        }}
      ></span>
      <button
        onClick={toggleReadMore}
        className="font-medium text-brand cursor-pointer"
      >
        {isReadMore ? t('faq.readMore') : t('faq.readLess')}
      </button>
    </div>
  )
}

const Q4Text: FC = () => {
  const { t } = useTranslation()
  const raw = t('faq.q4Text')
  const html = raw
    .replace(
      /<1>(.*?)<\/1>/g,
      '<a class="text-brand" href="https://www.berlin.de/sen/finanzen/">$1</a>'
    )
    .replace(
      /<3>(.*?)<\/3>/g,
      '<a class="text-brand" href="https://daten.berlin.de">$1</a>'
    )
    .replace(
      /<5>(.*?)<\/5>/g,
      '<a class="text-brand" href="https://odis-berlin.de">$1</a>'
    )
  return <ReadMore>{html}</ReadMore>
}

const Q5Text: FC = () => {
  const { t } = useTranslation()
  const raw = t('faq.q5Text')
  const html = raw.replace(
    /<1>(.*?)<\/1>/g,
    '<a class="text-brand" href="https://github.com/berlin/haushaltsdaten">$1</a>'
  )
  return <ReadMore>{html}</ReadMore>
}

const Q6Text: FC = () => {
  const { t } = useTranslation()
  const raw = t('faq.q6Text')
  const html = raw.replace(
    /<1>(.*?)<\/1>/g,
    '<a class="text-brand" href="https://offenerhaushalt.de/page/datenstandard.html">$1</a>'
  )
  return <ReadMore>{html}</ReadMore>
}

export const FaqPage: FC = () => {
  const { t } = useTranslation()

  return (
    <div className="px-8">
      <div className="md:w-4/5 m-auto mt-12 md:mt-20">
        <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl lg:ml-28">
          {t('faq.title')}
        </h1>
        <div className="lg:w-3/6 m-auto mt-6 md:mt-16">
          <div className="flex-col mt-6">{t('faq.introText')}</div>

          <p className="text-2xl text-center mt-6 md:mt-16">
            {t('faq.totalAmount')}
          </p>
          <p className="text-gray-500 text-xs md:text-sm text-center">
            {t('faq.totalAmountDescription')}
          </p>

          <div className="mt-6 md:mt-16">{t('faq.budgetText')}</div>

          <p className="mt-6 md:mt-16 text-sm flex justify-center">
            {t('faq.chartCaption')}
          </p>
          <div className="mt-2 flex justify-center">
            <GroupedBarChart data={TOTAL_EXPENSES} />
          </div>
        </div>

        <div className="lg:w-3/6 m-auto mt-6 md:mt-12 mb-16 md:mb-28 ">
          <h2 className="font-bold text-xl md:text-2xl">
            {t('faq.focusTitle')}
          </h2>
          <div className="mt-6">{t('faq.focusText')}</div>
          <br></br>

          <div className="flex-col">
            <p className="text-brand">
              <a href="https://www.berlin.de/sen/finanzen/haushalt/">
                {t('faq.moreInfoLink')}
              </a>
            </p>
          </div>

          <h2 className="font-bold text-xl md:text-2xl mt-6 md:mt-12 md:mt-20">
            {t('faq.qaTitle')}
          </h2>
          <h2 className=" text-xl mt-6 md:mt-12" id="Warum-Haushaltsdaten">
            {t('faq.q1Title')}
          </h2>
          <ReadMore>{t('faq.q1Text')}</ReadMore>

          <h2 className=" text-xl mt-6 md:mt-12">{t('faq.q2Title')}</h2>
          <ReadMore>{t('faq.q2Text')}</ReadMore>

          <h2
            className=" text-xl mt-6 md:mt-12"
            id="Einzelplaene-und-Funktionen"
          >
            {t('faq.q3Title')}
          </h2>
          <ReadMore>{t('faq.q3Text')}</ReadMore>

          <h2 className=" text-xl mt-6 md:mt-12">{t('faq.q4Title')}</h2>
          <Q4Text />

          <h2 className=" text-xl mt-6 md:mt-12" id="Open-Source">
            {t('faq.q5Title')}
          </h2>
          <Q5Text />

          <h2 className=" text-xl mt-6 md:mt-12">{t('faq.q6Title')}</h2>
          <Q6Text />
        </div>
      </div>
    </div>
  )
}

export default FaqPage
