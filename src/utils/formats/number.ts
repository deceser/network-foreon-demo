/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
/**
 * Format number to US locale
 * @param num number to format
 * @param fractionDigits number of fraction digits, default to 3
 * @returns formatted number
 */
function numberFormat(num: bigint | number | string, fractionDigits = 3) {
  try {
    const parsedNum = typeof num === 'string' ? parseFloat(num) : num;
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: fractionDigits,
      minimumFractionDigits: 0, // Automatically trims trailing zeros
    }).format(parsedNum);
  } catch {
    console.error('Failed to format number:', num);
    return '--';
  }
}

const MIN_SI_NUMBER = 1e6;
const SI_UNITS = [
  { value: 1e6, symbol: 'M' },
  { value: 1e9, symbol: 'B' },
  { value: 1e12, symbol: 'T' },
  { value: 1e15, symbol: 'q' },
  { value: 1e18, symbol: 'Q' },
  { value: 1e21, symbol: 's' },
  { value: 1e24, symbol: 'S' },
];

/**
 * Format large numbers with SI units and apply rounding rules
 * @param num number to format
 * @param fractionDigits number of fraction digits, default to 3
 * @returns formatted number with SI unit
 */
function numberSIFormat(num: bigint | number | string, fractionDigits = 3) {
  try {
    const parsedNum = typeof num === 'string' ? parseFloat(num) : num;

    if (parsedNum < MIN_SI_NUMBER) {
      return numberFormat(parsedNum);
    }

    // Find appropriate SI unit
    const unit = SI_UNITS.slice()
      .reverse()
      .find((unit) => parsedNum >= unit.value);

    if (unit) {
      const formattedNum = ((parsedNum as number) / unit.value).toFixed(
        fractionDigits,
      );
      const trimmedNum = parseFloat(formattedNum); // Trim trailing zeros after the decimal
      return `${trimmedNum}${unit.symbol}`;
    }

    return numberFormat(parsedNum); // Fallback for very large numbers
  } catch {
    console.error('Failed to compact format number:', num);
    return '--';
  }
}

export { numberFormat, numberSIFormat };
