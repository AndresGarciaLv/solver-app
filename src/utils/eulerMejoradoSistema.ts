export function eulerMejoradoSistema(
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
    const y_pred = y + h * f1(x, y, z);
    const z_pred = z + h * f2(x, y, z);

    const f1_pred = f1(x + h, y_pred, z_pred);
    const f2_pred = f2(x + h, y_pred, z_pred);

    y = y + (h / 2) * (f1(x, y, z) + f1_pred);
    z = z + (h / 2) * (f2(x, y, z) + f2_pred);
    x = x + h;
    results.push({ x: parseFloat(x.toFixed(6)), y: parseFloat(y.toFixed(6)), z: parseFloat(z.toFixed(6)) });
  }

  return results;
}
