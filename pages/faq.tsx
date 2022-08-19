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
    <div className="mt-6">
      <p
        dangerouslySetInnerHTML={{
          __html: isReadMore ? `${text.slice(0, 300)}...` : text,
        }}
      ></p>
      <button
        onClick={toggleReadMore}
        className="font-medium text-brand cursor-pointer"
      >
        {isReadMore ? ' ...mehr anzeigen' : ' weniger anzeigen'}
      </button>
    </div>
  )
}

export const FaqPage: FC = () => {
  return (
    <div className="px-8">
      <div className="md:w-4/5 m-auto mt-12 md:mt-20">
        <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl lg:ml-28">
          Wissenwertes zum Berliner Haushalt
        </h1>
        <div className="lg:w-3/6 m-auto mt-6 md:mt-16">
          <div className="flex-col mt-6">
            Wie genau funktioniert das eigentlich mit dem Haushalt? Das Land
            Berlin muss alle voraussichtlichen Einnahmen und Ausgaben eines
            Jahres in einem Plan ausweisen, dem „Öffentlichen Haushalt“. Für
            jedes Jahr stellt der Senat einen Haushaltsplanentwurf mit den
            jeweiligen Einzelhaushalten der Verwaltungen auf.
            <br></br>
            {/* <h2 className="font-bold text-xl md:text-2xl mt-6 md:mt-12">
            Berliner Doppelhaushalt
          </h2> */}
            Haushaltsrechtlich möglich ist es auch, Haushalte für zwei Jahre
            aufzustellen, jeweils nach Jahren getrennt. In Berlin macht man von
            dieser Möglichkeit seit 2002 Gebrauch.
          </div>

          <p className="text-2xl text-center mt-6 md:mt-16">
            76,61 Milliarden Euro
          </p>
          <p className="text-gray-500 text-xs md:text-sm text-center">
            stehen Berlin im aktuellen Doppelhaushalt als Gesamtausgaben zur
            Verfügung
          </p>

          <div className="mt-6 md:mt-16">
            Im Haushalt ist festgelegt, wie viel Geld in den einzelnen
            Politikbereichen ausgegeben werden darf. Gleichzeitig wird damit das
            Budget (Etat) für die Erfüllung der öffentlichen Aufgaben Berlins
            jährlich festgeschrieben. Die zu erwartenden Einnahmen aus Steuern,
            Gebühren und weiteren Einnahmen dienen also zur Finanzierung aller
            Aufgaben des Landes. Mit den Einnahmen steht ein klar begrenzter
            Rahmen an Mitteln zur Verfügung, der zum großen Teil durch
            Verpflichtungen Berlins (beispielsweise im Sozialbereich und der
            Bildung) bereits rechtlich gebunden ist. Die Finanzierung weiterer
            Aufgaben der Verwaltung (z. B. innere Sicherheit,
            Wirtschaftsförderung, Kultur) erfolgt nach Vorlage durch den Senat
            im politischen Abstimmungsprozess mit dem Abgeordnetenhaus.
          </div>

          <p className="mt-6 md:mt-16 text-sm flex justify-center">
            Gesamtausgaben des Berliner Haushalts in Mrd. €
          </p>
          <div className="mt-2 flex justify-center">
            <GroupedBarChart data={TOTAL_EXPENSES} />
          </div>
          <div className="mt-6 md:mt-16">
            Die Haushaltslage des Landes hat sich zwischen 2012 und 2020 stetig
            verbessert, sodass Berlin seit dem Jahr 2012 zur Finanzierung seiner
            laufenden Ausgaben keine zusätzlichen Kredite mehr aufnehmen musste.
          </div>
        </div>

        <div className="lg:w-3/6 m-auto mt-6 md:mt-12 mb-16 md:mb-28 ">
          <h2 className="font-bold text-xl md:text-2xl">
            Schwerpunktthemen im aktuellen Haushalt
          </h2>
          <div className="mt-6">
            Mit dem aktuellen Doppelhaushalt 2022/23 erreicht das Land Berlin
            einen Höchststand bei Einnahmen und Ausgaben. Besondere
            Aufmerksamkeit liegt auf den Investitionen, die weiter anwachsen.
            Ziel ist eine Investitionsquote von 8 Prozent. Die Berliner
            Schulbauoffensive (BSO) ist das größte Investitionsvorhaben der
            letzten und laufenden Legislaturperiode. Damit wird der
            Sanierungsstau an den Schulen weiter abgebaut, und es werden neue
            Schulen für die wachsende Stadt errichtet.
            <br></br>
            Außerdem trifft das Land Vorsorge für diverse Risiken, darunter die
            steigenden Energiepreise und höheren Baukosten.
            <br></br>
            Weiterhin legt es bei Aufstellung und Umsetzung ein Augenmerk auf
            die Geschlechtergerechtigkeit und integriert Gender Budgeting in
            seine Haushaltspolitik. Das heißt, dass insbesondere die Ausgaben
            danach ausgewertet werden, inwieweit sie den Geschlechtern zu
            gleichen Teilen zugutekommen.
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

          <h2 className="font-bold text-xl md:text-2xl mt-6 md:mt-12 md:mt-20">
            Fragen und Antworten
          </h2>
          <h2 className=" text-xl mt-6 md:mt-12" id="Warum-Haushaltsdaten">
            Warum werden die Haushaltsdaten visualisiert?
          </h2>
          <ReadMore>
            {`Der komplette Datensatz des Berliner Haushaltes ist zwar als Open
            Data veröffentlicht, jedoch aufgrund seiner Länge und Komplexität
            nicht für jede und jeden intuitiv verständlich. Da der Haushalt
            allerdings von besonderer Relevanz für das Leben in Berlin ist,
            sollte er möglichst transparent dargestellt und für alle
            Berlinerinnen und Berliner zugänglich sein. Diese Webseite wurde ins
            Leben gerufen, um ein möglichst niedrigschwelliges Angebot zu
            schaffen, sich mit den Haushaltsdaten auseinanderzusetzen.
            <br><br>Vorlage für die Darstellung der Daten war das Projekt 
            <a class="text-brand" href="https://offenerhaushalt.de">
              Offener Haushalt
            </a> 
            der 
            <a class="text-brand" href="https://okfn.de">
              Open Knowledge Foundation</a>. Dabei handelte es sich um eine Webseite, die Haushaltsdaten für
            Städte und Kommunen für Deutschland zentral und standardisiert
            einsehbar gemacht hat. Das Land Berlin hat in den letzten Jahren auf
            „Offener Haushalt“ zurückgegriffen, um seine Haushaltsdaten zu
            visualisieren und auch via Einbettung auf der eigenen
            Berlin.de-Webseite zu präsentieren. Seit 2021 kann „Offener
            Haushalt“ jedoch nicht mehr aktiv gepflegt werden. Grund dafür ist,
            dass in der aktuellen Förderlandschaft ein dauerhafter Betrieb
            gemeinwohlorientierter Plattformen schwierig ist und Strategien für
            die Übernahme seitens der Verwaltung bedauerlicherweise fehlen.`}
          </ReadMore>

          <h2 className=" text-xl mt-6 md:mt-12">
            Was genau zeigt die Visualisierung?
          </h2>
          <ReadMore>
            {`Die interaktiven Kacheldiagramme (Tree Maps) in ihrer Ausgangsform
              zeigen eine Übersicht der kompletten Ausgaben und Einnahmen des
              aktuellen Doppelhaushalts der Berliner Verwaltung. Die Flächen der
              Rechtecke sind dabei proportional zur Größe der darzustellenden
              Beträge. Über den Schieberegeler lässt sich einstellen, ob
              Einnahmen oder Ausgaben angezeigt werden sollen - das Diagramm
              passt sich entsprechend an. Die gezeigten Beträge gelten jeweils
              für ein einzelnes Haushaltsjahr. Über das Dropdown-Menü kann daher
              zwischen den Jahren gewechselt werden. Ebenfalls im Menü
              auswählbar ist, ob Daten für Gesamt-Berlin, für einen einzelnen
              Bezirk oder nur die Hauptverwaltungen angezeigt werden sollen.
              Über das dritte Dropdown-Menü wird ausgewählt, ob die Beträge nach
              Einzelplänen oder nach Funktionen sortiert dargestellt werden
              sollen. Durch Klick auf eine der Flächen in der Tree Map lässt
              sich die nächst tiefere Detailstufe anzeigen, um einzelne Bereiche
              näher zu erkunden. Die unterste detaillierte Angabe zu
              spezifischen Ausgaben und Einnahmen sind die sogenannten Titel.
              Die zu den aktuell im Diagramm ausgewählten Bereichen gehörenden
              Titel, werden unter der Tree Map als Liste angezeigt. Wird im
              Diagramm durch Klick eine tiefere Detailebene ausgewählt, wird die
              Liste also dementsprechend gefiltert. Aus Performancegründen
              werden immer nur die 100 Titel mit den größten Beträgen angezeigt.
              Titel, Einzelpläne und Funktionen können auch gezielt über die
              Suchfunktion gefunden werden.`}
          </ReadMore>

          <h2
            className=" text-xl mt-6 md:mt-12"
            id="Einzelplaene-und-Funktionen"
          >
            Was sind Funktionen und was sind Einzelpläne?
          </h2>
          <ReadMore>
            {`Es gibt zwei verschiedene Optionen die Zuordnung der Einnahme- und
            Ausgabetitel im Diagramm zu sortieren: nach Einzelplänen oder nach
            Hauptfunktionen gegliedert. Die Einzelpläne bieten eine Übersicht
            über die Einnahmen und Ausgaben der Haupt- und Bezirksverwaltungen
            unterteilt nach Arten und Bereich, z.B. Senatsverwaltung für Inneres
            oder Schul- und Sportamt des Bezirks Mitte. Die Hauptfunktionen
            stellen dagegen die Aufgaben dar, die durch die jeweiligen Einnahmen
            oder Ausgaben erfüllt werden. Sowohl Einzelpläne als auch Funktionen
            lassen sich durch Klick in die Tree Map in detailliertere
            Unterbereiche weiter untergliedern. Die unterste detaillierte Angabe
            zu spezifischen Ausgaben und Einnahmen sind die sogenannten Titel.
            Die zu den jeweils im Diagramm ausgewählten Einzelplänen und
            Funktionen, bzw. deren Unterbereichen, gehörenden Titel werden unter
            der Tree Map als Liste angezeigt.`}
          </ReadMore>

          <h2 className=" text-xl mt-6 md:mt-12">Wo kommen die Daten her?</h2>
          <ReadMore>
            {`Alle dieser Anwendung zugrundeliegenden Daten stammen aus dem Datensatz
             zum "Doppelhaushalt 2022/2023" und sind als Open Data unter offener Lizenz verfügbar.
             Sie können frei weiterverwendet und weiterverarbeitet werden.
            Der Datensatz wird
            von der 
            <a
              class="text-brand"
              href="https://www.berlin.de/sen/finanzen/"
            >
            Senatsverwaltung für Finanzen
            </a>
            bereitgestellt und auf dem Berliner 
            <a class="text-brand" href="https://daten.berlin.de">
              Datenportal
            </a> 
            veröffentlicht. Dort finden sich auch historische Haushaltsdaten der
            letzten 10 Jahre. Mehr zum Thema offene Daten der Berliner
            Verwaltung ist auf der Webseite der 
            <a class="text-brand" href="https://odis-berlin.de">
              Open Data Informationsstelle
            </a> 
            zu finden.`}
          </ReadMore>

          <h2 className=" text-xl mt-6 md:mt-12" id="Open-Source">
            Ist die Anwendung Open Source? Wie kann sie weiterentwickelt werden?
          </h2>
          <ReadMore>
            {`Nicht nur die Haushaltsdaten sind offen als Open Data verfügbar -
            auch der Quellcode dieser Anwendung steht frei unter MIT-Lizenz zur
            Verfügung. Die Digital-Community in Berlin und darüber hinaus ist
            eingeladen, kollaborativ an der Entwicklung und Verbesserung der
            Seite mitzuwirken oder Komponenten davon für eigene Arbeiten und
            Projekte zu verwenden. Über 
            <a
              class="text-brand"
              href="https://github.com/berlin/haushaltsdaten"
            >
              GitHub
            </a> 
            können Issues angelegt und Code-Verbesserungen oder neue Features
            via Pull Request eingereicht werden.`}
          </ReadMore>

          <h2 className=" text-xl mt-6 md:mt-12">
            Ist die Anwendung auch auf andere Länder und Kommunen übertragbar?
          </h2>
          <ReadMore>
            {`Die Anwendung bzw. der Quellcode kann von anderen Kommunen und
            Ländern verwendet werden, um ihre eigenen Haushaltsdaten zu
            präsentieren und transparent bereitzustellen. Voraussetzung ist,
            dass die jeweiligen Haushaltsdaten in einem maschinenlesbaren Format
            und geeigneter Struktur vorliegen. Das ist leider nicht in allen
            Ländern und Kommunen selbstverständlich. Die Haushaltsdaten müssen
            auf Bundes-, Landes- und Kommunalebene zwar per Gesetz
            veröffentlicht werden, oft passiert dies jedoch in Form von
            PDF-Berichten. Diese PDFs können zwar von Menschen gut gelesen
            werden, für eine weitere Verarbeitung, wie für die Erstellung von
            Diagrammen, sind sie aber nicht geeignet. Für die Berliner Daten und
            diese Anwendung nutzen wir ein 
            <a
              class="text-brand"
              href="https://offenerhaushalt.de/page/datenstandard.html"
            >
              Datenschema
            </a>, das von der Open Knowledge Foundation im Projekt „Offener
            Haushalt“ entwickelt wurde.`}
          </ReadMore>
        </div>
      </div>
    </div>
  )
}

export default FaqPage
