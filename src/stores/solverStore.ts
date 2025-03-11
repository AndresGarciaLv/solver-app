import { defineStore } from "pinia";

interface Result {
  x: number;
  y: number;
}

interface SolverState {
  equation: string;
  method: "euler" | "eulerMejorado" | "rk4" | "newton";
  results: Result[];
}

export const useSolverStore = defineStore("solver", {
  state: (): SolverState => ({
    equation: "",
    method: "rk4",
    results: [],
  }),
  actions: {
    setEquation(eq: string) {
      this.equation = eq;
      localStorage.setItem("equation", eq);
    },
    setMethod(meth: "euler" | "eulerMejorado" | "rk4" | "newton") {
      this.method = meth;
      localStorage.setItem("method", meth);
    },
    setResults(res: Array<Result | number>) {
      if (this.method === "newton") {
        // Convertimos los resultados de Newton-Raphson en formato { x, y }
        this.results = res.map((value, index) => ({
          x: index,
          y: typeof value === "number" ? value : 0,
        }));
      } else {
        this.results = res as Result[];
      }
      localStorage.setItem("results", JSON.stringify(this.results));
    },
  },
});
