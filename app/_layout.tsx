import { Stack } from "expo-router";
import { AuthProvider } from "@/contexts/AuthContext";
import Toast from "react-native-toast-message";
import { BaseToast, ErrorToast } from "react-native-toast-message";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
      <Toast
        position="top"
        topOffset={50} // Add some offset from the top
        config={{
          success: (props) => (
            <BaseToast
              {...props}
              style={{ borderLeftColor: "green" }}
              contentContainerStyle={{ paddingHorizontal: 15 }}
              text1Style={{ fontSize: 15, fontWeight: "400" }}
            />
          ),
          error: (props) => (
            <ErrorToast {...props} text1Style={{ fontSize: 15 }} />
          ),
        }}
      />
    </AuthProvider>
  );
}
