export function percentDifference(a, b) {
  return Number(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2);
}

export function toUpperInitial(str) {
  const chunk = str.slice(1, str.length);
  const upperCaseTitle = str[0].toUpperCase() + chunk;
  return upperCaseTitle;
}
