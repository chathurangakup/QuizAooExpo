import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  reward: number;
  difficulty: "easy" | "medium" | "hard";
  status: "pending" | "completed" | "cancelled";
  estimatedTime: string;
  createdAt: string;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  selectedTask: Task | null;
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Watch and rate a video",
    description:
      "Watch this 2-minute video about our new product and provide your feedback.",
    category: "Video",
    reward: 1.5,
    difficulty: "easy",
    status: "completed",
    estimatedTime: "5 min",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Install and test new app",
    description:
      "Install our new mobile app, explore features, and complete a short survey.",
    category: "App Testing",
    reward: 5.0,
    difficulty: "medium",
    status: "pending",
    estimatedTime: "15 min",
    createdAt: "2024-01-16",
  },
  {
    id: "3",
    title: "Social media share",
    description: "Share our promotional post on your social media account.",
    category: "Social Media",
    reward: 2.5,
    difficulty: "easy",
    status: "pending",
    estimatedTime: "3 min",
    createdAt: "2024-01-16",
  },
  {
    id: "4",
    title: "Website usability test",
    description:
      "Navigate through our website and report any issues or suggestions.",
    category: "Website",
    reward: 8.0,
    difficulty: "hard",
    status: "pending",
    estimatedTime: "25 min",
    createdAt: "2024-01-17",
  },
  {
    id: "5",
    title: "Product review",
    description: "Purchase and review our new product on Amazon.",
    category: "Review",
    reward: 10.0,
    difficulty: "medium",
    status: "completed",
    estimatedTime: "20 min",
    createdAt: "2024-01-14",
  },
  {
    id: "6",
    title: "Survey about shopping habits",
    description:
      "Complete a 10-question survey about your online shopping preferences.",
    category: "Survey",
    reward: 3.0,
    difficulty: "easy",
    status: "pending",
    estimatedTime: "8 min",
    createdAt: "2024-01-18",
  },
];

const initialState: TaskState = {
  tasks: mockTasks,
  loading: false,
  selectedTask: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    fetchTasks: (state) => {
      state.loading = true;
    },
    fetchTasksSuccess: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      state.loading = false;
    },
    fetchTasksFailure: (state) => {
      state.loading = false;
    },
    selectTask: (state, action: PayloadAction<string>) => {
      state.selectedTask =
        state.tasks.find((task) => task.id === action.payload) || null;
    },
    completeTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.status = "completed";
      }
    },
    updateTask: (state, action: PayloadAction<Partial<Task>>) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload };
      }
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.unshift(action.payload);
    },
  },
});

export const {
  fetchTasks,
  fetchTasksSuccess,
  fetchTasksFailure,
  selectTask,
  completeTask,
  updateTask,
  addTask,
} = taskSlice.actions;

export default taskSlice.reducer;
