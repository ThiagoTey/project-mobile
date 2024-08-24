import * as SecureStore from "expo-secure-store";

export const fetchAllData = async (url: string) => {
  const userEmail = (await SecureStore.getItemAsync("userEmail")) || "";
  const userToken = (await SecureStore.getItemAsync("userToken")) || "";
  const company = await SecureStore.getItemAsync("userCompany") || "";
  const headers = {
    "X-User-Email": userEmail,
    "X-User-Token": userToken,
  };
  try {
    const response = await fetch(url, { method: "GET", headers });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// export const fetchData = () => {
//     return fetchAllData;
// }
