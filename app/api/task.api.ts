import api from "../services/api";

export const taskApi = {
  getAllQuiz: (difficulty?: "EASY" | "MEDIUM" | "HARD") => {
    return api.get("/quiz/all", {
      params: {
        difficulty,
      },
    });
  },
};
