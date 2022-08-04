export const VALID_MODUS = [1, 2]

export const DEFAULT_MODUS = 1

export const isValidModus = (modusToCheck: number): boolean =>
  VALID_MODUS.includes(modusToCheck)
