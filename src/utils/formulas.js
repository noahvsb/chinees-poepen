export const formulas = [
  { label: '2 * (n + 1)', calculate: (n) => 2 * (n + 1) },
  { label: '10 + n', calculate: (n) => 10 + n },
];

export function calculateFormula(index, n) {
  return formulas[index].calculate(n);
}