import React, { FC, useEffect, useRef, useState } from 'react'
import { supabase } from '@lib/requests/createSupabaseClient'
import { GetStaticProps } from 'next'
import classNames from 'classnames'
import { formatCurrency } from '@lib/utils/numberUtil'
import { Button } from '@components/Button'

export interface FilteredSearchResultsType {
  id: string
  titel_bezeichnung: string
  titel_art?: 'Einnahmetitel' | 'Ausgabetitel'
  bereichs_bezeichnung: string
  betrag: string
  jahr: string
  titel: string
  oberfunktions_bezeichnung: string
  hauptfunktions_bezeichnung: string
  funktions_bezeichnung: string
  obergruppen_bezeichnung: string
  hauptgruppen_bezeichnung: string
  gruppen_bezeichnung: string
  einzelplan_bezeichnung: string
  kapitel_bezeichnung: string
}

const ITEMS_PER_PAGE = 100

const toTitleCase = (s: string): string =>
  s.replace(/^_*(.)|_+(.)/g, (_s, c: string, d: string) =>
    c ? c.toUpperCase() : '-' + d.toUpperCase()
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

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async () => ({
  props: {
    title: 'Textsuche',
  },
})

export const Search: FC = () => {
  const [results, setResults] = useState<FilteredSearchResultsType[] | null>(
    null
  )
  const [searchTerm, setSearchTerm] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [itemsShown, setItemsShown] = useState(ITEMS_PER_PAGE)

  useEffect(() => {
    setItemsShown(ITEMS_PER_PAGE)
  }, [searchTerm])

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
      setSearchTerm(value)
      const mappedData: FilteredSearchResultsType[] = data.map(
        (row: FilteredSearchResultsType) => {
          return {
            titel_bezeichnung: row['titel_bezeichnung'],
            titel_art: row['titel_art'],
            jahr: row['jahr'],
            betrag: `${formatCurrency(parseInt(row['betrag'], 10))} €`,
            bereichs_bezeichnung: row['bereichs_bezeichnung'],
            einzelplan_bezeichnung: row['einzelplan_bezeichnung'],
            kapitel_bezeichnung: row['kapitel_bezeichnung'],
            hauptfunktions_bezeichnung: row['hauptfunktions_bezeichnung'],
            oberfunktions_bezeichnung: row['oberfunktions_bezeichnung'],
            funktions_bezeichnung: row['funktions_bezeichnung'],
            hauptgruppen_bezeichnung: row['hauptgruppen_bezeichnung'],
            obergruppen_bezeichnung: row['obergruppen_bezeichnung'],
            gruppen_bezeichnung: row['gruppen_bezeichnung'],
            titel: row['titel'],
            id: row['id'],
          }
        }
      )
      setResults(mappedData)
    }
  }

  return (
    <>
      <div className="px-8">
        <div className="md:w-4/5 m-auto mt-12 md:mt-20">
          <h1
            id="search-field-title"
            className="font-bold text-2xl md:text-3xl lg:text-4xl lg:ml-28"
          >
            Textsuche
          </h1>
          <div className="lg:w-3/6 m-auto mt-6 md:mt-16">
            <div className="flex-col mt-6">
              Mithilfe dieser Funktion kann der gesamte Haushalt durchsucht
              werden. Es kann sowohl nach Bereichen, Kapiteln (Zuständigkeiten),
              Funktionen und Gruppen (Art der Ausgaben und Einnahmen), als auch
              stichwortartig nach den einzelnen Ausgabetiteln gesucht werden.
              Auch Kombinationen und Suchen nach numerischen Bezeichnungen von
              Ausgabetiteln sind möglich.
              <br></br>
              <br></br>
              Ein Beispiel für eine allgemeine Suche nach Kapiteln wäre
              „Senatsverwaltung für Inneres, Digitalisierung und Sport“ mit über
              500 Ergebnissen. Eine detailliertere Suche nach Stichworten wäre
              zum Beispiel „Sporthalle“ (46 Ergebnisse) oder „Kita Spandau“ (10
              Ergebnisse).
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center px-4 my-24">
        <div className="flex-col">
          <form className="flex gap-2 flex-wrap justify-center" ref={form}>
            <input
              aria-labelledby="search-field-title"
              type="text"
              id="full-text-search-field"
              name="search"
              placeholder="Suchbegriff"
              className={classNames(
                'sm:min-w-[300px] p-2',
                'rounded-md',
                'border border-gray-400 focus:border-brand focus:outline-none'
              )}
            />
            <button
              className={classNames(
                'py-2 px-4 rounded-md',
                'font-bold text-white',
                'bg-gray-900 hover:bg-gray-800 focus:bg-brand focus:outline-none'
              )}
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
          <div className="overflow-x-auto">
            <div className="min-w-full pt-2 pb-16">
              {results ? (
                <>
                  <div className="overflow-x-auto" id="results">
                    <div className="w-full flex justify-center mb-8">
                      <div>
                        {searchTerm ? (
                          <p>
                            {results.length} Ergebnis
                            {results.length !== 1 && 'se'} für den Begriff{' '}
                            <span className="font-bold">{searchTerm}</span>
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <Table
                      head={
                        <tr>
                          {Object.keys(results[0]).map((name, i) => {
                            return (
                              <th
                                key={name}
                                scope="col"
                                className={`text-left py-3 px-4 border-b border-gray-500 ${
                                  i === 2 ? 'text-right' : 'text-left'
                                }`}
                              >
                                {name === 'id' ? '#' : toTitleCase(name)}
                              </th>
                            )
                          })}
                        </tr>
                      }
                      body={results.slice(0, itemsShown).map((result) => {
                        return (
                          <tr key={result.id}>
                            {Object.keys(result).map((k, i) => {
                              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              // @ts-ignore
                              const item = result[k] as string
                              return (
                                <td
                                  key={k}
                                  className={`py-3 px-4 border-b border-gray-200 first-of-type:text-brand first-of-type:font-bold ${
                                    i === 2 ? 'text-right' : 'text-left'
                                  }`}
                                >
                                  {item}
                                </td>
                              )
                            })}
                          </tr>
                        )
                      })}
                    />
                  </div>
                  {results.length > ITEMS_PER_PAGE && (
                    <div className="justify-center flex mt-8">
                      <Button
                        onClick={() =>
                          setItemsShown(itemsShown + ITEMS_PER_PAGE)
                        }
                        disabled={itemsShown >= results.length}
                      >
                        <span className="block">
                          {itemsShown >= results.length
                            ? 'Keine weitere Suchergebnisse'
                            : 'Weitere Suchergebnisse anzeigen'}
                          <span className="font-normal text-xs block">
                            ({Math.min(itemsShown, results.length)}/
                            {results.length})
                          </span>
                        </span>
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full flex justify-center mb-24">
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
      ) : (
        <>
          <div className="container flex justify-center pb-20 mx-auto">
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
