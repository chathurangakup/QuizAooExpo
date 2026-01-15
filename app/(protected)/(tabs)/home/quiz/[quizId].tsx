import { RootState } from "@/app/store/rootReducer";
import Header from "@/components/common/Header";
import { router, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

export default function QuizScreen() {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();

  const { tasks } = useSelector((state: RootState) => state.task);

  const quiz = tasks.find((q) => q.id === quizId);

  if (!quiz) {
    return null;
  }

  return (
    <View style={styles.screen}>
      {/* Header */}
      <Header title="Quiz" onBack={() => router.back()} hideProgress />

      {/* Title + Reward */}
      <View style={styles.titleRow}>
        <Text style={styles.quizTitle}>{quiz.title}</Text>
        <View style={styles.rewardBadge}>
          <Text style={styles.rewardText}>🎁 {quiz.reward}</Text>
        </View>
      </View>

      {/* White Layer */}
      <View style={styles.whiteLayer}>
        <Text style={styles.title}>Brief explanation about this quiz</Text>
        <View style={styles.infoRow}>
          <Text style={styles.info}>⏱ {quiz.estimatedTime}</Text>
          <Text style={styles.info}>💰 {quiz.reward} Coins</Text>
          <Text style={styles.info}>⚡ {quiz.difficulty}</Text>
        </View>
        <Image source={{ uri: quiz.image_url }} style={styles.image} />
        <Text style={styles.title}>
          Please read the text below carefully so you can understand it
        </Text>
        <Text style={styles.description}>{quiz.description}</Text>

        {/* Next Button */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() =>
            router.push({
              pathname: "/(protected)/(tabs)/home/quiz/questions",
              params: { quizId },
            })
          }
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#1C58F2",
    paddingTop: 40,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 8,
  },

  quizTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111827",
  },

  rewardBadge: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  rewardText: {
    fontWeight: "700",
    color: "#1C58F2",
  },

  whiteLayer: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 20,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
  },

  image: {
    width: "100%",
    height: 160,
    borderRadius: 16,
    marginBottom: 16,
  },

  description: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
    marginBottom: 16,
  },

  infoRow: {
    marginBottom: 24,
  },

  info: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 32,
  },

  nextButton: {
    marginTop: "auto",
    backgroundColor: "#1C58F2",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },

  nextText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
