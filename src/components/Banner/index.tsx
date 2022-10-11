import { FC, useState } from 'react'
// import { Button } from '@components/Button'
import { Cross } from '@components/Icons'

export const Banner: FC = () => {
  const [showBanner, setShowBanner] = useState(true)
  const hideBanner = (): void => {
    setShowBanner(false)
  }

  return showBanner ? (
    <div className="bg-brand text-white flex px-4 xl:px-8 py-5 py-8">
      <p>
        <b>Liebe Developer, </b>
        am 23.11.22 um 19 Uhr findet im CityLAB Berlin das nächste Developer
        Meetup statt. Du bist herzlich willkommen, uns über die Schulter zu
        schauen und selbst aktiv mitzumachen. Wir freuen uns auf euch!
      </p>
      {/* <Button href={'https://www.citylab-berlin.org'}>Tolle Seite!</Button> */}
      <button
        onClick={hideBanner}
        className="font-medium text-brand cursor-pointer pr-4"
      >
        <Cross color1={'white'} />
      </button>
    </div>
  ) : null
}
