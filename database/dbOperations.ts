import { useSQLiteContext } from "expo-sqlite";
import { useUnitDatabase } from "./useUnitDatabase";
import { useGroupDatabase } from "./useGroupDatabse";
import { useProductDatabase } from "./useProductDatabase";


export const useDbOperations = () => {
  const db = useSQLiteContext();

  const closeDb = async () => {
    try {
      const response = await db.getFirstAsync("SELECT * from products")
      console.log("closeee" + JSON.stringify(response))
      if(response){
        await db.closeAsync();
        console.log("Database closed successfully");
      }

    } catch (error) {
      console.error("Failed to close the database: ", error);
      throw new Error("Failed to close the database: " + error);
    }
  }

  const dropDatabase = async () => {
    try {
      await db.runAsync("DELETE FROM units");
      await db.runAsync("DELETE FROM groups");
      await db.runAsync("DELETE FROM products");
      await db.runAsync("DELETE FROM productGrid");
      await db.runAsync("DELETE FROM config");
      console.log("Tables DELETED successfully");
    } catch (error) {
      console.error("Failed to drop database ", error);
      throw new Error("Failed to drop database " + error);
    }
  };

  return { dropDatabase, closeDb };
};

export const synchronizeAll = async () => {
  const unitDb = useUnitDatabase();
  const groupDb = useGroupDatabase();
  const productDb = useProductDatabase();

  await productDb.synchronizeAllProducts();
  await unitDb.synchronizeAllUnits();
  await groupDb.synchronizeAllGroups();
};
