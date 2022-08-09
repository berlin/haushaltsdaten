import { FC } from 'react'

const TSBLogo = '/images/tsb-logo.svg'
const CityLABLogo = '/images/citylab-logo.svg'
const BerlinLogo = '/images/berlin-skzl-logo.svg'
const OdisLogo = '/images/logo-odis-berlin.svg'
const SenWEBLogo = '/images/logo-berlin-senweb-de.svg'
const IBBLogo = '/images/ibb-logo.svg'
const SenFINLogo = 'images/logo-berlin-senfin.svg'
// const SenFINLogo = '/images/logo-odis-berlin-black.svg'

export const Footer: FC = () => {
  return (
    <footer id="main-footer">
      <section className="bg-gray-50 border-t border-gray-200 px-4 xl:px-8">
        <div className="container max-w-8xl mx-auto py-8">
          <div className="w-full flex flex-wrap gap-8 md:gap-12 lg:flex-nowrap">
            <div className="block">
              <span className="w-full block text-xs text-gray-700">&nbsp;</span>
              <a
                href="https://odis-berlin.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block hover:opacity-50 transition-opacity focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-[1px] outline-none"
                aria-label="ODIS Berlin"
              >
                <img
                  src={OdisLogo}
                  alt="Logo von der ODIS Berlin"
                  className="w-44"
                />
              </a>
            </div>
            <div className="block">
              <span className="w-full block text-xs text-gray-700">&nbsp;</span>
              <a
                href="https://www.citylab-berlin.org"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block hover:opacity-50 transition-opacity focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-[1px] outline-none"
                aria-label="CityLAB Berlin"
              >
                <img
                  src={CityLABLogo}
                  alt="Logo des CityLAB Berlin"
                  className="w-44"
                />
              </a>
            </div>
            <div className="block">
              <span className="w-full block text-xs text-gray-700">
                Ein Projekt der:
              </span>
              <a
                href="https://technologiestiftung-berlin.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block hover:opacity-50 transition-opacity focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-[1px] outline-none"
                aria-label="Technologiestiftung Berlin"
              >
                <img
                  src={TSBLogo}
                  alt="Logo der Technologiestiftung Berlin"
                  className="w-40"
                />
              </a>
            </div>
            <div className="block">
              <span className="w-full block text-xs text-gray-700">
                Zusammen mit:
              </span>
              <a
                href="https://www.berlin.de/sen/finanzen/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block hover:opacity-50 transition-opacity focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-[1px] outline-none"
                aria-label="Senatsverwaltung für Finanzen"
              >
                <img
                  src={SenFINLogo}
                  alt="Logo der Senatsverwaltung für Finanzen"
                  className="w-32"
                />
              </a>
            </div>
            <div className="block">
              <span className="w-full block text-xs text-gray-700">
                Gefördert durch:
              </span>
              <a
                href="https://www.berlin.de/rbmskzl/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block hover:opacity-50 transition-opacity focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-[1px] outline-none"
                aria-label="Der Regierende Bürgermeister von Berlin - Senatskanzlei"
              >
                <img
                  src={BerlinLogo}
                  alt="Logo: Der Regierende Bürgermeister von Berlin - Senatskanzlei"
                  className="w-32"
                />
              </a>
            </div>
            <div className="block">
              <a
                href="https://www.berlin.de/sen/wirtschaft/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block hover:opacity-50 transition-opacity focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-[1px] outline-none"
                aria-label="Senatsverwaltung für Wirtschaft, Energie und Betriebe"
              >
                <img
                  src={SenWEBLogo}
                  alt="Logo: Senatsverwaltung für Wirtschaft, Energie und Betriebe"
                  className="w-32"
                />
              </a>
            </div>
            <div className="block">
              <a
                href="https://www.ibb.de/de/startseite/startseite.html"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block hover:opacity-50 transition-opacity focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-[1px] outline-none"
                aria-label="Investitionsbank Berlin"
              >
                <img
                  src={IBBLogo}
                  alt="Logo: Investitionsbank Berlin"
                  className="w-32"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 border-t border-gray-200 px-4 xl:px-8">
        <div className="container max-w-8xl mx-auto py-6 block sm:flex justify-between">
          <div className="flex items-center">
            <p className="text-sm text-gray-700">
              &copy; {new Date().getFullYear()} Technologiestiftung Berlin
            </p>
          </div>
          <ul className="flex items-center mt-2 sm:mt-0 flex-wrap gap-x-4 gap-y-2">
            <li>
              <a
                href="https://github.com/technologiestiftung/stadtpuls/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-brand transition-colors text-gray-700 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-[1px] outline-none"
              >
                Feedback
              </a>
            </li>
            <li>
              <a
                href="/docs/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-brand transition-colors text-gray-700 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-[1px] outline-none"
              >
                Nutzungsbedingungen
              </a>
            </li>
            <li>
              <a
                href="https://www.technologiestiftung-berlin.de/de/impressum/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-brand transition-colors text-gray-700 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-[1px] outline-none"
              >
                Impressum
              </a>
            </li>
            <li>
              <a
                href="https://www.technologiestiftung-berlin.de/de/datenschutz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-brand transition-colors text-gray-700 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-[1px] outline-none"
              >
                Datenschutzerklärung
              </a>
            </li>
          </ul>
        </div>
      </section>
    </footer>
  )
}
