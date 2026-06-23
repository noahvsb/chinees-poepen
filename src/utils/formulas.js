export const formulas = [
  { label: '10 + n', calculate: (n) => 10 + n },
  { label: '2 * (n + 1)', calculate: (n) => 2 * (n + 1) },
];

export function calculateFormula(index, n) {
  return formulas[index].calculate(n);
}