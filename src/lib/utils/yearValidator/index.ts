export const VALID_YEARS = [2022, 2023]

export const DEFAULT_YEAR = 2022

export const isValidYear = (yearToCheck: number): boolean =>
  VALID_YEARS.includes(yearToCheck)
