const BASE = 2;

const priceQ1 = (mintedYes: number, mintedNo: number, b: number): number => {
  return (
    Math.pow(BASE, mintedYes / b) /
    (Math.pow(BASE, mintedYes / b) + Math.pow(BASE, mintedNo / b))
  );
};

const priceQ2 = (mintedYes: number, mintedNo: number, b: number): number => {
  return (
    Math.pow(BASE, mintedNo / b) /
    (Math.pow(BASE, mintedYes / b) + Math.pow(BASE, mintedNo / b))
  );
};

const cost = (q1: number, q2: number, b: number) => {
  return b * Math.log2(Math.pow(BASE, q1 / b) + Math.pow(BASE, q2 / b));
};

const currencyFormat = (min: number = 2, max: number = 2) =>
  new Intl.NumberFormat(undefined, {
    maximumFractionDigits: max,
    minimumFractionDigits: min,
    style: 'decimal',
  });
export { priceQ1, priceQ2, cost, currencyFormat };
