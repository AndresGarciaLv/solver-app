import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000", // Ajusta si tu backend corre en otro host/puerto
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  // Endpoint existente para ecuaciones simples (y' = f(x,y))
  solveExacta(equation: string, x0: number, y0: number, h: number, points: number) {
    return apiClient.post("/solve-exacta", { equation, x0, y0, h, points });
  },

  // Nuevo endpoint para sistemas de 2 ecuaciones: y' = eqy, z' = eqz
  solveSystem(eqy: string, eqz: string, x0: number, y0: number, z0: number, h: number, points: number) {
    return apiClient.post("/solve-system", { eqy, eqz, x0, y0, z0, h, points });
  },
};
