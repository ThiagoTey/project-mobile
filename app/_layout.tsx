// import { ThemeProvider } from '@react-navigation/native';
import Colors from "@/constants/Colors";
import { AuthContext, AuthProvider, useAuth } from "@/context/AuthContext";
import { RefreshProvider } from "@/context/RefreshContext";
import { initializedatabase } from "@/database/InitializeDatabase";
import { useFonts } from "expo-font";
import { Stack, SplashScreen } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";

// import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function AppContent() {
  const { isLoggedIn, userEmail, userCompany } = useAuth();

  return (
    <SQLiteProvider
      databaseName={isLoggedIn ? `${userEmail}${userCompany}` : "ability"}
      onInit={isLoggedIn ? initializedatabase : undefined}
    >
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            statusBarColor: Colors.blue,
            headerShown: false,
            headerStyle: { backgroundColor: Colors.blue },
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: Colors.blue },
            statusBarColor: Colors.blue,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: Colors.blue },
            statusBarColor: Colors.blue,
          }}
        />
        <Stack.Screen
          name="(routes)"
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: Colors.blue },
            statusBarColor: Colors.blue,
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </SQLiteProvider>
  );
}

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Inter-Black": require("../assets/fonts/Inter-Black.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-ExtraBold": require("../assets/fonts/Inter-ExtraBold.ttf"),
    "Inter-ExtraLight": require("../assets/fonts/Inter-ExtraLight.ttf"),
    "Inter-Light": require("../assets/fonts/Inter-Light.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Thin": require("../assets/fonts/Inter-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    // <ThemeProvider value={}>
    <AuthProvider>
      <RefreshProvider>
        <AppContent />
      </RefreshProvider>
    </AuthProvider>
    // </ThemeProvider>
  );
}