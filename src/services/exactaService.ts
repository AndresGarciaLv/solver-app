import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  solveExacta(equation: string, x0: number, y0: number, h: number, points: number) {
    return apiClient.post('/solve-exacta', { equation, x0, y0, h, points });
  },
};
