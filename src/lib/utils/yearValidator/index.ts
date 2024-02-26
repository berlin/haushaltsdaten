/**
 * Years should correspond to available data in database
 */
export const VALID_YEARS = [2022, 2023, 2024, 2025]

export const DEFAULT_YEAR = 2024

export const isValidYear = (yearToCheck: number): boolean =>
  VALID_YEARS.includes(yearToCheck)
