export function rungeKutta(
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
    const k1 = h * f(x, y);
    const k2 = h * f(x + h / 2, y + k1 / 2);
    const k3 = h * f(x + h / 2, y + k2 / 2);
    const k4 = h * f(x + h, y + k3);

    y += (k1 + 2 * k2 + 2 * k3 + k4) / 6;
    x += h;
    results.push({ x, y });
  }

  return results;
}
