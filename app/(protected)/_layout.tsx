import { router, Stack } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function ProtectedLayout() {
  // Mock auth check - in real app, check actual auth state
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    router.replace("/(public)/login");
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="kyc" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
