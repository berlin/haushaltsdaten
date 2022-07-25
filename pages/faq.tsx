import { GetStaticProps } from 'next'
import React, { useState } from "react";
import { FC } from 'react'

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async () => ({
  props: {
    title: 'FAQ',
  },
})

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 250) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? " ...mehr anzeigen" : " weniger anzeigen"}
      </span>
    </p>
  );
};

export const FaqPage: FC = () => (
  <div className="px-8">
    <div className="md:w-3/5 m-auto mt-12 md:mt-20">
      <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">Fragen und Antworten</h1>
      
      <h2 className="font-bold text-xl md:text-2xl mt-12 md:mt-20">Was zeigen die Diagramme?</h2>
      <div className="flex justify-center mt-6">
      <ReadMore>
        Die interaktiven Diagramme in ihrer Ausgangsform zeigen eine Übersicht der
        kompletten Ausgaben und Einnahmen der Berliner Verwaltung. Durch Eingaben
        der Nutzer:innen werden weitere Detailebenen angezeigt, wie Bezirk oder
        Funktionen. Die Diagramme wurden erstellt, um die komplexen Haushaltsdaten
        nutzer:innenfreundlich darzustellen.
        </ReadMore>
      </div>

      <h2 className="font-bold text-xl md:text-2xl mt-6 md:mt-12">Wo kommen die Daten her?</h2>
      <div className="flex justify-center mt-6 mb-6 md:mb-20">
      <ReadMore>
        Alle Visualisierungen basieren auf dem öffentlich zugänglichen Datensatz
        des Doppelhaushaltes 2022/2023, der von der Senatsverwaltung für Finanzen
        bereitgestellt wird und auf dem Berliner Open Data Portal veröffentlicht
        ist. Darüber hinaus können Nutzer:innen auf dem Open Data Portal die
        Haushaltsdaten der vergangenen 10 Jahre einsehen.
        </ReadMore>
      </div>
  {/* 
      <h2 className="font-bold text-2xl mb-6 mt-12">
        Was ist ein Doppel- und Nachtragshaushalt?
      </h2>
      <div className="flex justify-center mt-6">
        Anstelle einen neuen Haushalt jedes Jahr zu verabschieden, kann eine Stadt
        oder eine Gemeinde einen Zweijahreshaushalt oder Doppelhaushalt
        verabschieden. Häufig entlastet dies die Verwaltung und die Politik
        dadurch, dass nicht jedes Jahr eine große Haushaltsdebatte stattfindet.
        Über zwei Jahre können sich allerdings natürlich viele Dinge ändern, daher
        kann das Parlament mit einem Nachtragshaushalt nachsteuern, und so
        Umverteilungen oder Mehrausgaben beschließen. Dies war beispielsweise
        während der Corona-Pandemie nötig, um Mehrausgaben für Pflegepersonal und
        Unterstützung der Berliner Wirtschaft zu gewährleisten.
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
)

export default FaqPage
