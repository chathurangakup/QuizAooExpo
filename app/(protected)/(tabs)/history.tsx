import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function HistoryScreen() {
  const [activeTab, setActiveTab] = useState<
    "all" | "completed" | "pending" | "cancelled"
  >("all");
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const transactions = useSelector(
    (state: RootState) => state.wallet.transactions
  );

  const tabs = [
    { id: "all", label: "All" },
    { id: "completed", label: "Completed" },
    { id: "pending", label: "Pending" },
    { id: "cancelled", label: "Cancelled" },
  ];

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "all") return true;
    return task.status === activeTab;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Activity History</Text>

        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.activeTab]}
              onPress={() => setActiveTab(tab.id as any)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.id && styles.activeTabText,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{tasks.length}</Text>
            <Text style={styles.statLabel}>Total Tasks</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              $
              {tasks
                .filter((t) => t.status === "completed")
                .reduce((sum, task) => sum + task.reward, 0)}
            </Text>
            <Text style={styles.statLabel}>Total Earned</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {tasks.filter((t) => t.status === "completed").length}
            </Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>

        <View style={styles.historyList}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          {filteredTasks.slice(0, 10).map((task) => (
            <View key={task.id} style={styles.historyItem}>
              <View style={styles.taskInfo}>
                <View style={styles.taskIcon}>
                  <Text style={styles.taskIconText}>📝</Text>
                </View>
                <View>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskDate}>{task.createdAt}</Text>
                </View>
              </View>
              <View style={styles.taskStatus}>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        task.status === "completed"
                          ? "#ECFDF5"
                          : task.status === "pending"
                          ? "#FEF3C7"
                          : "#FEE2E2",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color:
                          task.status === "completed"
                            ? "#065F46"
                            : task.status === "pending"
                            ? "#92400E"
                            : "#991B1B",
                      },
                    ]}
                  >
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </Text>
                </View>
                <Text style={styles.taskReward}>+${task.reward}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.loadMoreButton}>
          <Text style={styles.loadMoreText}>Load More</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingTop: 40,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 24,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "#6366F1",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  activeTabText: {
    color: "white",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  historyList: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  taskInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  taskIconText: {
    fontSize: 20,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
  },
  taskDate: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 2,
  },
  taskStatus: {
    alignItems: "flex-end",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  taskReward: {
    fontSize: 16,
    fontWeight: "600",
    color: "#10B981",
  },
  loadMoreButton: {
    backgroundColor: "#6366F1",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
  },
  loadMoreText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
