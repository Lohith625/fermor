export function projectSavings(monthly, years, annualRate) {
  const months = Math.round(years * 12);
  const rate = annualRate / 1200;
  const invested = monthly * months;
  const total =
    rate === 0 ? invested : monthly * ((Math.pow(1 + rate, months) - 1) / rate);
  return { invested, total, growth: total - invested };
}
