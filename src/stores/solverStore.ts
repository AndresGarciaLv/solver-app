// solverStore.ts
import { defineStore } from "pinia";

interface Result {
  x: number;
  y: number;
}

interface SolverState {
  equation: string;
  results: Result[];
  generalSolution: Result[];
  eulerResults: Result[];
  eulerMejoradoResults: Result[];
  rungeKuttaResults: Result[];
}

export const useSolverStore = defineStore("solver", {
  state: (): SolverState => ({
    equation: "",
    results: [],
    generalSolution: [],
    eulerResults: [],
    eulerMejoradoResults: [],
    rungeKuttaResults: [],
  }),
  actions: {
    setEquation(eq: string) {
      this.equation = eq;
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
  },
});
