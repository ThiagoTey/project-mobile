// import { ThemeProvider } from '@react-navigation/native';
import Colors from "@/constants/Colors";
import { AuthProvider } from "@/context/AuthContext";
import { RefreshProvider } from "@/context/RefreshContext";
import { initializedatabase } from "@/database/InitializeDatabase";
import { useFonts } from "expo-font";
import { Stack, SplashScreen } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

// import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

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
        <SQLiteProvider databaseName="ability" onInit={initializedatabase}>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                statusBarColor: Colors.blue,
                headerShown: false,
                headerStyle: { backgroundColor: Colors.blue },
              }}
            />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(routes)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </SQLiteProvider>
      </RefreshProvider>
    </AuthProvider>

    // </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    fontFamily: "Inter-Regular",
  },
});
