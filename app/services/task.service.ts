import { taskApi } from "../api/task.api";

export const taskService = {
  getQuiz: async (difficulty?: "EASY" | "MEDIUM" | "HARD") => {
    const response = await taskApi.getAllQuiz(difficulty);
    return response.data;
  },
};
