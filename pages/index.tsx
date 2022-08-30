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
            <h1 className="text-4xl md:text-6xl font-bold xl:text-right mb-3">
              Berliner <br></br>Haushaltsdaten
            </h1>
            <h1 className="text-2xl md:text-4xl md:text-right">2022/23</h1>
          </div>
          <div className="flex-col italic xl:w-1/2 mt-6 md:mt-12 xl:mt-24 xl:pr-28">
            Pro Jahr stehen der Berliner Verwaltung über 35 Milliarden Euro zur
            Umsetzung der gesetzlichen Vorgaben und ihrer Ziele zur Verfügung.
            Aber wofür wenden Senat und Bezirke welchen Anteil ihrer Ressourcen
            auf? Diese Webseite bietet einen Überblick über die geplanten
            Ausgaben und Einnahmen des Landes für den aktuellen Doppelhaushalt
            2022/23. Sie wurde gemeinsam initiiert und erarbeitet mit der Open
            Data Informationsstelle und dem CityLAB Berlin – und steht als{' '}
            <span className="text-brand">
              <InternalLink href={'/faq'} query={{ hashId: 'Open-Source' }}>
                Open Source Projekt
              </InternalLink>{' '}
            </span>
            zur Weiterentwicklung zur Verfügung!
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
            Das Leben und Zusammenleben in Berlin verursacht viele laufende
            Kosten: Gehälter für Lehrerinnen und Lehrer, der Betrieb
            öffentlicher Gebäude, die Förderung von kulturellen Einrichtungen,
            die Beleuchtung des Straßenraums. Hinzu kommen langfristige
            Investitionen in technische und soziale Infrastruktur wie die
            Schulen, den öffentlichen Nahverkehr oder Parks und
            Erholungsflächen. All diese Ausgaben trägt die Berliner Verwaltung.
            Doch wofür wird wieviel Geld ausgegeben?
            <br></br>
            <br></br>
            Die Ausgaben legt das Berliner Abgeordnetenhaus im Haushaltsgesetz
            fest. Sie lassen sich in neun bundesweit vereinheitlichte
            Hauptfunktionsbereiche untergliedern. Diese können als oberste Stufe
            einer sich nach unten immer weiter verzweigenden Struktur, einer so
            genannten Tree Map, dargestellt werden:
          </div>
        </div>

        <div className="md:flex justify-center m-auto mt-6 md:mt-12 ">
          <div className="flex-col mb-6 md:my-auto inline-block">
            <FadeInWrapper>
              <div className="pr-12">
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
          spezifischen Bereichen von Hauptverwaltungen und Bezirken zugeordnet.
          Dabei werden die Beträge für die einzelnen Haushaltsjahre getrennt
          angegeben. Mittels der Visualisierung, die über den Link oben
          erreichbar ist, können die einzelnen Darstellungsformen und Jahre im
          Detail erkundet werden.
          <br></br>
          <br></br>
          Die detailliertesten Angabe zu spezifischen Beträgen im Haushaltsplan
          sind die sogenannten Einnahme- und Ausgabetitel. Sie können über die
          Visualisierung gefiltert werden und erscheinen dann unter der Tree
          Map. Titel und Funktionen können aber auch gezielt über die
          Suchfunktion gefunden werden.
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
            Wie kommt der Haushalt zustande, und wie wird er umgesetzt? Das Land
            Berlin muss alle voraussichtlichen Einnahmen und Ausgaben eines
            Jahres in einem Haushaltsplan ausweisen. Für jedes Jahr stellt der
            Senat einen Haushaltsplanentwurf mit den jeweiligen Einzelhaushalten
            der Verwaltungen auf und legt ihn dem Abgeordnetenhaus vor. Die
            Abgeordneten können daraufhin Änderungen vornehmen. Am Ende der
            Beratungen beschließen sie das Haushaltsgesetz. Nähere Informationen
            finden sich auf der Info-Seite.
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
