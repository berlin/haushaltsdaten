import { FadeInWrapper } from '@components/FadeInWrapper'
import { GetStaticProps } from 'next'
import { FC } from 'react'
import TypeAnimation from 'react-type-animation'
import { InternalLink } from '@components/InternalLink'

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: 'Startseite',
    },
  }
}

export const HomePage: FC = () => {
  return (
    <div className="px-8">
      <div className="md:w-4/5 m-auto mt-12 lg:mt-20">
        <div className="flex flex-wrap justify-between">
          <div className="flex-col lg:w-1/2 lg:pr-12">
            <span className="flex justify-center mt-10 md:mt-20 ">
              {/* <Building className="fill-gray-400"/> */}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold lg:text-right mb-3">
              Berliner <br></br>Haushaltsdaten
            </h1>
            <h1 className="text-2xl md:text-4xl md:text-right">2022/23</h1>
          </div>
          <div className="flex-col italic lg:w-1/2 mt-6 md:mt-12 lg:mt-24 lg:pr-28">
            Pro Jahr stehen der Berliner Politik und Verwaltung über 35
            Milliarden Euro zur Umsetzung ihrer Ziele zur Verfügung. Da kann es
            schonmal schwer werden, den Überblick zu behalten, wofür der Senat
            und die Bezirke wieviel ihrer Ressourcen aufwenden. Um der
            Öffentlichkeit die Haushaltsdaten verständlich und transparent zu
            präsentieren, bietet diese Webseite einen Überblick über die
            Einnahmen und Ausgaben des Landes für den aktuellen Doppelhaushalt.
          </div>
        </div>

        <div className="lg:w-3/6 m-auto mt-12 md:mt-20">
          <div className="text-2xl md:text-4xl flex-col">
            <h1 className="flex lg:mt-28">Wie viel Geld gibt Berlin aus für</h1>
            <h1 className="font-bold flex text-brand">
              <TypeAnimation
                cursor={false}
                sequence={[
                  'die Polizei?',
                  2000,
                  'öffentliche Museen?',
                  2000,
                  'Wohnungsbau?',
                  2000,
                  'Straßenbeleuchtung?',
                  2000,
                  'Grundsicherung?',
                  2000,
                ]}
                wrapper={'p'}
                repeat={Infinity}
              />
              <span className="text-white"> .</span>
            </h1>
          </div>
          <div className="m-auto mt-6 md:mt-8">
            Gehälter für Polizist:innen, der Betrieb öffentlicher Gebäude, die
            Förderungen von kulturellen Einrichtungen, die Beleuchtung des
            Straßenraums: Das Leben und Zusammenleben in Berlin verursacht viele
            laufende Kosten. Dazu kommen langfristige Investitionen in
            Einrichtungen und Infrastruktur, wie öffentliche Schulen und die
            Verbesserung von Parks. Ausgaben die durch die Stadtverwaltung
            getragen werden müssen. Doch wofür werden wieviele Gelder
            ausgegeben?
            <br></br>
            <br></br>
            Die Ausgaben sind im sogenannten Berliner Haushalt festgelegt. Sie
            lassen sich in 9 bundesweit vereinheitlichte Hauptfunktionsbereiche
            untergliedern. Diese können als oberste Stufe einer Treemap
            dargestellt werden:
          </div>
        </div>

        <div className="md:flex justify-center m-auto mt-6 md:mt-12 ">
          <div className="flex-col mb-6 md:my-auto inline-block">
            <FadeInWrapper>
              <div className="md:pr-12">
                <ul>
                  <span className="font-bold text-xl text-brand">
                    <InternalLink href={'/visualisierung'}>
                      {'→ Zur Visualisierung'}
                    </InternalLink>
                  </span>
                  <li>
                    <p className="pl-6">
                      Alle Ausgaben und Einnahmen<br></br>in der Tree Map
                      erkunden
                    </p>
                  </li>
                </ul>
              </div>
            </FadeInWrapper>
          </div>
          <div className="flex-col inline-block my-auto justify-center md:pr-10">
            <iframe
              style={{ width: '100%' }}
              title="Beispiel-Visualisierung der Haushaltsdaten"
              width="400rem"
              height="400"
              src="https://haushaltsdaten-staging.odis-berlin.de/share"
            ></iframe>
          </div>
        </div>

        <div className="lg:w-3/6 m-auto mt-6 md:mt-12">
          Im Berliner Haushaltsplan sind die Ausgaben und Einnahmen außerdem
          spezifischen Bereichen zugeordnet: Der Hauptverwaltung und den zwölf
          Berliner Bezirken. Außerdem werden die Beträge für den einzelnen
          Haushaltsjahren getrennt angegeben. Mittels der Visualisierung die
          über den Link oben erreichbar ist, können die einzelnen Bereiche und
          Jahre erkundet werden.
          <br></br>
          <br></br>
          Die Hauptfunktionen lassen sich in weitere Funktionsbereiche
          untergliedern. Die unterste detailierteste Angabe zu spezifischen
          Ausgaben und Einnahmen sind die sogenannten Titelbezeichung. Sie
          können über die Visualisierung angezeigt werden und erscheinen dann
          unter der Tree Map. Titel und Funktionen können aber auch gezielt über
          die Suchfunktion gefunden werden.
          <div className="flex justify-center mt-6 md:mt-12">
            <FadeInWrapper>
              <ul>
                <span className="font-bold text-xl text-brand">
                  <InternalLink href={'/search'}>{'→ Zur Suche'}</InternalLink>
                </span>
                <li>
                  <p className="pl-6">
                    Nach Stichwörtern in den Einnahmen und Ausgaben suchen
                  </p>
                </li>
              </ul>
            </FadeInWrapper>
          </div>
          <div className="flex-col mt-6 md:mt-16">
            Wie genau funktioniert das eigentlich mit dem Haushalt? Das Land
            Berlin muss alle voraussichtlichen Einnahmen und Ausgaben eines
            Jahres in einem Plan ausweisen, dem „Öffentlichen Haushalt“.
            Jährlich stellt der Senat, genauer die Senatsverwaltung für
            Finanzen, einen Haushaltsplanentwurf mit den jeweiligen
            Einzelhaushalten der Verwaltungen auf. Was das genau bedeutet, kann
            auf der Info-Seite nachgelesen werden.
          </div>
          <div className="flex justify-center mt-6 md:mt-12 mb-16 md:mb-24">
            <FadeInWrapper>
              <ul>
                <span className="font-bold text-xl text-brand">
                  <InternalLink href={'/faq'}>
                    {'→ Zur Informationsseite'}
                  </InternalLink>
                </span>
                <li>
                  <p className="pl-6">
                    Mehr erfahren in den Fragen und Antworten zum Berliner
                    Haushalt
                  </p>
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
