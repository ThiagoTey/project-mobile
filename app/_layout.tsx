// import { ThemeProvider } from '@react-navigation/native';
import Colors from "@/constants/Colors";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { RefreshProvider } from "@/context/RefreshContext";
import { initializedatabase } from "@/database/InitializeDatabase";
import { useFonts } from "expo-font";
import {
  Stack,
  SplashScreen,
  Slot,
  useRootNavigationState,
  router,
} from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";

// import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function AppContent() {
  const { isLoggedIn, userEmail, userCompany, isLoading = true } = useAuth();

  const navigationState = useRootNavigationState();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if ((navigationState?.key, !isLoading)) {
      setIsReady(true);
    }
  }, [navigationState?.key, isLoading]);

  if (!isReady) {
    return null;
  }
  const initialRouteName = isLoggedIn ? "(tabs)" : "index";
  console.log("Está logado?" + isLoggedIn);
  console.log("initialRouteName" + initialRouteName);

  return (
    <SQLiteProvider
      databaseName={isLoggedIn ? `${userEmail}${userCompany}` : "ability"}
      onInit={isLoggedIn ? initializedatabase : undefined}
    >
      <AuthStack isLoggedIn={isLoggedIn} />
    </SQLiteProvider>
  );
}

function AuthStack({ isLoggedIn } : { isLoggedIn : boolean}) {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarColor: Colors.blue,
      }}
    >
      {isLoggedIn ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name="index" />
      )}
      {/* Adicione outras telas após a condicional */}
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(routes)" />
      <Stack.Screen name="+not-found" />
    </Stack>
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
      {/* <Slot /> */}
        <AppContent />
      </RefreshProvider>
    </AuthProvider>
    // </ThemeProvider>
  );
}
