const dollarFormatter = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' });

export function stringToNumber(value: string | number | null | undefined) {
  const number = (value ?? '').toString().replace(/[^\d-.]/g, '');
  const defaultValue = null;

  if (!number) return defaultValue;

  const result = Number(number);

  if (isNaN(result)) return defaultValue;

  return result;
}

export function formatDollar(number: string | number | null | undefined) {
  let parsedNumber = number ?? 0;

  if (typeof parsedNumber === 'number') {
    parsedNumber = parsedNumber;
  } else if (typeof parsedNumber === 'string') {
    parsedNumber = stringToNumber(parsedNumber) ?? 0;
  }

  return dollarFormatter.format(parsedNumber);
}
