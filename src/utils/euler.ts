export function euler(
  f: (x: number, y: number) => number,
  x0: number,
  y0: number,
  h: number,
  n: number
): Array<{ x: number; y: number }> {
  let x = x0;
  let y = y0;
  const results = [{ x, y }];

  for (let i = 0; i < n; i++) {
    y = y + h * f(x, y);
    x = x + h;
    results.push({ x, y });
  }

  return results;
}
