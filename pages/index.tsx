import { FadeInWrapper } from '@components/FadeInWrapper'
import { GroupedBarChart } from '@components/GroupedBarChart'
import { GetStaticProps } from 'next'
import { FC } from 'react'
import TypeAnimation from 'react-type-animation'
import { FUNCTION_GROUPS } from '@data/functionGroups'
import { TOTAL_EXPENSES } from '@data/totalExpenses'
import { InternalLink } from '@components/InternalLink'
import { Building } from '@components/Icons'

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
            <h1 className="text-2xl md:text-4xl md:text-right">
              2022/23
            </h1>
          </div>
          <div className="flex-col italic lg:w-1/2 mt-6 md:mt-12 lg:mt-24 lg:pr-28">
            Pro Jahr stehen der Berliner Politik und Verwaltung über 35 Milliarden
            Euro zur Umsetzung ihrer Ziele zur Verfügung. Da kann es schonmal
            schwer werden, den Überblick zu behalten, wofür der Senat und die
            Bezirke wieviel ihrer Ressourcen aufwenden. Um der Öffentlichkeit die
            Haushaltsdaten verständlich und transparent zu präsentieren, bietet
            diese Webseite einen Überblick über die Einnahmen und Ausgaben des
            Landes für den aktuellen Doppelhaushalt.
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
              /><span className="text-white"> .</span></h1>        
          </div>
          <div className="m-auto mt-6 md:mt-8">
            Gehälter für Polizist:innen, der Betrieb öffentlicher Gebäude, die Förderungen von kulturellen Einrichtungen, die Beleuchtung des Straßenraums: Das Leben und Zusammenleben in Berlin verursacht viele laufende Kosten. Dazu kommen langfristige Investitionen in Einrichtungen und Infrastruktur, wie öffentliche Schulen und die Verbesserung von Parks. Ausgaben die durch die Stadtverwaltung getragen werden müssen. Doch wofür werden wieviele Gelder ausgegeben?
            <br></br><br></br>
            Die Ausgaben sind im sogenannten Berliner Haushalt festgelegt. Sie lassen sich in 9 bundesweit vereinheitlichte Hauptfunktionsbereiche untergliedern. Diese können als oberste Stufe einer Treemap dargestellt werden:
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
              <li><p className="pl-6">Alle Ausgaben und Einnahmen<br></br>in der Tree Map erkunden</p>
              </li>
            </ul>
          </div>
          </FadeInWrapper>
          </div>
          <div className="flex-col inline-block my-auto justify-center md:pr-10">
            <iframe style={{ width: "100%" }}
              title="Beispiel-Visualisierung der Haushaltsdaten"
              width="400rem"
              height="400"
              src="https://haushaltsdaten-staging.odis-berlin.de/share"
            ></iframe>
          </div>
        </div>

        <div className="lg:w-3/6 m-auto mt-6 md:mt-12">
            Im Berliner Haushaltsplan sind die Ausgaben und Einnahmen außerdem spezifischen Bereichen zugeordnet: Der Hauptverwaltung und den zwölf Berliner Bezirken. Außerdem werden die Beträge für den einzelnen Haushaltsjahren getrennt angegeben. Mittels der Visualisierung die über den Link oben erreichbar ist, können die einzelnen Bereiche und Jahre erkundet werden.
            <br></br><br></br>
            Die Hauptfunktionen lassen sich in weitere Funktionsbereiche untergliedern. Die unterste detailierteste Angabe zu spezifischen Ausgaben und Einnahmen sind die sogenannten Titelbezeichung. Sie können über die Visualisierung angezeigt werden und erscheinen dann unter der Tree Map. Titel und Funktionen können aber auch gezielt über die Suchfunktion gefunden werden.  
          <div className="flex justify-center mt-6 md:mt-12">
            <FadeInWrapper>
              <ul>
              <span className="font-bold text-xl text-brand">
                  <InternalLink href={'/suche'}>
                    {'→ Zur Suche'}
                  </InternalLink>
                </span>
                <li><p className="pl-6">Nach Stichwörtern in den Einnahmen und Ausgaben suchen</p>
                </li>
              </ul>
            </FadeInWrapper>
          </div>

          <div className="flex-col mt-6 md:mt-16">
            Wie genau funktioniert das eigentlich mit dem Haushalt? Das Land Berlin muss alle voraussichtlichen Einnahmen und Ausgaben
            eines Jahres in einem Plan ausweisen, dem „Öffentlichen Haushalt“.
            Jährlich stellt der Senat, genauer die Senatsverwaltung für Finanzen,
            einen Haushaltsplanentwurf mit den jeweiligen Einzelhaushalten der
            Verwaltungen auf. Was das genau bedeutet, kann auf der Info-Seite nachgelesen werden.
          </div>
          <div className="flex justify-center mt-6 md:mt-12">
            <FadeInWrapper>
              <ul>
              <span className="font-bold text-xl text-brand">
                  <InternalLink href={'/faq'}>
                    {'→ Zur Informationsseite'}
                  </InternalLink>
                </span>
                <li><p className="pl-6">Mehr erfahren in den Fragen und Antworten zum Berliner Haushalt</p>
                </li>
              </ul>
            </FadeInWrapper>
          </div>
        </div>

        <div className="lg:w-3/6 m-auto mt-6 md:mt-12">
          <h2 className="text-2xl md:text-3xl mt-12 md:mt-20">
            Wissenwertes zum Berliner Haushalt
          </h2>
          <div className="flex-col mt-6">
            Wie genau funktioniert das eigentlich mit dem Haushalt? Das Land Berlin muss alle voraussichtlichen Einnahmen und Ausgaben
            eines Jahres in einem Plan ausweisen, dem „Öffentlichen Haushalt“.
            Jährlich stellt der Senat, genauer die Senatsverwaltung für Finanzen,
            einen Haushaltsplanentwurf mit den jeweiligen Einzelhaushalten der
            Verwaltungen auf. Haushaltsrechtlich möglich ist es auch Haushalte direkt für
            zwei Jahre, jeweils nach Jahren getrennt, festzusetzen. In Berliner macht man von dieser Regelung gebrauch, solche &quot;Doppelhaushalte&quot; vorzulegen,
            da dadurch der Verwaltungsaufwand reduziert wird.
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
            <GroupedBarChart data={TOTAL_EXPENSES}/>
          </div>
          <div className="mt-6 md:mt-16">
            Die Haushaltslage des Landes hat sich in den vergangenen Jahren stetig
            verbessert, sodass Berlin seit dem Jahr 2012 zur Finanzierung seiner
            laufenden Ausgaben keine zusätzlichen Kredite mehr aufnehmen musste.
          </div>
          <div className="flex justify-center mt-6 md:mt-12">
            <FadeInWrapper>
              <ul>
              <span className="font-bold text-xl text-brand">
                  <InternalLink href={'/faq'}>
                    {'→ Zu weiteren Infos'}
                  </InternalLink>
                </span>
                <li><p className="pl-6">Mehr erfahren in den Fragen und Antworten zum Berliner Haushalt</p>
                </li>
              </ul>
            </FadeInWrapper>
          </div>
          </div>

      <div className="lg:w-3/6 m-auto mt-6 md:mt-12 md:mt-12 mb-16 md:mb-28 ">
        <h2 className="text-xl md:text-2xl mt-12 md:mt-20">
          Schwerpunktthemen im aktuellen Haushalt
        </h2>
        <div className="mt-6">
          Im aktuellen doppelhaushalt lassen sich einige Themen in einen besonderen Fokus setzten.
          So ist Berlin beispielweise bis heute eines der wenigen Bundesländer in Deutschland,
          das die Umsetzung von Gender Budgeting im Landeshaushalt explizit
          formuliert hat.
          <br></br>
          Weiterhin relevant ist die in Berlin steigende Investitionsquote. Die aus dem laufenden Haushalt finanzierten Investitionen sollen auch weiter anwachsen.
          <br></br>
          Die Berliner Schulbauoffensive (BSO) ist das größte Investitionsvorhaben der letzten und laufenden Legislaturperiode. Damit soll der Sanierungsstau an den Schulen weiter abgebaut und für die wachsende Stadt neue Schulen errichtet werden.
          <br></br><br></br>
          Mehr zu diesen Themen ist auf der Webseite der Senatsverwaltung für Finanzen zu erfahren.
        </div>
      

        <div className="mt-6">
          <div className="flex-col">
            <p className='text-brand'><a href="https://www.berlin.de/sen/finanzen/haushalt/gender-budgeting/artikel.11915.php">→ Gender-Budgeting</a></p>
            {/* <p>Berlin ist eines der wenigen Bundesländer,
          das die Umsetzung von Gender Budgeting im Landeshaushalt explizit
          formuliert hat und inzwischen dabei ist, Gender Budgeting in die
          normale Haushaltspolitik zu integrieren.</p> */}
          </div>
          <div className="flex-col">
          <p className='text-brand'p><a href="https://www.berlin.de/rbmskzl/aktuelles/pressemitteilungen/2022/pressemitteilung.1181316.php">→ Entwicklung der Investitionsquote</a></p>
            {/* <p>Die aus dem laufenden Haushalt finanzierten Investitionen sollen weiter anwachsen auf 2,930 Mrd. Euro im Jahr 2022 und 3,238 Mrd. Euro im Jahr 2023.</p> */}
          </div>
          <div className="flex-col">            
          <p className='text-brand'><a href="https://www.berlin.de/sen/finanzen/haushalt/schulbauoffensive/artikel.613867.php">→ Schulbauoffensive</a></p>
            {/* <p>Die Berliner Schulbauoffensive (BSO) ist das größte Investitionsvorhaben der letzten und laufenden Legislaturperiode. Damit soll der Sanierungsstau an den Schulen weiter abgebaut und für die wachsende Stadt neue Schulen errichtet werden.</p> */}
          </div>
        </div>
      </div> 
    </div>
  </div>
   
  )
}

export default HomePage
