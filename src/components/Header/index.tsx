import { EmbeddPopup } from '@components/EmbeddPopup'
import { ListBox } from '@components/ListBox'
import { ToggleSwitch } from '@components/Toggle'
import classNames from 'classnames'
import { FC } from 'react'

const Separator: FC = () => <span className="h-10 w-[1px] bg-gray-200" />

export const Header: FC = () => {
  return (
    <header
      className={classNames(
        'fixed px-8 py-4',
        'w-screen inset-0 bottom-auto bg-gray-50',
        'border-b border-gray-100'
      )}
    >
      <div className="container max-w-8xl mx-auto flex justify-between items-center">
        <h1 className="font-bold text-xl">
          Berliner Haushaltsdaten <span className="font-normal">2022</span>
        </h1>
        <nav className="flex gap-6">
          <ToggleSwitch optionA="Einnahmen" optionB="Ausgaben" />
          <Separator />
          <ListBox
            options={[
              {
                name: 'Charlottenburg-Wilmersdorf',
                id: 'charlottenburgWilmersdorf',
              },
              {
                name: 'Friedrichshain-Kreuzberg',
                id: 'friedrichshainKreuzberg',
              },
              { name: 'Marzahn-Hellersdorf', id: 'marzahnHellersdorf' },
              { name: 'Mitte', id: 'mitte' },
              {
                name: 'Lichtenberg Hohenschönhausen',
                id: 'lichtenbergHohenschoenhausen',
              },
              { name: 'Pankow', id: 'pankow' },
              { name: 'Reinickendorf', id: 'reinickendorf' },
              { name: 'Spandau', id: 'spandau' },
              { name: 'Steglitz-Zehlendorf', id: 'steglitzZehlendorf' },
              { name: 'Neukölln', id: 'neukölln' },
              { name: 'Tempelhof-Schöneberg', id: 'tempelhofSchoeneberg' },
              { name: 'Treptow-Köpenick', id: 'treptowKöpenick' },
            ]}
          />
          <Separator />
          <EmbeddPopup />
        </nav>
      </div>
    </header>
  )
}
