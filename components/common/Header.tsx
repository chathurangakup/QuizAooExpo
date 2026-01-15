import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../app/theme/colors";

interface HeaderProps {
  progress?: number;
  onBack: () => void;
  hideProgress?: boolean;

  title?: string; // ← add this
  avatarUrl?: string; // ← add this
}

export default function Header({
  progress,
  onBack,
  hideProgress,
  title,
  avatarUrl,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      {/* Left: Arrow + Title */}
      <View style={styles.left}>
        <Pressable onPress={onBack} hitSlop={10}>
          <Ionicons name="arrow-back" size={24} color={colors.gray[700]} />
        </Pressable>

        {title && <Text style={styles.title}>{title}</Text>}
      </View>

      {/* Progress (unchanged) */}
      {hideProgress ? null : (
        <View style={styles.progressWrapper}>
          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min((progress ?? 0) * 100, 100)}%` },
              ]}
            />
          </View>
        </View>
      )}

      {/* Right: Profile Icon */}
      {avatarUrl ? (
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      ) : (
        <View style={styles.avatarFallback}>
          <Ionicons name="person" size={18} color={colors.gray[600]} />
        </View>
      )}
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

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.background.light,
  },

  progressWrapper: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
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

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: "auto",
  },

  avatarFallback: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.gray[200],
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
  },
});
