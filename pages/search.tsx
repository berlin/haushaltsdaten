import React, { FC, useRef, useState } from 'react'
import { supabase } from '@lib/requests/createSupabaseClient'

export interface TData {
  [key: string]: unknown
  id: string
  typ: string
  bezeichnung: string
  bereich: string
  bereichs_bezeichnung: string
  einzelplan: string
  einzelplan_bezeichnung: string
  kapitel: string
  kapitel_bezeichnung: string
  hauptgruppe: string
  hauptgruppen_bezeichnung: string
  obergruppe: string
  obergruppen_bezeichnung: string
  gruppe: string
  gruppen_bezeichnung: string
  hauptfunktion: string
  hauptfunktions_bezeichnung: string
  oberfunktion: string
  oberfunktions_bezeichnung: string
  funktion: string
  funktions_bezeichnung: string
  titel_art: string
  titel: string
  titel_bezeichnung: string
  jahr: string
  betrag_typ: string
  betrag: string
}

const toTitleCase = (s: string) =>
  s.replace(/^_*(.)|_+(.)/g, (_s, c: string, d: string) =>
    c ? c.toUpperCase() : ' ' + d.toUpperCase()
  )

const Table: FC<{ body: React.ReactNode; head: React.ReactNode }> = ({
  body,
  head,
}) => {
  return (
    <table className="w-full overflow-scroll table-auto">
      <thead>{head}</thead>
      <tbody>{body}</tbody>
    </table>
  )
}
export const Search: FC = () => {
  const [results, setResults] = useState<TData[] | null>(null)
  const [searchTerm, setSearchTerm] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const form = useRef<HTMLFormElement>(null)
  const handleClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void = (e) => {
    e.preventDefault()
    if (!form || !form.current || !form.current['search']) {
      return
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-member-access
    const value = form.current['search'].value! as string
    setLoading(true)
    fetchData(value).catch(console.error)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    form.current['search'].value = ''
  }
  const fetchData: (value: string) => Promise<void> = async (value) => {
    const { data, error } = await supabase.rpc('ftc', { search: value })
    setLoading(false)
    if (error) {
      console.error(error)
      throw new Error(error.message)
    }
    if (!data || data.length === 0) {
      setResults(null)
      setSearchTerm(value)
    } else {
      setResults(data)
    }
  }

  return (
    <>
      <div className="container flex justify-center mt-6 mb-6">
        <div className="flex-col">
          <h1 className="flex justify-center mt-20 text-5xl font-bold">
            Voll Text Suche
          </h1>
          <form className="flex-form" ref={form}>
            <label htmlFor="search">Suche</label>
            <input
              type="text"
              id="input"
              name="search"
              placeholder="Suchebegriff"
            />
            <button
              className="font-bold text-white bg-gray-500 hover:bg-gray-800"
              id="submit"
              onClick={handleClick}
            >
              Suchen
            </button>
          </form>
        </div>
      </div>

      {!loading ? (
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto" id="results">
                {results ? (
                  <>
                    <div className="container flex justify-center">
                      <div className="">
                        {searchTerm ? (
                          <p>
                            Ergebnisse für den Begriff{' '}
                            <span className="font-bold">{searchTerm}</span>
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <Table
                      head={
                        <tr>
                          {Object.keys(results[0]).map((name) => {
                            return (
                              <th key={name} scope="col" className="text-left">
                                {name === 'id' ? '#' : toTitleCase(name)}
                              </th>
                            )
                          })}
                        </tr>
                      }
                      body={results.map((result) => {
                        return (
                          <tr key={result.id}>
                            {Object.keys(result).map((k) => {
                              return <td key={k}>{result[k] as string}</td>
                            })}
                          </tr>
                        )
                      })}
                    />
                  </>
                ) : (
                  <div className="container flex justify-center">
                    <div className="">
                      {searchTerm ? (
                        <p>
                          Keine Ergebnisse für den Begriff{' '}
                          <span className="font-bold">{searchTerm}</span>
                        </p>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="container flex justify-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                ></path>
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Search
