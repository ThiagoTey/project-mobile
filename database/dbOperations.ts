import { useSQLiteContext } from "expo-sqlite";
import { useUnitDatabase } from "./useUnitDatabase";
import { useGroupDatabase } from "./useGroupDatabse";
import { useProductDatabase } from "./useProductDatabase";
import { initializedatabase } from "./InitializeDatabase";

export const useDbOperations = () => {
  const db = useSQLiteContext();

  const dropDatabase = async () => {
    try {
      await db.runAsync('DELETE FROM units');
      await db.runAsync('DELETE FROM groups');
      await db.runAsync('DELETE FROM products');
      await db.runAsync('DELETE FROM productGrid');
      console.log('Tables DELETED successfully');
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
