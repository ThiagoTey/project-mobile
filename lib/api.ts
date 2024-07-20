import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchAndStore = async (url:string, key:string, headers:{}) => {
  try {
    const response = await fetch(url, { method: "GET", headers });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${key}: ${response.statusText}`);
    }
    const data = await response.json();
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Erro ao sincronizar ${key}:`, error);
  }
};

// Pega todos os dados da Api e armazena localmente
export const fetchAndStoreAllData = async () => {
  const userEmail = process.env.EXPO_PUBLIC_API_X_USER_EMAIL || "";
  const userToken = process.env.EXPO_PUBLIC_API_X_USER_TOKEN || "";
  const prodUrl = process.env.EXPO_PUBLIC_API_PROD_URL || "";
  const unitUrl = process.env.EXPO_PUBLIC_API_UNIT_URL || "";
  const groupUrl = process.env.EXPO_PUBLIC_API_GROUP_URL || "";

  const headers = {
    "X-User-Email": userEmail,
    "X-User-Token": userToken,
  };

  const urlsAndKeys = [
    { url: prodUrl, key: "products" },
    { url: unitUrl, key: "units" },
    { url: groupUrl, key: "groups" },
  ];

  try {
    await Promise.all(
      urlsAndKeys.map((item) => fetchAndStore(item.url, item.key, headers))
    );
  } catch (error) {
    console.log("Erro sincronizando dados:", error);
  }
};

export const getStorageData = async (key: string) => {
  try {
    const storedData = await AsyncStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error("Erro ao obter dados do AsyncStorage", error);
  }
};

export const getProductFromStorage = async (productId: number) => {
  try {
    const products = await getStorageData("products");
    if (products) {
      return products.find((product) => product.id === productId);
    }
    return null;
  } catch (error) {
    console.error("Erro ao obter produto específico do AsyncStorage", error);
  }
};
