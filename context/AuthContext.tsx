import React, { createContext, useState, useContext, useEffect, Dispatch, SetStateAction } from "react";
import * as SecureStore from "expo-secure-store";
import { loginAuth } from "@/api/auth";
import { router, useRootNavigationState } from "expo-router";

interface AuthContextType {
  userToken: string | null;
  userEmail: string | null;
  userCompany: string | null;
  isLoading: boolean;
  login: (
    email: string,
    password: string,
    selectCompany: number,
    rememberMe: boolean
  ) => void;
  logout: () => void;
  isLoggedIn: boolean;
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userCompany, setUserCompany] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigationState = useRootNavigationState()

  // useEffect(() => {
  //   if(!navigationState?.key && isLoading) return

  //   console.log("navi state: "+ !navigationState?.key)

  //   // if(!isLoading && isLoggedIn){
  //   //   router.replace('/(tabs)/home')
  //   // }
  // },[navigationState?.key])

  useEffect(() => {
    if(!navigationState?.key && isLoading) return

    console.log("isloadi " + isLoading)

    const loadUser = async () => {
      try {
        setIsLoading(true);
        setError(null)
        const token = await SecureStore.getItemAsync("userToken");
        const email = await SecureStore.getItemAsync("userEmail");
        const company = await SecureStore.getItemAsync("userCompany");
        if (token && email && company) {
          console.log("conseguiut pegar token do secureStore")
          setUserToken(token);
          setUserEmail(email);
          setUserCompany(company);
          setIsLoggedIn(true);
          router.replace('/(tabs)/home')
        }
      } catch (error) {
      } finally {
        // setIsLoading(false);
      }
    };

    loadUser();
  }, [navigationState?.key]);

  const login = async (
    email: string,
    password: string,
    selectCompany: number,
    rememberMe: boolean
  ) => {
    try {
      setIsLoading(true);
      setError(null)
      const token = await loginAuth(email, password, selectCompany, setError);
      if (token?.authentication_token) {
        await SecureStore.setItemAsync("userToken", token.authentication_token);
        await SecureStore.setItemAsync("userEmail", email);
        await SecureStore.setItemAsync("userCompany", selectCompany.toString());
        setUserToken(token);
        setUserEmail(email);
        setUserCompany(selectCompany.toString());
        setIsLoggedIn(true);
        router.replace('/(tabs)/home')
        if (!rememberMe) {
          setTimeout(async () => {
            await logout();
          }, 10800000); // 3 horas
        }
      }
    } catch (error) {
      throw error;
    } finally {
      // setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await SecureStore.deleteItemAsync("userToken");
      await SecureStore.deleteItemAsync("userEmail");
      await SecureStore.deleteItemAsync("userCompany");
      setUserToken(null);
      setUserEmail(null);
      setUserCompany(null);
      setIsLoggedIn(false);
      router.replace('/')
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      throw error;
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        userEmail,
        userCompany,
        isLoading,
        login,
        logout,
        isLoggedIn,
        error,
        setError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth ser Utilizado dentro de um AuthProvider");
  }
  return context;
};
