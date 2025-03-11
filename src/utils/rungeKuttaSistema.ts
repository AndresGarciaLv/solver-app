export function rungeKuttaSistema(
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
    const k1_1 = h * f1(x, y, z);
    const k1_2 = h * f2(x, y, z);

    const k2_1 = h * f1(x + h / 2, y + k1_1 / 2, z + k1_2 / 2);
    const k2_2 = h * f2(x + h / 2, y + k1_1 / 2, z + k1_2 / 2);

    const k3_1 = h * f1(x + h / 2, y + k2_1 / 2, z + k2_2 / 2);
    const k3_2 = h * f2(x + h / 2, y + k2_1 / 2, z + k2_2 / 2);

    const k4_1 = h * f1(x + h, y + k3_1, z + k3_2);
    const k4_2 = h * f2(x + h, y + k3_1, z + k3_2);

    y += (k1_1 + 2 * k2_1 + 2 * k3_1 + k4_1) / 6;
    z += (k1_2 + 2 * k2_2 + 2 * k3_2 + k4_2) / 6;
    x += h;

    results.push({ x: parseFloat(x.toFixed(6)), y: parseFloat(y.toFixed(6)), z: parseFloat(z.toFixed(6)) });
  }

  return results;
}
