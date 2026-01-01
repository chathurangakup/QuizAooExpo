import Input from "@/components/common/Input";
import PrimaryButton from "@/components/common/PrimaryButton";
import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { authService } from "../services/auth.service";

export default function LoginScreen() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    // Mock login
    try {
      console.log("Logging in:", formData);

      const response = await authService.login({
        email: formData.email,
        password: formData.password,
      });
      console.log("Login response:", response.data);
      const { user, token, message } = response.data;

      console.log("User:", user);
      console.log("Token:", token);
      console.log("Message:", message);

      // 🔐 Save token later (AsyncStorage / SecureStore)
      // await SecureStore.setItemAsync("token", token)9

      router.replace("/(protected)/(tabs)/home");
    } catch (error: any) {
      const status = error.response?.status;
      const message = error.response?.data?.message || "Something went wrong";

      if (status === 401) {
        console.log(message); // 👈 show "Invalid credentials"
      } else {
        console.log("Server error. Please try again.");
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue earning</Text>

        <View style={styles.form}>
          <Input
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
            style={styles.inputSpacing}
          />
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <PrimaryButton
          title="Sign In"
          onPress={handleLogin}
          style={styles.loginButton}
        />

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/(public)/register")}>
            <Text style={styles.registerLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 32,
  },
  form: {
    marginBottom: 16,
  },
  inputSpacing: {
    marginTop: 16,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#6366F1",
    fontWeight: "600",
  },
  loginButton: {
    marginBottom: 24,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 32,
  },
  registerText: {
    color: "#6B7280",
  },
  registerLink: {
    color: "#6366F1",
    fontWeight: "600",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    color: "#9CA3AF",
    paddingHorizontal: 16,
  },
  googleButton: {
    backgroundColor: "#F3F4F6",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  googleButtonText: {
    color: "#374151",
    fontWeight: "600",
  },
});
