import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { colors } from "../../app/theme/colors";

interface HeaderProps {
  progress?: number; // value between 0 - 1 (ex: 0.3, 0.6, 1)
  onBack: () => void;
  hideProgress?: boolean;
}

export default function Header({
  progress,
  onBack,
  hideProgress,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <Pressable onPress={onBack} hitSlop={10}>
        <Ionicons name="arrow-back" size={24} color={colors.gray[700]} />
      </Pressable>
      {hideProgress ? null : (
        <View style={styles.progressWrapper}>
          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min(progress! * 100, 100)}%` },
              ]}
            />
          </View>
        </View>
      )}

      {/* Right Spacer (for center alignment) */}
      <View style={{ width: 24 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  /* Progress bar container */
  progressWrapper: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 66,
  },

  progressBackground: {
    width: "100%",
    height: 12,
    backgroundColor: colors.gray[200],
    borderRadius: 6,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: colors.text.primary,
    borderRadius: 6,
  },
});
