/**
 * Years should correspond to available data in database
 */
export const VALID_YEARS = [2026, 2027]

export const DEFAULT_YEAR = 2026

export const isValidYear = (yearToCheck: number): boolean =>
  VALID_YEARS.includes(yearToCheck)
