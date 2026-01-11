// app/(protected)/quiz/[quizId].tsx
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function QuizScreen() {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Screen</Text>
      <Text style={styles.sub}>Quiz ID:</Text>
      <Text style={styles.id}>{quizId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
  },
  sub: {
    fontSize: 16,
    color: "#6B7280",
  },
  id: {
    marginTop: 8,
    fontSize: 14,
    color: "#1C58F2",
  },
});
