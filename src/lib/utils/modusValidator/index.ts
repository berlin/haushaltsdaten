export const VALID_MODUS = ['Einzelpläne', 'Funktionen']

export const DEFAULT_MODUS = 'Funktionen'

export const isValidModus = (modusToCheck: string): boolean =>
  VALID_MODUS.includes(modusToCheck)
