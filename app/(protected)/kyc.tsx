import PrimaryButton from "@/components/common/PrimaryButton";
import StatusBadge from "@/components/common/StatusBadge";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
// import { storage } from "../config/firebase";

import { router } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../config/superbase";

export default function KYCScreen() {
  const [kycStatus, setKycStatus] = useState<
    "pending" | "verified" | "rejected"
  >("pending");
  const [idType, setIdType] = useState<"national_id" | "passport" | null>(null);

  const [idFront, setIdFront] = useState<string | null>(null);
  const [idBack, setIdBack] = useState<string | null>(null);
  const [selfie, setSelfie] = useState<string | null>(null);
  const [address, setAddress] = useState("");

  const canStartVerification =
    !!idType && !!idFront && !!idBack && !!selfie && address.trim().length > 5;

  const kycSteps = [
    { id: 1, title: "ID Verification", completed: false },
    { id: 2, title: "Selfie Verification", completed: false },
    { id: 3, title: "Address Proof", completed: false },
  ];

  const uploadImage = async (uri: string, path: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const { data, error } = await supabase.storage
      .from("kyc-bucket") // replace with your bucket name
      .upload(path, blob, {
        cacheControl: "3600",
        upsert: true,
        contentType: "image/jpeg",
      });

    if (error) throw error;

    const { data: publicData } = supabase.storage
      .from("kyc-bucket")
      .getPublicUrl(path);

    return publicData.publicUrl; // ✅ public URL
  };

  const handleStartKYC = async () => {
    if (!idFront || !idBack || !selfie || !idType || !address) return;
    console.log(
      "Starting KYC submission...",
      idBack,
      idFront,
      selfie,
      address,
      idType
    );
    try {
      // Upload images
      const frontUrl = await uploadImage(idFront, `${idType}_front.jpeg`);
      const backUrl = await uploadImage(idBack, `${idType}_back.jpeg`);
      const selfieUrl = await uploadImage(selfie, `selfie.jpeg`);
      const body = {
        user_id: "18bc89c0-b23a-40fc-9fbf-04ba64c0d9d5",
        document_type: idType.toUpperCase(),
        document_image_front_url: frontUrl,
        document_image_back_url: backUrl,
        selfie_image_url: selfieUrl,
        status: "PENDING",
        address,
        review_note: "Initial submission",
      };

      console.log(body);

      // Send to your backend API:
      // await fetch("https://your-api", {...})
    } catch (e) {
      console.error(e);
      alert("Upload failed");
    }
  };

  // const handleStartKYC = async () => {
  //   if (!idFront || !idBack || !selfie || !address || !idType) return;

  //   try {
  //     console.log("Starting KYC...");

  //     // Helper function to upload an image and get its public URL
  //     const uploadImage = async (uri: string, filename: string) => {
  //       const response = await fetch(uri); // fetch the file from local URI
  //       const blob = await response.blob(); // convert to blob for firebase
  //       const storageRef = ref(storage, `kyc/${filename}`);
  //       const uploadTask = await uploadBytesResumable(storageRef, blob);
  //       const url = await getDownloadURL(uploadTask.ref);
  //       return url;
  //     };

  //     // Upload images concurrently
  //     const [frontUrl, backUrl, selfieUrl] = await Promise.all([
  //       uploadImage(idFront, `${idType}_front_${Date.now()}`),
  //       uploadImage(idBack, `${idType}_back_${Date.now()}`),
  //       uploadImage(selfie, `selfie_${Date.now()}`),
  //     ]);

  //     // Build the JSON object
  //     const kycData = {
  //       user_id: "18bc89c0-b23a-40fc-9fbf-04ba64c0d9d5", // replace with dynamic user ID
  //       document_type: idType.toUpperCase(), // NATIONAL_ID or PASSPORT
  //       document_image_front_url: frontUrl,
  //       document_image_back_url: backUrl,
  //       selfie_image_url: selfieUrl,
  //       status: "PENDING",
  //       address: address.trim(),
  //       review_note: "Initial submission",
  //     };

  //     console.log("KYC Object:", kycData);

  //     // TODO: send kycData to your backend API
  //     // await fetch("https://your-api.com/kyc", {
  //     //   method: "POST",
  //     //   headers: { "Content-Type": "application/json" },
  //     //   body: JSON.stringify(kycData),
  //     // });

  //     setKycStatus("verified"); // optional, if you want immediate UI feedback
  //   } catch (error) {
  //     console.error("KYC Upload Error:", error);
  //     alert("Failed to upload images. Please try again.");
  //   }
  // };

  const openCamera = async (onSuccess: (uri: string) => void) => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      onSuccess(result.assets[0].uri);
    }
  };

  const skipKYC = () => {
    router.replace("/(protected)/(tabs)/home/home");
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
          {/* {kycSteps.map((step) => (
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
          ))} */}
          {/* ID Type Selection */}
          <Text style={styles.sectionTitle}>ID Verification</Text>

          <View style={styles.idTypeRow}>
            <TouchableOpacity
              style={[
                styles.idTypeButton,
                idType === "national_id" && styles.idTypeActive,
              ]}
              onPress={() => setIdType("national_id")}
            >
              <Text
                style={[
                  styles.idTypeText,
                  idType === "national_id" && styles.idTypeTextActive,
                ]}
              >
                National ID
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.idTypeButton,
                idType === "passport" && styles.idTypeActive,
              ]}
              onPress={() => setIdType("passport")}
            >
              <Text
                style={[
                  styles.idTypeText,
                  idType === "passport" && styles.idTypeTextActive,
                ]}
              >
                Passport
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.uploadRow}>
            <TouchableOpacity
              style={styles.uploadBox}
              onPress={() => openCamera(setIdFront)}
            >
              {idFront ? (
                <Image source={{ uri: idFront }} style={styles.previewImage} />
              ) : (
                <Text style={styles.uploadText}>
                  {idType === "passport" ? "Passport Front" : "ID Front"}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.uploadBox}
              onPress={() => openCamera(setIdBack)}
            >
              {idBack ? (
                <Image source={{ uri: idBack }} style={styles.previewImage} />
              ) : (
                <Text style={styles.uploadText}>
                  {idType === "passport" ? "Passport Back" : "ID Back"}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Selfie Verification */}
          <Text style={styles.sectionTitle}>Selfie Verification</Text>

          <TouchableOpacity
            style={styles.uploadBoxLarge}
            onPress={() => openCamera(setSelfie)}
          >
            {selfie ? (
              <Image source={{ uri: selfie }} style={styles.previewImage} />
            ) : (
              <Text style={styles.uploadText}>Take a Selfie</Text>
            )}
          </TouchableOpacity>
          {/* Address Verification */}
          <Text style={styles.sectionTitle}>Address Verification</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your full address"
            value={address}
            onChangeText={setAddress}
            multiline
          />
        </View>

        <PrimaryButton
          title="Start Verification"
          onPress={handleStartKYC}
          style={styles.verifyButton}
          variant="secondary"
          disabled={!canStartVerification}
        />

        <PrimaryButton
          title="Skip this time"
          onPress={skipKYC}
          style={styles.verifyButton}
          variant="outline"
        />

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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
  },

  uploadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  uploadText: {
    color: "#374151",
    fontWeight: "500",
    textAlign: "center",
  },

  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#1F2937",
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },

  uploadBox: {
    width: "48%",
    height: 120,
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    overflow: "hidden", // 🔴 REQUIRED for image clipping
    justifyContent: "center",
    alignItems: "center",
  },

  uploadBoxLarge: {
    height: 140,
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    overflow: "hidden", // 🔴 REQUIRED
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  idTypeRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },

  idTypeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },

  idTypeActive: {
    backgroundColor: "#EEF2FF",
    borderColor: "#6366F1",
  },

  idTypeText: {
    color: "#6B7280",
    fontWeight: "500",
  },

  idTypeTextActive: {
    color: "#4338CA",
    fontWeight: "600",
  },
});
