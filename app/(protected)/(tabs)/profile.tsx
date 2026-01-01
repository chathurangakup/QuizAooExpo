import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function ProfileScreen() {
  const user = useSelector((state: RootState) => state.auth.user);

  const menuItems = [
    { icon: "person", label: "Edit Profile", color: "#6366F1" },
    { icon: "shield-checkmark", label: "Privacy & Security", color: "#10B981" },
    { icon: "card", label: "Payment Methods", color: "#F59E0B" },
    { icon: "help-circle", label: "Help & Support", color: "#8B5CF6" },
    { icon: "document-text", label: "Terms & Conditions", color: "#EC4899" },
    { icon: "settings", label: "Settings", color: "#6B7280" },
  ];

  const stats = [
    { label: "Tasks Completed", value: "24" },
    { label: "Total Earnings", value: "$156.80" },
    { label: "Current Streak", value: "7 days" },
    { label: "Rating", value: "4.8" },
  ];

  const handleLogout = () => {
    router.replace("/(public)/login");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: "https://via.placeholder.com/100" }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name || "John Doe"}</Text>
            <Text style={styles.profileEmail}>
              {user?.email || "john.doe@example.com"}
            </Text>
            <View style={styles.verificationBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text style={styles.verificationText}>Verified</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View
                style={[
                  styles.menuIcon,
                  { backgroundColor: `${item.color}15` },
                ]}
              >
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={item.color}
                />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={24} color="#EF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0</Text>
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
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 8,
  },
  verificationBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  verificationText: {
    marginLeft: 4,
    color: "#10B981",
    fontWeight: "500",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statItem: {
    width: "48%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  menuSection: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  logoutText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#EF4444",
  },
  version: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 14,
  },
});
