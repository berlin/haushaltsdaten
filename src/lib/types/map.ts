/*
  This type is taken from react-map-gl. We are not using the library anymore, so we have to add these types ourselves.
*/
export type ViewportProps = Partial<{
  width: number
  height: number
  latitude: number
  longitude: number
  zoom: number
  bearing: number
  pitch: number
  altitude: number
  maxZoom: number
  minZoom: number
  maxPitch: number
  minPitch: number
  transitionDuration: number | 'auto'
  transitionEasing: (t: number) => number
  transitionInterpolator: unknown
  transitionInterruption: number
}>
