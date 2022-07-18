import { scaleOrdinal } from 'd3'
import colors from 'src/style/colors'

export const getColorByMainTopic: (
  mainTopic: string,
  domain: string[]
) => string = (mainTopic, domain) => {
  const scale = scaleOrdinal()
    .domain(domain)
    .range([
      colors.lightblue,
      colors.middleblue,
      colors.lightgreen,
      colors.middlegreen,
      colors.pink,
      colors.orange,
      colors.yellow,
      colors.violet,
      colors.gray[400],
    ])

  return scale(mainTopic) as string
}
