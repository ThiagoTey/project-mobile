import { useSQLiteContext } from "expo-sqlite";
import { useUnitDatabase } from "./useUnitDatabase";
import { useGroupDatabase } from "./useGroupDatabse";
import { useProductDatabase } from "./useProductDatabase";

export const useDbOperations = () => {
  const db = useSQLiteContext();

  const dropDatabase = async () => {
    try {
      await db.runAsync('DROP TABLE IF EXISTS units');
      await db.runAsync('DROP TABLE IF EXISTS groups');
      await db.runAsync('DROP TABLE IF EXISTS products');
      await db.runAsync('DROP TABLE IF EXISTS productGrid');
    console.log('Tables dropped successfully');
    } catch (error) {
      throw error
    }
  };

  return { dropDatabase };
};



export const synchronizeAll = async () => {
    // const unitDb = useUnitDatabase();
    // const groupDb = useGroupDatabase();
    const productDb = useProductDatabase();

    // (await unitDb).synchronizeAllUnits;
    // (await groupDb).synchronizeAllGroups;
    await productDb.synchronizeAllProducts();
};
