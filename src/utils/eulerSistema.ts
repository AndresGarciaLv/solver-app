export function eulerSistema(
  f1: (x: number, y: number, z: number) => number,
  f2: (x: number, y: number, z: number) => number,
  x0: number,
  y0: number,
  z0: number,
  h: number,
  n: number
): Array<{ x: number; y: number; z: number }> {
  let x = x0;
  let y = y0;
  let z = z0;
  const results = [{ x: parseFloat(x.toFixed(6)), y: parseFloat(y.toFixed(6)), z: parseFloat(z.toFixed(6)) }];

  for (let i = 0; i < n; i++) {
    y = y + h * f1(x, y, z);
    z = z + h * f2(x, y, z);
    x = x + h;
    results.push({ x: parseFloat(x.toFixed(6)), y: parseFloat(y.toFixed(6)), z: parseFloat(z.toFixed(6)) });
  }

  return results;
}
