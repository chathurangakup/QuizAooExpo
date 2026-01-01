import PrimaryButton from "@/components/common/PrimaryButton";
import StatusBadge from "@/components/common/StatusBadge";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function KYCScreen() {
  const [kycStatus, setKycStatus] = useState<
    "pending" | "verified" | "rejected"
  >("pending");

  const kycSteps = [
    { id: 1, title: "Basic Information", completed: true },
    { id: 2, title: "ID Verification", completed: false },
    { id: 3, title: "Selfie Verification", completed: false },
    { id: 4, title: "Address Proof", completed: false },
  ];

  const handleStartKYC = () => {
    // Mock KYC process
    console.log("Starting KYC...");
    setKycStatus("verified");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Identity Verification</Text>
          <StatusBadge status={kycStatus} />
        </View>

        <Text style={styles.description}>
          Complete KYC verification to unlock all features and increase your
          earning limits
        </Text>

        <View style={styles.requirementsCard}>
          <Text style={styles.requirementsTitle}>You'll need:</Text>
          <View style={styles.requirementItem}>
            <Text style={styles.requirementDot}>•</Text>
            <Text style={styles.requirementText}>Government-issued ID</Text>
          </View>
          <View style={styles.requirementItem}>
            <Text style={styles.requirementDot}>•</Text>
            <Text style={styles.requirementText}>Clear selfie</Text>
          </View>
          <View style={styles.requirementItem}>
            <Text style={styles.requirementDot}>•</Text>
            <Text style={styles.requirementText}>Proof of address</Text>
          </View>
        </View>

        <View style={styles.stepsContainer}>
          {kycSteps.map((step) => (
            <View key={step.id} style={styles.stepRow}>
              <View
                style={[
                  styles.stepCircle,
                  step.completed && styles.stepCircleCompleted,
                ]}
              >
                {step.completed ? (
                  <Text style={styles.stepCheck}>✓</Text>
                ) : (
                  <Text style={styles.stepNumber}>{step.id}</Text>
                )}
              </View>
              <Text style={styles.stepTitle}>{step.title}</Text>
              {step.completed && (
                <Text style={styles.stepCompletedText}>Completed</Text>
              )}
            </View>
          ))}
        </View>

        {kycStatus === "verified" ? (
          <View style={styles.verifiedContainer}>
            <Text style={styles.verifiedTitle}>🎉 Verification Complete!</Text>
            <Text style={styles.verifiedText}>
              Your identity has been verified. You can now access all features.
            </Text>
            <PrimaryButton
              title="Continue to App"
              onPress={() => router.replace("/(protected)/(tabs)/home")}
            />
          </View>
        ) : (
          <PrimaryButton
            title="Start Verification"
            onPress={handleStartKYC}
            style={styles.verifyButton}
          />
        )}

        <Text style={styles.securityNote}>
          🔒 Your information is secure and encrypted. We never share your data
          with third parties.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 40,
  },
  content: {
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
  },
  description: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 24,
    marginBottom: 24,
  },
  requirementsCard: {
    backgroundColor: "#F3F4F6",
    padding: 20,
    borderRadius: 12,
    marginBottom: 32,
  },
  requirementsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  requirementDot: {
    color: "#6366F1",
    marginRight: 12,
    fontSize: 16,
  },
  requirementText: {
    fontSize: 16,
    color: "#4B5563",
  },
  stepsContainer: {
    marginBottom: 32,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  stepCircleCompleted: {
    backgroundColor: "#10B981",
  },
  stepNumber: {
    color: "#6B7280",
    fontWeight: "600",
  },
  stepCheck: {
    color: "white",
    fontWeight: "bold",
  },
  stepTitle: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
  },
  stepCompletedText: {
    color: "#10B981",
    fontWeight: "600",
  },
  verifiedContainer: {
    backgroundColor: "#ECFDF5",
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  verifiedTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#065F46",
    marginBottom: 8,
  },
  verifiedText: {
    fontSize: 16,
    color: "#065F46",
    marginBottom: 20,
    lineHeight: 24,
  },
  verifyButton: {
    marginBottom: 24,
  },
  securityNote: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },
});
