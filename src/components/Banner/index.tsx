import { FC, useState } from 'react'
import { Button } from '@components/Button'
import { Cross } from '@components/Icons'

export const Banner: FC = () => {
  const [showBanner, setShowBanner] = useState(true)

  return showBanner ? (
    <div className="bg-brand text-white sticky top-0">
      <button
        onClick={() => setShowBanner(false)}
        className="p-2 font-medium text-brand cursor-pointer absolute right-0"
      >
        <Cross color1={'white'} />
      </button>
      <div className="px-4 xl:px-8 py-5 py-8 flex gap-4 items-end flex-wrap">
        <p className="grow">
          <b>Liebe Developer, </b>
          am 23.11.22 um 19 Uhr findet im CityLAB Berlin das nächste Developer
          Meetup statt.
          <br />
          Du bist herzlich willkommen, uns über die Schulter zu schauen und
          selbst aktiv mitzumachen. Wir freuen uns auf euch!
        </p>
        <span className="shrink-0">
          <Button href={'https://www.citylab-berlin.org'}>Mehr Erfahren</Button>
        </span>
      </div>
    </div>
  ) : null
}
