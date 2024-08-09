const userEmail = process.env.EXPO_PUBLIC_API_X_USER_EMAIL || "";
const userToken = process.env.EXPO_PUBLIC_API_X_USER_TOKEN || "";
const headers = {
    "X-User-Email": userEmail,
    "X-User-Token": userToken,
}

export const fetchAllData = async (url:string) => {
    try {
        const response = await fetch(url, {method: "GET", headers})
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
          }
          const data = await response.json();
          return data;
    } catch (error) {
        throw error
    }
}

// export const fetchData = () => {
//     return fetchAllData;
// }