import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { taskService } from "../services/task.service";

/* ================= TYPES ================= */

export type Difficulty = "easy" | "medium" | "hard";

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  reward: number;
  difficulty: Difficulty;
  status: "pending" | "completed" | "cancelled";
  estimatedTime: string;
  createdAt: string;
  image_url?: string;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  selectedTask: Task | null;
}

/* ================= INITIAL STATE ================= */

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  selectedTask: null,
};

/* ================= MAPPER ================= */

const mapQuizToTask = (quiz: any): Task => ({
  id: quiz.id,
  title: quiz.title,
  description: quiz.description,
  category: "Quiz",
  reward: Number(quiz.reward_amount),
  difficulty: quiz.difficulty.toLowerCase() as Difficulty,
  status: "pending",
  estimatedTime: `${quiz.total_questions} min`,
  createdAt: quiz.created_at,
  image_url: quiz.image_url,
});

/* ================= THUNK ================= */

export const fetchQuizzes = createAsyncThunk<
  Task[],
  "EASY" | "MEDIUM" | "HARD",
  { rejectValue: string }
>("task/fetchQuizzes", async (difficulty, { rejectWithValue }) => {
  try {
    const data = await taskService.getQuiz(difficulty);
    console.log("Fetched quizzes data:", data);
    return data.quizzes.map(mapQuizToTask);
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to fetch quizzes"
    );
  }
});

/* ================= SLICE ================= */

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    selectTask: (state, action: PayloadAction<string>) => {
      state.selectedTask =
        state.tasks.find((task) => task.id === action.payload) || null;
    },
    clearSelectedTask: (state) => {
      state.selectedTask = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

/* ================= EXPORTS ================= */

export const { selectTask, clearSelectedTask } = taskSlice.actions;
export default taskSlice.reducer;
