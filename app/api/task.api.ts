import api from "../services/api";

export const taskApi = {
  getAllQuiz: (difficulty?: "EASY" | "MEDIUM" | "HARD") => {
    return api.get("/quiz/all", {
      params: {
        difficulty,
      },
    });
  },
  getQuestionsByQuizId: (quizId: string) => {
    return api.get(`/qoptions/quiz/${quizId}`);
  },

  submitQuiz: (quizId: string, answers: string[]) => {
    return api.post(`/submitquiz/${quizId}/submit`, { answers });
  },

  getQuizSubmissions: () => {
    return api.get("/submitquiz/getsubmitquiz");
  },
};
