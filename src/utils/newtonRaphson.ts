export function newtonRaphson(
  f: (x: number) => number,
  df: (x: number) => number,
  x0: number,
  tol: number = 1e-6,
  maxIter: number = 100
): number | null {
  let x = x0;
  let iter = 0;

  while (iter < maxIter) {
    const fx = f(x);
    const dfx = df(x);

    if (Math.abs(dfx) < 1e-10) {
      console.error("Derivada cercana a cero, el método no converge.");
      return null;
    }

    const x1 = x - fx / dfx;

    if (Math.abs(x1 - x) < tol) {
      return x1;
    }

    x = x1;
    iter++;
  }

  console.error("El método no convergió en el número máximo de iteraciones.");
  return null;
}
