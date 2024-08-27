import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import * as SecureStore from "expo-secure-store";
import { loginAuth } from "@/api/auth";
import { router } from "expo-router";

type AllCompaniesProps = {
  id: number;
  name: string;
}

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
  allCompanies: AllCompaniesProps[] | null;
  setAllCompanies: Dispatch<SetStateAction<AllCompaniesProps[] | null>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userCompany, setUserCompany] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ allCompanies , setAllCompanies ] = useState<AllCompaniesProps[] | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const token = await SecureStore.getItemAsync("userToken");
        const email = await SecureStore.getItemAsync("userEmail");
        const company = await SecureStore.getItemAsync("userCompany");
        const companies = await SecureStore.getItemAsync("userCompanies")
        if (token && email && company && companies) {
          console.log("conseguiut pegar token do secureStore");
          setUserToken(token);
          setUserEmail(email);
          setUserCompany(company);
          setAllCompanies(JSON.parse(companies))
          setIsLoggedIn(true);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (
    email: string,
    password: string,
    selectCompany: number,
    rememberMe: boolean
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      const token = await loginAuth(email, password, selectCompany, setError);
      if (token?.authentication_token) {
        await SecureStore.setItemAsync("userToken", token.authentication_token);
        await SecureStore.setItemAsync("userEmail", email);
        await SecureStore.setItemAsync("userCompany", selectCompany.toString());
        await SecureStore.setItemAsync("userCompanies", JSON.stringify(allCompanies))
        setUserToken(token);
        setUserEmail(email);
        setUserCompany(selectCompany.toString());
        setIsLoggedIn(true);
        router.replace("/(tabs)/home");
        if (!rememberMe) {
          setTimeout(async () => {
            await logout();
          }, 10800000); // 3 horas
        }
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await SecureStore.deleteItemAsync("userToken");
      await SecureStore.deleteItemAsync("userEmail");
      await SecureStore.deleteItemAsync("userCompany");
      await SecureStore.deleteItemAsync("userCompanies");
      setUserToken(null);
      setUserEmail(null);
      setUserCompany(null);
      setAllCompanies(null)
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      throw error;
    } finally {
      setIsLoading(false);
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
        setError,
        allCompanies,
        setAllCompanies
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
