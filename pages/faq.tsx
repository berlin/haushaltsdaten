import { GetServerSideProps } from 'next'
import { FC } from 'react'
import TypeAnimation from 'react-type-animation';
import { GroupedBarChart } from "./BarChart";
import items from './function_groups';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: {
    title: 'Willkommen',
    query,
  },
})


export const Home: FC = () => (
  <>
    <h1 className="font-bold text-4xl mt-26 mb-6">Fragen und Antworten</h1>
    <h2 className="font-bold text-2xl mb-6 mt-12">Was zeigen die Diagramme?</h2>
    <div className="flex justify-center mt-6">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. 
    </div>
    <h2 className="font-bold text-2xl mb-6 mt-12">Wo kommen die Daten her?</h2>
    <div className="flex justify-center mt-6">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. 
    </div>
    <h2 className="font-bold text-2xl mb-6 mt-12">Was ist ein Doppelhaushalt?</h2>
    <div className="flex justify-center mt-6">
    Anstelle einen neuen Haushalt jedes Jahr zu verabschieden, kann eine Stadt oder eine Gemeinde einen Zweijahreshaushalt oder Doppelhaushalt 
    verabschieden. Häufig entlastet dies die Verwaltung und die Politik dadurch, dass nicht jedes Jahr eine große Haushaltsdebatte stattfindet. 
    Über zwei Jahre können sich allerdings natürlich viele Dinge ändern, daher kann das Parlament mit einem Nachtragshaushalt nachsteuern,
    und so Umverteilungen oder Mehrausgaben beschließen.
    </div>
    <h2 className="font-bold text-2xl mb-6 mt-12">Wie setzt sich der Berliner Haushalt zusammen?</h2>
    <div className="flex justify-center mt-6">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. 
    </div>
    <h2 className="font-bold text-2xl mb-6 mt-12">Wer entscheidet über die Ausgaben?</h2>
    <div className="flex justify-center mt-6">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. 
    </div>
  </>
)

export default Home
