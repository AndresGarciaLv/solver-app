import { defineStore } from "pinia";

interface Result {
  x: number;
  y: number;
}

interface SolverState {
  equation: string;
  generalSolution: Result[];  // Solución exacta evaluada
  eulerResults: Result[];
  eulerMejoradoResults: Result[];
  rungeKuttaResults: Result[];
  generalSolutionExpression: string; // Expresión simbólica
}

export const useSolverStore = defineStore("solver", {
  state: (): SolverState => ({
    equation: "",
    generalSolution: [],
    eulerResults: [],
    eulerMejoradoResults: [],
    rungeKuttaResults: [],
    generalSolutionExpression: "",
  }),
  actions: {
    setEquation(eq: string) {
      this.equation = eq;
    },
    setGeneralSolution(res: Result[]) {
      this.generalSolution = res;
    },
    setGeneralSolutionExpression(expression: string) {
      this.generalSolutionExpression = expression;
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
