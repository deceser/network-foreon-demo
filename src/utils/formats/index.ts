import { NUMBER_OF_HEX, NUMBER_PAD_START } from '@/constants/units';

const maxLength = 9;
const numberSlice = -4;
const PERCENTAGE = 100;
const getFormatedAddress = (
  address: string,
  padStart = maxLength,
  padEnd = numberSlice,
): string => address.slice(0, padStart) + ' ... ' + address.slice(padEnd);

function asciiToHex(str: string) {
  let hexStr = '';
  for (let i = 0; i < str.length; i++) {
    const hex = str.charCodeAt(i).toString(NUMBER_OF_HEX);
    hexStr += hex.padStart(NUMBER_PAD_START, '0');
  }
  return hexStr.toUpperCase();
}

const uppercaseFirstLetter = (string) => {
  if (!string) return ''; // Check if the string is empty or null
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

function formatPercentage(number) {
  return (
    (Math.floor(number * PERCENTAGE) / PERCENTAGE).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }) + '%'
  );
}

function trimTrailingZeros(value: string) {
  return value.replace(/^0+(?=\d)/, '').replace(/\.0*$|(\.\d*[1-9])0+$/, '$1');
}

export {
  asciiToHex,
  getFormatedAddress,
  formatPercentage,
  uppercaseFirstLetter,
  trimTrailingZeros,
};
