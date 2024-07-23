import { useSQLiteContext } from "expo-sqlite";

import { ProductInterface } from "@/types";
import { fetchAllData } from "@/api/fetchData";

const prodUrl = process.env.EXPO_PUBLIC_API_PROD_URL || "";

export const useProductDatabase = () => {
  const database =  useSQLiteContext();

  const insertProduct = async (product:ProductInterface) => {
    const statement = await database.prepareAsync(
        "INSERT INTO products () VALUES ()"
    )
  }

  const synchronizeAllProducts = async () => {
    const jsonData = await fetchAllData(prodUrl)
    for (let i = 0; i < jsonData.length; i++) {
        const product = jsonData[i];
        // Inserir Produto no banco
        insertProduct(product)
    }
  }

  const seatchByDescription = async (description: string) => {
    try {
      const query = `
                    SELECT id, description, price_cash, quantity, code_internal 
                    FROM products WHERE description LIKE ?
                `;

      const response = await database.getAllAsync<ProductInterface>(
        query,
        `%${description}%`
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  return { seatchByDescription };
};
