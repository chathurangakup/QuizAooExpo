import { RootState } from "@/app/store/rootReducer";
import { fetchQuizById, submitQuiz } from "@/app/store/task/task.thunks";
import { QuizTask } from "@/app/store/task/task.types";
import AppModal from "@/components/common/AppModal";
import Header from "@/components/common/Header";
import LottieLoader from "@/components/common/LottieLoader";
import PrimaryButton from "@/components/common/PrimaryButton";
import ProgressBar from "@/components/home/ProgressBar";
import { images } from "@/constants/images";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function QuestionsScreen() {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  const dispatch = useDispatch<any>();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [modalTriggered, setModalTriggered] = useState(false); // ✅ prevent multiple triggers

  const selectedQuiz: QuizTask | null = useSelector(
    (state: RootState) => state.task.selectedTask
  );
  const { selectedTask, loading } = useSelector(
    (state: RootState) => state.task
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);

  // ✅ Fetch quiz
  useEffect(() => {
    if (quizId) {
      console.log("quizId", quizId);
      dispatch(fetchQuizById(quizId));
    }
  }, [quizId, dispatch]);

  // ✅ Restore selected option when index OR answers change
  useEffect(() => {
    setSelectedOption(answers[currentIndex] ?? null);
  }, [currentIndex, answers]);

  // ✅ Safe guards AFTER hooks
  if (!selectedQuiz || !selectedQuiz.questions?.length) {
    return (
      <View style={[styles.screen, styles.center]}>
        <Text style={{ color: "#fff" }}>Loading Quiz...</Text>
      </View>
    );
  }

  const currentQuestion = selectedQuiz.questions[currentIndex];
  const isLastQuestion = currentIndex === selectedQuiz.questions.length - 1;

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = async () => {
    if (!selectedOption) return;

    // Build updated answers immediately
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = selectedOption;
    setAnswers(updatedAnswers);

    if (!isLastQuestion) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      //if (modalTriggered) return; // prevent multiple triggers

      try {
        console.log("updatedAns", updatedAnswers);
        setShowSuccessModal(true);
        const response = await dispatch(
          submitQuiz({ quizId, answers: updatedAnswers })
        ).unwrap();

        if (response?.message) {
          // ✅ Show success modal

          setShowSuccessModal(true);

          console.log("Quiz submitted successfully:", response);
          // Optional iOS safety delay
        }
      } catch (error: any) {
        console.error("Submit quiz failed:", error);
      } finally {
        //setSubmitting(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <View style={styles.screen}>
      <View>
        <AppModal
          image={images.success}
          bgImage={images.bgsuccess}
          visible={showSuccessModal}
          title="Successful 🎉"
          description="Please wait a moment, we are preparing for you..."
          buttonText="Back to Home"
          onClose={() => setShowSuccessModal(false)} // ✅ properly closes modal
          onPress={() => {
            setShowSuccessModal(false);
            router.replace("/(protected)/(tabs)/home/home"); // ✅ back to home
          }}
        />
      </View>

      <Header title="Questions" onBack={() => router.back()} hideProgress />
      <LottieLoader visible={loading} />
      <Text>{showSuccessModal}</Text>
      {/* Counter */}

      <Text style={styles.counter}>
        Question {currentIndex + 1} of {selectedQuiz.questions.length}{" "}
        {showSuccessModal.toString()}
      </Text>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          source={images.loginWrite}
          style={styles.loginImage}
          resizeMode="contain"
        />
      </View>

      {/* Progress */}
      <View style={{ paddingHorizontal: 20, marginTop: 8 }}>
        <ProgressBar
          progress={(currentIndex + 1) / selectedQuiz.questions.length}
          height={12}
          fillColor="red"
        />
      </View>

      {/* White Layer */}
      <View style={styles.whiteLayer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.question}>
            <Text style={styles.questionNumber}>{currentIndex + 1}. </Text>
            {currentQuestion.question}
          </Text>

          {currentQuestion.options.map((option: string, idx: number) => {
            const isSelected = selectedOption === option;

            return (
              <View
                style={{ flexDirection: "row", alignItems: "center" }}
                key={idx}
              >
                <Text
                  style={[
                    styles.optionIndex,
                    isSelected && styles.selectedText,
                  ]}
                >
                  {idx + 1}.
                </Text>
                <TouchableOpacity
                  key={idx}
                  style={[styles.option, isSelected && styles.selectedOption]}
                  onPress={() => handleSelectOption(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.selectedText,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>

        {/* Bottom Bar */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            onPress={handlePrevious}
            disabled={currentIndex === 0}
          >
            <Text style={styles.arrow}>⬅</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={[styles.nextButton, !selectedOption && styles.nextDisabled]}
            disabled={!selectedOption}
            onPress={handleNext}
          >
            <Text style={styles.nextText}>
              {isLastQuestion ? "Submit" : "Next"}
            </Text>
          </TouchableOpacity> */}
          <View>
            <PrimaryButton
              title={isLastQuestion ? "Submit" : "Next"}
              onPress={handleNext}
              style={[
                styles.nextButton,
                !selectedOption && styles.nextDisabled,
              ]}
              disabled={!selectedOption}
              variant="secondary"
            />
          </View>
          <TouchableOpacity onPress={handleNext} disabled={!selectedOption}>
            <Text style={styles.arrow}>➡</Text>
          </TouchableOpacity>
        </View>
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

  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  loginImage: {
    width: 220,
    height: 160,
    marginBottom: 16,
    alignContent: "center",
  },

  counter: {
    color: "#fff",
    paddingLeft: 40,
    marginTop: 8,
    fontWeight: "600",
    fontSize: 16,
  },

  whiteLayer: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 20,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
  },

  question: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 40,
    color: "#111827",
  },

  option: {
    backgroundColor: "#F3F4F6",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    width: "90%",
  },

  optionText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1C58F2",
  },
  questionNumber: {
    fontWeight: "700",
    color: "#1C58F2",
  },

  optionSelected: {
    backgroundColor: "#DBEAFE",
    borderWidth: 1,
    borderColor: "#1C58F2",
  },

  optionIndex: {
    fontWeight: "700",
    marginRight: 10,
    color: "#1C58F2",
  },

  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingBottom: 32,
  },

  nextButton: {
    backgroundColor: "#1C58F2",

    paddingVertical: 14,
    borderRadius: 30,
    width: 200,
  },

  nextDisabled: {
    backgroundColor: "#9CA3AF",
  },

  nextText: {
    color: "#fff",
    fontWeight: "700",
  },

  arrow: {
    fontSize: 22,
    backgroundColor: "#E5E7EB",
    padding: 10,
    borderRadius: 30,
  },
  selectedOption: {
    backgroundColor: "#DBEAFE",
    borderWidth: 2,
    borderColor: "#2563EB",
  },

  selectedText: {
    color: "#2563EB",
  },
});
