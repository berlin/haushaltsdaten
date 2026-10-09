import { FadeInWrapper } from '@components/FadeInWrapper'
import { GetStaticProps } from 'next'
import { FC } from 'react'
import TypeAnimation from 'react-type-animation'
import { InternalLink } from '@components/InternalLink'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { Trans } from 'react-i18next'

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: 'Startseite',
    },
  }
}

export const HomePage: FC = () => {
  const { basePath } = useRouter()
  const { t, i18n } = useTranslation()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const typeAnimationSequence: string[] = t('home.typeAnimation', {
    returnObjects: true,
  })

  return (
    <div className="px-8">
      <div className="md:w-4/5 m-auto mt-12 lg:mt-20">
        <div className="flex flex-wrap justify-between">
          <div className="flex-col lg:w-1/2 lg:pr-12">
            <span className="flex justify-center mt-10 md:mt-20 ">
              {/* <Building className="fill-gray-400"/> */}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold xl:text-right mb-3">
              {t('home.titleLine1')} <br></br>
              {t('home.titleLine2')}
            </h1>
            <h1 className="text-2xl md:text-4xl md:text-right">
              {t('home.year')}
            </h1>
          </div>
          <div className="flex-col italic xl:w-1/2 mt-6 md:mt-12 xl:mt-24 xl:pr-28">
            <Trans
              i18nKey="home.intro"
              components={{
                1: (
                  <InternalLink
                    href="/faq"
                    query={{ hashId: 'Open-Source' }}
                    className="text-brand"
                  />
                ),
              }}
            >
              Pro Jahr stehen der Berliner Verwaltung rund 46 Milliarden Euro
              zur Umsetzung der gesetzlichen Vorgaben und ihrer Ziele zur
              Verfügung.
            </Trans>
          </div>
        </div>

        <div className="lg:w-3/6 m-auto mt-12 md:mt-20">
          <div className="text-2xl md:text-4xl flex-col">
            <h1 className="flex lg:mt-28">{t('home.questionPrefix')}</h1>
            <h1 className="font-bold flex text-brand">
              <TypeAnimation
                key={i18n.language}
                cursor={false}
                sequence={typeAnimationSequence.flatMap((text: string) => [
                  text,
                  2000,
                ])}
                wrapper={'p'}
                repeat={Infinity}
              />
              <span className="text-white"> .</span>
            </h1>
          </div>
          <div className="m-auto mt-6 md:mt-8">
            {t('home.body1')}
            <br></br>
            <br></br>
            {t('home.body2')}
          </div>
        </div>

        <div className="md:flex justify-center m-auto mt-6 md:mt-12 ">
          <div className="flex-col mb-6 md:my-auto inline-block">
            <FadeInWrapper>
              <div className="pr-12">
                <ul>
                  <span className="font-bold text-xl text-brand">
                    <InternalLink href={'/visualisierung'}>
                      {t('home.toVisualization')}
                    </InternalLink>
                  </span>
                  <li>
                    <p className="pl-6">{t('home.exploreAll')}</p>
                  </li>
                </ul>
              </div>
            </FadeInWrapper>
          </div>
          <div className="flex-col inline-block my-auto justify-center md:pr-10">
            <iframe
              style={{ width: '100%' }}
              title={t('home.iframeTitle')}
              width="400rem"
              height="400"
              src={`${basePath}/share`}
            ></iframe>
          </div>
        </div>

        <div className="lg:w-3/6 m-auto mt-6 md:mt-12">
          {t('home.districtInfo')}
          <br></br>
          <br></br>
          {t('home.detailInfo')}
          <div className="flex justify-center mt-6 md:mt-12">
            <FadeInWrapper>
              <ul>
                <span className="font-bold text-xl text-brand">
                  <InternalLink href={'/search'}>
                    {t('home.toSearch')}
                  </InternalLink>
                </span>
                <li>
                  <p className="pl-6">{t('home.searchDescription')}</p>
                </li>
              </ul>
            </FadeInWrapper>
          </div>
          <div className="flex-col mt-6 md:mt-16">{t('home.budgetInfo')}</div>
          <div className="flex justify-center mt-6 md:mt-12 mb-16 md:mb-24">
            <FadeInWrapper>
              <ul>
                <span className="font-bold text-xl text-brand">
                  <InternalLink href={'/faq'}>{t('home.toInfo')}</InternalLink>
                </span>
                <li>
                  <p className="pl-6">{t('home.infoDescription')}</p>
                </li>
              </ul>
            </FadeInWrapper>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
