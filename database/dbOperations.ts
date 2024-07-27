import { useSQLiteContext } from "expo-sqlite";
import { useUnitDatabase } from "./useUnitDatabase";
import { useGroupDatabase } from "./useGroupDatabse";
import { useProductDatabase } from "./useProductDatabase";

export const useDatabase = async () => {
  const db = useSQLiteContext();

  const dropDatabase = async () => {
    await db.execAsync(`
            DROP TABLE IF EXISTS units;    
            DROP TABLE IF EXISTS groups;    
            DROP TABLE IF EXISTS products;    
            DROP TABLE IF EXISTS productGrid;    
        `);
  };

  return { dropDatabase };
};

export const synchronizeAll = async () => {
    const unitDb = useUnitDatabase();
    const groupDb = useGroupDatabase();
    const productDb = useProductDatabase();

    (await unitDb).synchronizeAllUnits();
    (await groupDb).synchronizeAllGroups();
    await productDb.synchronizeAllProducts();
};
