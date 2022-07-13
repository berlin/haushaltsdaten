const currencyFormatter = new Intl.NumberFormat('DE-DE', { currency: 'EUR' })

export const formatCurrency = (num: number): string =>
  currencyFormatter.format(num)
