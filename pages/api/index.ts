/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */

import type { NextApiRequest, NextApiResponse } from 'next'
import postgres from 'postgres'
import groupBy from 'lodash.groupby'

const POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost'
const { POSTGRES_PORT } = process.env
const POSTGRES_USER = process.env.POSTGRES_USER || 'postgres'
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'postgres'
const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE || 'postgres'
const port = parseInt(POSTGRES_PORT ? POSTGRES_PORT : '5432', 10)
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const sql = postgres({
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  database: POSTGRES_DATABASE,
  port: isNaN(port) ? 5432 : port,
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, unknown>>
) {
  if (req.query.type === 'in') {
    console.log('could filter for einnahme')
  } else if (req.query.type === 'out') {
    console.log('could filter for ausgabe')
  }
  if (req.query.bezirk) {
    console.log('could filter for bezirk')
    console.log('should adjust the sql query and add WHERE bereich = ${}')
  }
  const data: { name: string; children: unknown[] } = {
    name: 'Übersicht',
    children: [],
  }
  try {
    // const dataset = {
    // 	einnahmen: {},
    // 	ausgaben: {},
    // };
    const result = await sql`
		SELECT * from haushaltsdaten_2022`

    const hf = groupBy(result, 'hauptfunktion')
    const hf_of = Object.keys(hf).map((key) => {
      return {
        children: groupBy(hf[key], 'oberfunktion'),
        hauptfunktion: key,
        name: hf[key][0].hauptfunktions_bezeichnung,
      }
    })

    const f_of_hf = Object.keys(hf_of).map((hf_key) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const f = Object.keys(hf_of[hf_key].oberfunktion).map((of_key) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const items = hf_of[hf_key].oberfunktion[of_key]
        const name = items[0].funktions_bezeichnung
        const funktions_groups = groupBy(items, 'funktion')
        return {
          oberfunktion: of_key,
          name: name,
          children: Object.keys(funktions_groups).map((k) => {
            return funktions_groups[k]
          }),
        }
      })
      return {
        hauptfunktion: hf_key,

        name: hf[hf_key][0].hauptfunktions_bezeichnung,
        children: f,
      }
    })

    data.children.push(...f_of_hf)

    console.log(JSON.stringify(data, null, 2))
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error)
      res.status(500).json({ message: error.message })
    }
  } finally {
    sql.end()
  }
  res.status(200).json(data)
}
