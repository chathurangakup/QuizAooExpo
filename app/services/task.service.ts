import { Task } from "../store/task.slice";

export const taskService = {
  getTasks: async () => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockTasks: Task[] = [
          {
            id: "1",
            title: "Watch and rate a video",
            description:
              "Watch this 2-minute video about our new product and provide your feedback.",
            category: "Video",
            reward: 1.5,
            difficulty: "easy",
            status: "pending",
            estimatedTime: "5 min",
            createdAt: "2024-01-15",
          },
          // ... more tasks
        ];
        resolve({ data: mockTasks });
      }, 1000);
    });

    // Real implementation:
    // return api.get('/tasks');
  },

  getTaskById: async (id: string) => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            id,
            title: "Sample Task",
            description: "Task description",
            reward: 5.0,
            // ... other fields
          },
        });
      }, 500);
    });

    // Real implementation:
    // return api.get(`/tasks/${id}`);
  },

  completeTask: async (taskId: string) => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: { success: true, reward: 5.0 },
        });
      }, 1000);
    });

    // Real implementation:
    // return api.post(`/tasks/${taskId}/complete`);
  },

  submitTask: async (taskId: string, data: any) => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: { success: true },
        });
      }, 1000);
    });

    // Real implementation:
    // return api.post(`/tasks/${taskId}/submit`, data);
  },
};
