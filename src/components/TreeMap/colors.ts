import colors from 'src/style/colors'

export const getColorByMainTopic: (mainTopic: string) => string = (
  mainTopic
) => {
  switch (true) {
    case mainTopic === 'Allgemeine Dienste':
      return colors.lightblue
    case mainTopic ===
      'Bildungswesen, Wissenschaft, Forschung, kulturelle Angelegenheiten':
      return colors.orange
    case mainTopic ===
      'Energie- und Wasserwirtschaft, Gewerbe, Dienstleistungen':
      return colors.yellow
    case mainTopic === 'Ernährung, Landwirtschaft und Forsten':
      return colors.lightgreen
    case mainTopic === 'Finanzwirtschaft':
      return colors.middlegreen
    case mainTopic === 'Gesundheit, Umwelt, Sport und Erholung':
      return colors.pink
    case mainTopic ===
      'Soziale Sicherung, Familie und Jugend, Arbeitsmarktpolitik':
      return colors.middleblue
    case mainTopic === 'Verkehrs- und Nachrichtenwesen':
      return colors.violet
    case mainTopic ===
      'Wohnungswesen, Städtebau, Raumordnung und kommunale Gemeinschaftsdienste':
      return colors.gray[300]
    default:
      return colors.gray[200]
  }
}
