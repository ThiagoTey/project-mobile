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

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!isLoggedIn) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
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
