import { FadeInWrapper } from '@components/FadeInWrapper'
import { GroupedBarChart } from '@components/GroupedBarChart'
import { GetStaticProps } from 'next'
import { FC } from 'react'
import TypeAnimation from 'react-type-animation'
import { FUNCTION_GROUPS } from '@data/functionGroups'
import { TOTAL_EXPENSES } from '@data/totalExpenses'

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
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mt-20 flex justify-center">
        Berliner Haushaltsdaten
      </h1>
      <h1 className="text-2xl md:text-4xl text-center flex justify-center ">
        Doppelhaushalt 2022/23
      </h1>

      <div className="md:w-3/5 md:text-xl m-auto italic text-center mt-12 md:mt-20 text-brand">
        Gehälter für Polizist:innen, Lehrer:innen und Behördenmitarbeiter:innen,
        der Betrieb öffentlicher Gebäude, die Beleuchtung des Straßenraums...
        Das Leben und Zusammenleben in Berlin verursacht eine hohe Summe an
        Ausgaben, die durch die Stadtverwaltung getragen werden müssen. Dazu
        kommen langfristige Investitionen in Einrichtungen und Infrastruktur,
        wie öffentliche Schulen, die Instandhaltung von Straßen und die
        Verbesserung von Parks. Wofür wieviele Gelder ausgegeben werden, ist im
        Berliner Haushalt festgelegt.
      </div>

      <div className="md:w-3/5 m-auto mt-12 md:mt-20">
        <div className="flex justify-center">
          Pro Jahr stehen der Berliner Politik und Verwaltung über 35 Milliarden
          Euro zur Umsetzung ihrer Ziele zur Verfügung. Da kann es schonmal
          schwer werden, den Überblick zu behalten, wofür der Senat und die
          Bezirke wieviel ihrer Ressourcen aufwenden. Um der Öffentlichkeit die
          Haushaltsdaten verständlich und transparent zu präsentieren, bietet
          diese Webseite einen Überblick über die Einnahmen und Ausgaben des
          Landes für die aktuellen zwei Jahre. <br></br>
        </div>
        <h2 className="font-bold text-2xl md:text-3xl mt-12 md:mt-20">
          Einnahmen und Ausgaben
        </h2>
        <div className="flex-col mt-6">
          Das Land Berlin muss alle voraussichtlichen Einnahmen und Ausgaben
          eines Jahres in einem Plan ausweisen, dem „Öffentlichen Haushalt“.
          Jährlich stellt der Senat, genauer die Senatsverwaltung für Finanzen,
          einen Haushaltsplanentwurf mit den jeweiligen Einzelhaushalten der
          Verwaltungen auf. Haushaltsrechtlich möglich sind auch Haushalte für
          zwei Jahre, jeweils nach Jahren getrennt. Der Senat macht von der
          Möglichkeit Gebrauch, solche &quot;Doppelhaushalte&quot; vorzulegen,
          weil dies den Verwaltungsaufwand der Aufstellung reduziert.
        </div>
        <FadeInWrapper>
          <p className="text-2xl md:text-4xl text-center mt-6 md:mt-16">
            76,61 Milliarden Euro
          </p>
          <p className="text-gray-500 text-xs md:text-sm text-center">
            {' '}
            stehen Berlin im aktuellen Doppelhaushalt als Gesamtausgaben zur
            Verfügung
          </p>
        </FadeInWrapper>

        <div className="mt-6 md:mt-16">
          Die Haushaltslage des Landes hat sich in den vergangenen Jahren stetig
          verbessert, sodass Berlin seit dem Jahr 2012 zur Finanzierung seiner
          laufenden Ausgaben keine zusätzlichen Kredite mehr aufnehmen musste.
        </div>
        <p className="mt-6 md:mt-16 text-sm flex justify-center">
          Gesamtausgaben des Berliner Haushalts in Mrd. €
        </p>
        <div className="mt-2 flex justify-center">
          <GroupedBarChart data={TOTAL_EXPENSES} />
        </div>

        <div className="font-bold text-brand mt-12 md:mt-20 text-xl">
          <ul>
            <li>
              <a href="https://haushaltsdaten-staging.odis-berlin.de/faq">
                {' '}
                → Mehr erfahren: Fragen und Antworten zum Berliner Haushalt
              </a>
            </li>
          </ul>
        </div>

        <h2 className="font-bold text-2xl md:text-3xl mt-12 md:mt-20">
          Der Ausgabehaushalt
        </h2>
        <div className="flex justify-center mt-6">
          Im Ausgabehaushalt ist festgelegt, wie viel Geld in den einzelnen
          Politikbereichen ausgegeben werden darf. Gleichzeitig wird damit das
          Budget (Etat) für die Erfüllung der öffentlichen Aufgaben Berlins
          jährlich festgeschrieben. Die zu erwartenden Einnahmen aus Steuern und
          Gebühren werden also auf die Aufgaben des Landes verteilt. Mit den
          Einnahmen steht ein eng begrenzter Rahmen an Mitteln zur Verfügung,
          der zum großen Teil durch Verpflichtungen Berlins (beispielsweise im
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

        <div className="flex justify-center mt-12 md:mt-2016">
          Ein Blick auf Verteilung der Ausgaben nach Hauptfunktionsgruppen macht
          deutlich, dass Ausgaben für Bildungswesen, soziale Sicherung, und
          allgemeine Dienste gemeinsam über 70% des gesamten Ausgabenhaushaltes
          ausmachen. Diese Einteilung und resultierende Darstellung ist
          allerdings nur ein Weg von vielen, die Ausgaben des Berliner Senats
          und den Bezirken darzustellen. Mithilfe einer interaktiven Grafik,
          einer sogenannten Tree-Map, können Sie sich die Ausgaben und Einnahmen
          des Berliner Haushaltes nach individuellen Merkmalen, wie Bezirk,
          Funktion oder Ämtern anzeigen lassen.
        </div>

        <div className="flex flex-wrap justify-between mt-6 md:mt-20">
          <div className="text-2xl md:text-4xl flex-col">
            <h1 className="flex lg:mt-28">Wie viel Geld wird für</h1>
            <h1 className="font-bold flex text-brand">
              <TypeAnimation
                cursor={false}
                sequence={[
                  'die Polizei',
                  2000,
                  'öffentliche Museen',
                  2000,
                  'Wohnungsbau',
                  2000,
                  'Straßenbeleuchtung',
                  2000,
                  'Grundsicherung',
                  2000,
                ]}
                wrapper={'p'}
                repeat={Infinity}
              />
              <span className="text-white"> .</span>
            </h1>
            <h1 className="flex">ausgegeben?</h1>
          </div>
          <div className="flex-col mt-6 md:mt-16">
            <iframe
              title="Beispiel-Visualisierung der Haushaltsdaten"
              width="400rem"
              height="369"
              src="https://haushaltsdaten-staging.odis-berlin.de/share"
            ></iframe>
          </div>
        </div>

        <div className="font-bold text-brand mt-12 md:mt-20 text-xl">
          <ul>
            <li>
              <a href="https://haushaltsdaten-staging.odis-berlin.de">
                {' '}
                → Alle Daten in der Tree Map erkunden
              </a>
            </li>
          </ul>
        </div>

        <h2 className="font-bold text-2xl md:text-3xl mt-12 md:mt-20">
          Schwerpunktthema: Gender Budgeting
        </h2>
        <div className="mt-6">
          Berlin ist bis heute eines der wenigen Bundesländer in Deutschland,
          das die Umsetzung von Gender Budgeting im Landeshaushalt explizit
          formuliert hat und inzwischen dabei ist, Gender Budgeting in die
          normale Haushaltspolitik zu integrieren. Beispiele für die
          Implementierung von Gender Budget-Ansätzen gibt es in verschiedenen
          europäischen und außereuropäischen Ländern: Schweiz, Spanien,
          Österreich, Großbritannien, Australien, Südafrika, Brasilien etc. Die
          in der Berliner Verwaltung 2003/2004 eingeführte Gender
          Budget-Nutzenanalyse untersucht überwiegend die Ausgabenseite des
          Berliner Haushalts, um zu ermitteln, ob die
          Programme/Angebote/Leistungen vermehrt von Frauen oder Männern in
          Anspruch genommen werden.
          <br></br>
          Auf der Ebene der Hauptverwaltung, also den Senatsverwaltungen,
          geschieht dies vor allem bei Titeln der Hauptgruppe 6 (Zuweisungen und
          Zuschüsse ohne Investitionen), hierzu gehören Unterstützungen für
          natürliche Personen wie auch für Institutionen, z. B. Vereine,
          Kultureinrichtungen usw. In den Kapiteln der Hauptverwaltung mit
          Personal werden die Durchschnittsgehälter der Beschäftigten nach
          Geschlecht ausgewiesen und eventuelle Unterschiede begründet.
          <br></br>
          Auf der Ebene der Bezirksverwaltung werden mittlerweile 116
          Bezirksprodukte unter Gender-Aspekten untersucht, wie beispielsweise
          die Nutzung von Sportflächen, Musikschulunterricht,
          Volkshochschulkurse.
        </div>

        <div className="font-bold text-brand mt-12 md:mt-20 text-xl">
          <ul>
            <li className="mb-6 md:mb-20">
              <a href="https://haushaltsdaten-staging.odis-berlin.de/schwerpunkte">
                {' '}
                → Ausgewählte Schwerpunktthemen ansehen
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HomePage
