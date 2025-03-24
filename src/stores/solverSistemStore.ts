// solverSistemStore.ts
import { defineStore } from "pinia";
import { eulerSistema } from "@/utils/eulerSistema";
import { eulerMejoradoSistema } from "@/utils/eulerMejoradoSistema";
import { rungeKuttaSistema } from "@/utils/rungeKuttaSistema";

interface Result {
  x: number;
  y: number;
  z: number;
}

interface SolverState {
  equations: { f1: string; f2: string };
  results: Result[];
  generalSolution: Result[];
  eulerResults: Result[];
  eulerMejoradoResults: Result[];
  rungeKuttaResults: Result[];
  generalSolutionExpressionY: string;
  generalSolutionExpressionZ: string;
}

export const useSolverSistemStore = defineStore("solverSistem", {
  state: (): SolverState => ({
    equations: { f1: "", f2: "" },
    results: [],
    generalSolution: [],
    eulerResults: [],
    eulerMejoradoResults: [],
    rungeKuttaResults: [],
    generalSolutionExpressionY: "",
    generalSolutionExpressionZ: "",
  }),
  actions: {
    setEquations(f1: string, f2: string) {
      this.equations = { f1, f2 };
    },
    setResults(res: Result[]) {
      this.results = res;
    },
    setGeneralSolution(res: Result[]) {
      this.generalSolution = res;
    },
    setEulerResults(res: Result[]) {
      this.eulerResults = res;
    },
    setEulerMejoradoResults(res: Result[]) {
      this.eulerMejoradoResults = res;
    },
    setRungeKuttaResults(res: Result[]) {
      this.rungeKuttaResults = res;
    },
    setGeneralSolutionExpressionY(expr: string) {
      this.generalSolutionExpressionY = expr;
    },
    setGeneralSolutionExpressionZ(expr: string) {
      this.generalSolutionExpressionZ = expr;
    },
    solveEuler(f1: (x: number, y: number, z: number) => number, f2: (x: number, y: number, z: number) => number, x0: number, y0: number, z0: number, h: number, n: number) {
      this.setEulerResults(eulerSistema(f1, f2, x0, y0, z0, h, n));
    },
    solveEulerMejorado(f1: (x: number, y: number, z: number) => number, f2: (x: number, y: number, z: number) => number, x0: number, y0: number, z0: number, h: number, n: number) {
      this.setEulerMejoradoResults(eulerMejoradoSistema(f1, f2, x0, y0, z0, h, n));
    },
    solveRungeKutta(f1: (x: number, y: number, z: number) => number, f2: (x: number, y: number, z: number) => number, x0: number, y0: number, z0: number, h: number, n: number) {
      this.setRungeKuttaResults(rungeKuttaSistema(f1, f2, x0, y0, z0, h, n));
    }
  }
});
