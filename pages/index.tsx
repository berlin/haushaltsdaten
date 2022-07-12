import { TreeMap } from '@components/TreeMap'
import { GetServerSideProps } from 'next'
import { FC } from 'react'

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: {
    title: 'Willkommen',
    query,
  },
})

export const Home: FC = () => {
  return <TreeMap titelart="Einnahmetitel" funktion="Politische Führung" />
}

export default Home
