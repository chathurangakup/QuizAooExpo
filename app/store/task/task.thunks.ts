// store/task/task.thunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { taskService } from "../../services/task.service";
import { mapQuizToQuizTask, mapQuizToTask } from "./task.mappers";
import { QuizSubmission, QuizTask, Task } from "./task.types";

/* ---------- Fetch All Quizzes ---------- */
export const fetchQuizzes = createAsyncThunk<
  Task[],
  "EASY" | "MEDIUM" | "HARD",
  { rejectValue: string }
>("task/fetchQuizzes", async (difficulty, { rejectWithValue }) => {
  try {
    const data = await taskService.getQuiz(difficulty);
    return data.quizzes?.map(mapQuizToTask) ?? [];
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to fetch quizzes"
    );
  }
});

/* ---------- Fetch Quiz By ID ---------- */
export const fetchQuizById = createAsyncThunk<
  QuizTask,
  string,
  { rejectValue: string }
>("task/fetchQuizById", async (quizId, { rejectWithValue }) => {
  try {
    const data = await taskService.getQuizById(quizId);
    return mapQuizToQuizTask(data);
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to fetch quiz"
    );
  }
});

export const submitQuiz = createAsyncThunk<
  any, // you can type the response if needed
  { quizId: string; answers: string[] },
  { rejectValue: string }
>("task/submitQuiz", async ({ quizId, answers }, { rejectWithValue }) => {
  try {
    const data = await taskService.submitQuiz(quizId, answers);
    return data;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to submit quiz"
    );
  }
});

export const fetchQuizSubmissions = createAsyncThunk<
  QuizSubmission[],
  void,
  { rejectValue: string }
>("task/fetchQuizSubmissions", async (_, { rejectWithValue }) => {
  try {
    const data = await taskService.getQuizSubmissions();
    return data.submissions; // 👈 matches API response
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to fetch quiz submissions"
    );
  }
});
