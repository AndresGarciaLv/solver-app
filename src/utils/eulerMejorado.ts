export function eulerMejorado(
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
    const y_pred = y + h * f(x, y);
    const f_pred = f(x + h, y_pred);
    y = y + (h / 2) * (f(x, y) + f_pred);
    x = x + h;
    results.push({ x: parseFloat(x.toFixed(6)), y: parseFloat(y.toFixed(6)) });
  }

  return results;
}
