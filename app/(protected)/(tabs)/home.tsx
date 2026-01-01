import TaskCard from "@/components/home/TaskCard";
import BalanceCard from "@/components/wallet/BalanceCard";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function HomeScreen() {
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const balance = useSelector((state: RootState) => state.wallet.balance);

  const featuredTasks = tasks.slice(0, 3);
  const availableTasks = tasks.slice(3);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.greeting}>Good morning! 👋</Text>
        <Text style={styles.username}>John Doe</Text>

        <BalanceCard balance={balance} />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Tasks</Text>
            <Text style={styles.seeAll}>See All</Text>
          </View>
          <FlatList
            data={featuredTasks}
            renderItem={({ item }) => <TaskCard task={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.taskList}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Tasks</Text>
            <Text style={styles.taskCount}>{availableTasks.length} tasks</Text>
          </View>
          {availableTasks.map((task) => (
            <TaskCard key={task.id} task={task} style={styles.taskCard} />
          ))}
        </View>
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
  greeting: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 4,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 24,
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
  },
  seeAll: {
    color: "#6366F1",
    fontWeight: "600",
  },
  taskCount: {
    color: "#6B7280",
    fontSize: 14,
  },
  taskList: {
    paddingRight: 16,
  },
  taskCard: {
    marginBottom: 12,
  },
});
