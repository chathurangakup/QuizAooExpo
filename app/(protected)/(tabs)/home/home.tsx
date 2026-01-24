import { RootState } from "@/app/store/rootReducer";
import { fetchQuizzes } from "@/app/store/task/task.thunks";
import SearchBar from "@/components/home/SearchBar";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const difficulties = [
  { label: "Easy", value: "EASY" },
  { label: "Medium", value: "MEDIUM" },
  { label: "Hard", value: "HARD" },
] as const;

export default function HomeScreen() {
  const dispatch = useDispatch<any>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { tasks, loading } = useSelector((state: RootState) => state.task);

  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "EASY" | "MEDIUM" | "HARD"
  >("EASY");

  useEffect(() => {
    dispatch(fetchQuizzes("EASY"));
  }, []);

  // console.log("Selected Difficulty:", tasks);

  // console.log("Tasks:", tasks);
  function DifficultyButton({
    label,
    value,
  }: {
    label: string;
    value: "EASY" | "MEDIUM" | "HARD";
  }) {
    const isActive = selectedDifficulty === value;

    return (
      <TouchableOpacity
        style={[styles.levelButton, isActive && styles.activeLevelButton]}
        onPress={() => {
          setSelectedDifficulty(value);
          dispatch(fetchQuizzes(value));
        }}
      >
        <Text style={[styles.levelText, isActive && styles.activeLevelText]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }

  function QuizCard({ item }: { item: any }) {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => router.push(`/home/quiz/${item.id}`)}
      >
        <Image
          source={{ uri: encodeURI(item.image_url) }}
          style={styles.cardImage}
        />
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.cardSub}>
          {item.estimatedTime} • {item.reward} coins
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {/* 🔵 Blue Header */}
      <View style={styles.header}>
        <View style={styles.row}>
          <Text style={styles.hello}>Hello </Text>
          <Text style={styles.hello}>{user?.user.name ?? "User"} 👋</Text>
        </View>
        <Text style={styles.subtitle}>Let’s test your knowledge</Text>
        <SearchBar />
      </View>

      {/* ⚪ White Layer */}
      <View style={styles.whiteLayer}>
        <View style={styles.buttonRow}>
          {difficulties.map((level) => (
            <DifficultyButton
              key={level.value}
              label={level.label}
              value={level.value}
            />
          ))}
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.column}
          renderItem={({ item }) => <QuizCard item={item} />}
          showsVerticalScrollIndicator={false}
          refreshing={loading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C58F2",
    paddingTop: 40,
  },
  cardImage: {
    width: "100%",
    height: 90,
    borderRadius: 12,
    marginBottom: 8,
  },

  activeLevelButton: {
    backgroundColor: "#1C58F2",
  },

  activeLevelText: {
    color: "#fff",
  },

  header: {
    padding: 20,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  hello: {
    fontSize: 18,
    color: "#fff",
  },

  subtitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 8,
  },

  whiteLayer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    marginTop: 24,
    flex: 1,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  levelButton: {
    backgroundColor: "#EEF2FF",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
  },

  levelText: {
    fontWeight: "600",
    color: "#1C58F2",
  },

  column: {
    justifyContent: "space-between",
  },

  card: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    width: "48%",
  },

  cardTitle: {
    fontWeight: "700",
    fontSize: 16,
  },

  cardSub: {
    color: "#6B7280",
    marginTop: 4,
  },
});
