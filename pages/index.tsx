import { FadeInWrapper } from '@components/FadeInWrapper'
import { GroupedBarChart } from '@components/GroupedBarChart'
import { ParsedPageQueryType } from '@lib/utils/queryUtil'
import { GetServerSideProps } from 'next'
import { FC } from 'react'
import TypeAnimation from 'react-type-animation'
import { FUNCTION_GROUPS } from '@data/functionGroups'
import { TOTAL_EXPENSES } from '@data/totalExpenses'

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      title: 'Startseite',
      query,
    },
  }
}

export const Home: FC<{
  query: Partial<ParsedPageQueryType>
}> = () => {
  return (
    <div className="px-8">
      <h1 className="font-bold text-5xl mt-20 flex justify-center">
        Berliner Haushaltsdaten
      </h1>
      <h1 className="font-bold text-3xl flex justify-center text-brand">
        für den Doppelhaushalt 2022/23
      </h1>

      <div className="flex justify-center mt-20 mb-16">
        Der Betrieb unserer Stadt erfordert eine hohe Summe an Ausgaben. Dazu
        gehören laufende Kosten wie die Gehälter für Polizist*innen,
        Lehrer*innen und Behördenmitarbeiter*innen, aber auch der Betrieb
        öffentlicher Gebäude und die Beleuchtung des Straßenraums. Zusätzlich
        müssen langfristige Investitionen in Einrichtungen und Infrastruktur
        oder Kapitalprojekte abgedeckt werden. Beispiele hierfür sind der Bau
        von öffentlichen Schulen, die Instandhaltung von Straßen und die
        Verbesserung von Parks. Wofür welche Gelder ausgegeben werden, ist im
        Berliner Haushalt festgelegt.
      </div>

      <h2 className="font-bold text-3xl mt-26">Die Haushaltspläne</h2>
      <div className="container flex justify-center mt-6">
        <div className="flex-col mr-12">
          Das Land Berlin muss alle voraussichtlichen Einnahmen und Ausgaben
          eines Jahres in einem Plan ausweisen, dem „Öffentlichen Haushalt“.
          Jährlich stellt der Senat, genauer die Senatsverwaltung für Finanzen,
          einen Haushaltsplanentwurf mit den jeweiligen Einzelhaushalten der
          Verwaltungen auf. Haushaltsrechtlich möglich sind auch Haushalte für
          zwei Jahre, jeweils nach Jahren getrennt. Der Senat macht von der
          Möglichkeit Gebrauch, solche &quot;Doppelhaushalte&quot; vorzulegen,
          weil dies den Verwaltungsaufwand der Aufstellung reduziert. <br></br>
          Der Einnahmenhaushalt enthält die erwarteten Einnahmen aus Steuern,
          staatlichen und bundesstaatlichen Beihilfen und anderen
          Einnahmequellen. Er bestimmt den Höchstbetrag für den
          Ausgabenhaushalt, da die Stadt einen ausgeglichenen Haushalt vorweisen
          muss.<br></br>
          Die Haushaltslage des Landes hat sich in den vergangenen Jahren stetig
          verbessert, sodass Berlin seit dem Jahr 2012 zur Finanzierung seiner
          laufenden Ausgaben keine zusätzlichen Kredite mehr aufnehmen musste.
        </div>
        <div className="flex-col">
          <p className="text-sm">
            Gesamtausgaben des Berliner Haushalts in Mrd. €
          </p>
          <GroupedBarChart data={TOTAL_EXPENSES} />
        </div>
      </div>

      <FadeInWrapper>
        <p className="text-4xl flex justify-center mt-16">
          76,61 Milliarden Euro
        </p>
        <p className="text-gray-500 text-sm flex justify-center mb-12">
          {' '}
          stehen Berlin im aktuellen Doppelhaushalt als Gesamtausgaben zur
          Verfügung
        </p>
      </FadeInWrapper>

      <h2 className="font-bold text-3xl mt-26">Der Ausgabehaushalt</h2>
      <div className="flex justify-center mt-6">
        Im Ausgabehaushalt ist festgelegt, wie viel Geld in den einzelnen
        Politikbereichen ausgegeben werden darf. Gleichzeitig wird damit das
        Budget (Etat) für die Erfüllung der öffentlichen Aufgaben Berlins
        jährlich festgeschrieben. Die zu erwartenden Einnahmen aus Steuern und
        Gebühren werden also auf die Aufgaben des Landes verteilt. Mit den
        Einnahmen steht ein eng begrenzter Rahmen an Mitteln zur Verfügung, der
        zum großen Teil durch Verpflichtungen Berlins (beispielsweise im
        Sozialbereich und der Bildung) bereits fest gebunden ist. Die weitere
        Aufteilung auf die weiteren Aufgaben der Verwaltung (z.B. innere
        Sicherheit, Wirtschaftsförderung, Kultur) erfolgt im politischen
        Abstimmungsprozess des Abgeordnetenhauses.
      </div>
      <FadeInWrapper>
        <p className="mt-6 text-sm flex justify-center">
          Verteilung der Ausgaben in den 10 Hauptfunktionsgruppen im
          Doppelhaushalt 2022/23
        </p>
      </FadeInWrapper>
      <div className="mt-2 flex justify-center">
        <div>
          {FUNCTION_GROUPS.map((functionGroup) => (
            <FadeInWrapper key={functionGroup.name}>
              <div
                className="box flex justify-between"
                style={{
                  backgroundColor: functionGroup.color,
                  height: functionGroup.height + 'rem',
                }}
              >
                <span>{functionGroup.name}</span>
                <span>{functionGroup.value}</span>
              </div>
            </FadeInWrapper>
          ))}
        </div>
      </div>

      {/* Piechart oder Sankey Bezirke Hauptverwaltungen 
Treechart- Image  mit Link
FAQ Seite*/}

      <div className="flex justify-center mt-20">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
        sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
        justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
        takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
        amet.
      </div>

      <div className="container flex justify-between mt-20">
        <div className="flex-col mt-12">
          <h1 className="text-4xl mt-20 flex">Wie viel Geld wird</h1>
          <h1 className="font-bold text-4xl flex text-brand">
            <TypeAnimation
              cursor={false}
              sequence={[
                'für Schulneubau',
                2000,
                'im Bezirk Mitte',
                2000,
                'für Verwaltungspersonal',
                2000,
                'in den Grünflächenämtern',
                2000,
                'in Bezirk Neukölln',
                2000,
              ]}
              wrapper={'p'}
              repeat={Infinity}
            />
            <span className="text-white"> .</span>
          </h1>
          <h1 className="text-4xl flex">ausgegeben?</h1>
        </div>
        <div className="flex-col">
          <iframe
            title="Beispiel-Visualisierung der Haushaltsdaten"
            width="760"
            height="369"
            src="https://haushaltsdaten-staging.odis-berlin.de/share"
          ></iframe>
        </div>
      </div>

      <div className="font-bold text-brand mt-20 mb-16 text-xl">
        <ul>
          <li className="mb-3">
            <a href="https://haushaltsdaten-staging.odis-berlin.de">
              {' '}
              → Alle Daten in der Tree Map erkunden
            </a>
          </li>
          <li className="mb-3">
            <a href="https://haushaltsdaten-staging.odis-berlin.de/schwerpunkte">
              {' '}
              → Ausgewählte Schwerpunktthemen ansehen
            </a>
          </li>
          <li className="mb-3">
            <a href="https://haushaltsdaten-staging.odis-berlin.de/faq">
              {' '}
              → Fragen und Antworten zum Berliner Haushalt
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Home
