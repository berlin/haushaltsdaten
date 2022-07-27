import { GetStaticProps } from 'next'
import React, { useState } from 'react'
import { FC } from 'react'
import { GroupedBarChart } from '@components/GroupedBarChart'
import { TOTAL_EXPENSES } from '@data/totalExpenses'

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async () => ({
  props: {
    title: 'Infos',
  },
})

const ReadMore: FC = ({ children }) => {
  const text = children as string
  const [isReadMore, setIsReadMore] = useState(true)
  const toggleReadMore = (): void => {
    setIsReadMore(!isReadMore)
  }
  return (
    <p>
      {isReadMore ? text.slice(0, 300) : text}
      <button
        onClick={toggleReadMore}
        className="font-medium text-brand cursor-pointer"
      >
        {isReadMore ? ' ...mehr anzeigen' : ' weniger anzeigen'}
      </button>
    </p>
  )
}

export const FaqPage: FC = () => (
  <div className="px-8">
    <div className="md:w-4/5 m-auto mt-12 md:mt-20">
      <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl lg:ml-28">
        Wissenwertes zum Berliner Haushalt
      </h1>
      <div className="lg:w-3/6 m-auto mt-6 md:mt-16">
        <div className="flex-col mt-6">
          Wie genau funktioniert das eigentlich mit dem Haushalt? Das Land
          Berlin muss alle voraussichtlichen Einnahmen und Ausgaben eines Jahres
          in einem Plan ausweisen, dem „Öffentlichen Haushalt“. Jährlich stellt
          der Senat, genauer die Senatsverwaltung für Finanzen, einen
          Haushaltsplanentwurf mit den jeweiligen Einzelhaushalten der
          Verwaltungen auf.
        </div>
        <h2 className="font-bold text-xl md:text-2xl mt-6 md:mt-12">
          Berliner Doppelhaushalt
        </h2>
        <div className="flex-col mt-6">
          Haushaltsrechtlich möglich ist es auch Haushalte direkt für zwei
          Jahre, jeweils nach Jahren getrennt, festzusetzen. In Berliner macht
          man von dieser Regelung gebrauch, solche &quot;Doppelhaushalte&quot;
          vorzulegen, da dadurch der Verwaltungsaufwand reduziert wird.
        </div>

        <p className="text-2xl text-center mt-6 md:mt-16">
          76,61 Milliarden Euro
        </p>
        <p className="text-gray-500 text-xs md:text-sm text-center">
          {' '}
          stehen Berlin im aktuellen Doppelhaushalt als Gesamtausgaben zur
          Verfügung
        </p>

        <div className="mt-6 md:mt-16">
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

        <p className="mt-6 md:mt-16 text-sm flex justify-center">
          Gesamtausgaben des Berliner Haushalts in Mrd. €
        </p>
        <div className="mt-2 flex justify-center">
          <GroupedBarChart data={TOTAL_EXPENSES} />
        </div>
        <div className="mt-6 md:mt-16">
          Die Haushaltslage des Landes hat sich in den vergangenen Jahren stetig
          verbessert, sodass Berlin seit dem Jahr 2012 zur Finanzierung seiner
          laufenden Ausgaben keine zusätzlichen Kredite mehr aufnehmen musste.
        </div>
      </div>

      <div className="lg:w-3/6 m-auto mt-6 md:mt-12 mb-16 md:mb-28 ">
        <h2 className="font-bold text-xl md:text-2xl mt-12 md:mt-20">
          Schwerpunktthemen im aktuellen Haushalt
        </h2>
        <div className="mt-6">
          Im aktuellen doppelhaushalt lassen sich einige Themen in einen
          besonderen Fokus setzten. So ist Berlin beispielweise bis heute eines
          der wenigen Bundesländer in Deutschland, das die Umsetzung von Gender
          Budgeting im Landeshaushalt explizit formuliert hat.
          <br></br>
          Weiterhin relevant ist die in Berlin steigende Investitionsquote. Die
          aus dem laufenden Haushalt finanzierten Investitionen sollen auch
          weiter anwachsen.
          <br></br>
          Die Berliner Schulbauoffensive (BSO) ist das größte
          Investitionsvorhaben der letzten und laufenden Legislaturperiode.
          Damit soll der Sanierungsstau an den Schulen weiter abgebaut und für
          die wachsende Stadt neue Schulen errichtet werden.
          <br></br>
          <br></br>
          Mehr zu diesen Themen ist auf der Webseite der Senatsverwaltung für
          Finanzen zu erfahren.
        </div>

        <div className="mt-6">
          <div className="flex-col">
            <p className="text-brand">
              <a href="https://www.berlin.de/sen/finanzen/haushalt/gender-budgeting/artikel.11915.php">
                → Gender-Budgeting
              </a>
            </p>
            {/* <p>Berlin ist eines der wenigen Bundesländer,
          das die Umsetzung von Gender Budgeting im Landeshaushalt explizit
          formuliert hat und inzwischen dabei ist, Gender Budgeting in die
          normale Haushaltspolitik zu integrieren.</p> */}
          </div>
          <div className="flex-col">
            <p className="text-brand">
              <a href="https://www.berlin.de/rbmskzl/aktuelles/pressemitteilungen/2022/pressemitteilung.1181316.php">
                → Entwicklung der Investitionsquote
              </a>
            </p>
            {/* <p>Die aus dem laufenden Haushalt finanzierten Investitionen sollen weiter anwachsen auf 2,930 Mrd. Euro im Jahr 2022 und 3,238 Mrd. Euro im Jahr 2023.</p> */}
          </div>
          <div className="flex-col">
            <p className="text-brand">
              <a href="https://www.berlin.de/sen/finanzen/haushalt/schulbauoffensive/artikel.613867.php">
                → Schulbauoffensive
              </a>
            </p>
            {/* <p>Die Berliner Schulbauoffensive (BSO) ist das größte Investitionsvorhaben der letzten und laufenden Legislaturperiode. Damit soll der Sanierungsstau an den Schulen weiter abgebaut und für die wachsende Stadt neue Schulen errichtet werden.</p> */}
          </div>
        </div>

        <h2 className="font-bold text-xl md:text-2xl mt-12 md:mt-20">
          Fragen und Antworten
        </h2>
        <h2 className=" text-xl mt-6 md:mt-12">
          Warum werden die Haushaltsdaten visualisiert?
        </h2>
        <div className="flex justify-center mt-6">
          <ReadMore>
            Der komplette Datensatz des Berliner Haushaltes ist zwar als Open
            Data veröffentlicht, jedoch aufgrund seiner Länge und Komplexität
            nicht für jede:r intuitiv verständlich. Da der Haushalt allerdings
            von besonderer Relevanz für das Leben in Berlin ist, sollte er
            möglichst transparent dargestellt und für alle Berliner:innen
            zugänglich sein. Diese Webseite wurde ins Leben gerufen, um ein
            möglichst niedrigschwelliges Angebot zu schaffen, sich mit den
            Haushaltsdaten auseinanderzusetzen.
            Die interaktiven Diagramme in ihrer Ausgangsform zeigen eine
            Übersicht der kompletten Ausgaben und Einnahmen der Berliner
            Verwaltung. Durch Eingaben der Nutzer:innen werden weitere
            Detailebenen angezeigt, wie Bezirk oder Funktionen. Die Diagramme
            wurden erstellt, um die komplexen Haushaltsdaten
            nutzer:innenfreundlich darzustellen.
          </ReadMore>
        </div>

        <h2 className=" text-xl mt-6 md:mt-12">Wo kommen die Daten her?</h2>
        <div className="flex justify-center mt-6 mb-6 md:mb-20">
          <p>
            Alle Visualisierungen basieren auf dem öffentlich zugänglichen
            Datensatz des Doppelhaushaltes 2022/2023, der von der
            Senatsverwaltung für Finanzen bereitgestellt wird und auf dem{' '}
            <a className="text-brand" href="https://daten.berlin.de">
              Berliner Open Data Portal
            </a>{' '}
            veröffentlicht ist. Die{' '}
            <a
              className="text-brand"
              href="https://www.berlin.de/sen/finanzen/"
            >
              Berliner Senatsverwaltung für Finanzen
            </a>{' '}
            veröffentlicht seit rund 10 Jahren den Haushalt als Open Data, die
            auf dem Berliner Datenportal eingesehen werden können.
          </p>
        </div>

        {/* 
        <h2 className="font-bold text-xl md:text-2xl mt-12 md:mt-20">
          Was ist ein Doppel- und Nachtragshaushalt?
        </h2>
        <div className="flex justify-center mt-6">
          <ReadMore>
            Anstelle einen neuen Haushalt jedes Jahr zu verabschieden, kann eine Stadt
            oder eine Gemeinde einen Zweijahreshaushalt oder Doppelhaushalt
            verabschieden. Häufig entlastet dies die Verwaltung und die Politik
            dadurch, dass nicht jedes Jahr eine große Haushaltsdebatte stattfindet.
            Über zwei Jahre können sich allerdings natürlich viele Dinge ändern, daher
            kann das Parlament mit einem Nachtragshaushalt nachsteuern, und so
            Umverteilungen oder Mehrausgaben beschließen. Dies war beispielsweise
            während der Corona-Pandemie nötig, um Mehrausgaben für Pflegepersonal und
            Unterstützung der Berliner Wirtschaft zu gewährleisten.
          </ReadMore>
        </div>
        <h2 className="font-bold text-2xl mb-6 mt-12">
          Wie setzt sich der Berliner Haushalt zusammen?
        </h2>
        <div className="flex justify-center mt-6">
          Der Haushalt setzt sich aus Einnahmen und Ausgaben zusammen. Alle
          Einnahmen und Ausgaben sind, wie in einem herkömmlichen Budget oder einer
          Rechnung, einem Einzelposten zugewiesen, der den Verwendungszweck
          bestimmt. Im Haushaltsplan sind alle Senatsverwaltungen, Bezirke, sowie
          zentrale Verfassungsorgane, wie beispielsweise das Abgeordnetenhaus.
        </div>
        <h2 className="font-bold text-2xl mb-6 mt-12">
          Wer entscheidet über die Ausgaben?
        </h2>
        <div className="flex justify-center mt-6">
          Das Land Berlin muss alle voraussichtlichen Einnahmen und Ausgaben eines
          Jahres in einem Plan ausweisen. Man spricht in diesem Zusammenhang vom
          „Öffentlichen Haushalt“. Jährlich stellt der Senat, das heißt die
          Senatsverwaltung für Finanzen, einen Haushaltsplanentwurf mit den
          jeweiligen Einzelhaushalten der Verwaltungen auf. Die Aufteilung auf
          weitere Aufgaben (zum Beispiel innere Sicherheit, Wirtschaftsförderung,
          Kultur) erfolgt im politischen Abstimmungsprozess des Abgeordnetenhauses.
          Als Teil dieses Abstimmungsprozesses wird der Gesetzesvorschlag in
          diversen Fachausschüssen debattiert und gegebenfalls angepasst, bevor im
          Plenum über den Haushalt entschieden wird.
        </div> */}
      </div>
    </div>
  </div>
)

export default FaqPage
