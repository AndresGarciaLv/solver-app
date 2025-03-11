export function euler(
  f: (x: number, y: number) => number,
  x0: number,
  y0: number,
  h: number,
  n: number
): Array<{ x: number; y: number }> {
  let x = x0;
  let y = y0;
  const results = [{ x: parseFloat(x.toFixed(6)), y: parseFloat(y.toFixed(6)) }];

  for (let i = 0; i < n; i++) {
    y = y + h * f(x, y);
    x = x + h;
    results.push({ x: parseFloat(x.toFixed(6)), y: parseFloat(y.toFixed(6)) });
  }

  return results;
}
