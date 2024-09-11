import ThemedText from "@/components/typography/ThemedText";
import Colors from "@/constants/Colors";
import { useAuth } from "@/context/AuthContext";
import { initializedatabase } from "@/database/InitializeDatabase";;
import {
  Stack,
  Redirect,
} from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
export default function AppLayout() {
  const { isLoggedIn, userEmail, userCompany, isLoading = true } = useAuth();
  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <ThemedText>Carregando...</ThemedText>;
  }

  // Mais detalhes sobre Authentication flow https://docs.expo.dev/router/reference/authentication/

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/home" />;
  }

  return (
    <SQLiteProvider
      databaseName={isLoggedIn ? `${userEmail}${userCompany}` : "ability"}
      onInit={isLoggedIn ? initializedatabase : undefined}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarColor: Colors.blue,
        }}
      />
    </SQLiteProvider>
  );
}
