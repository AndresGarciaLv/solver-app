export function eulerMejorado(
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
    const y_pred = y + h * f(x, y); // Predicción con Euler Simple
    const f_pred = f(x + h, y_pred); // Evaluación en el nuevo punto
    y = y + (h / 2) * (f(x, y) + f_pred); // Corrección con el promedio
    x = x + h;
    results.push({ x, y });
  }

  return results;
}
