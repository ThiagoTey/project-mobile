import { fetchAllData } from "@/api/fetchData";
import { Unitsinterface } from "@/types";
import { useSQLiteContext } from "expo-sqlite";

const unitUrl = process.env.EXPO_PUBLIC_API_UNIT_URL || "";

export const useUnitDatabase = () => {
  const db = useSQLiteContext();

  const insertUnit = async (unit: Unitsinterface) => {
    const statement = await db.prepareAsync(
      `INSERT INTO units (id, description, abbreviation, weigh, company_id, created_at, updated_at)
            VALUES ($id, $description, $abbreviation, $weigh, $company_id, $created_at, $updated_at)
            `
    );
    try {
      await statement.executeAsync({
        $id: unit.id,
        $description: unit.description,
        $abbreviation: unit.abbreviation,
        $weigh: unit.weigh,
        $company_id: unit.company_id,
        $created_at: unit.created_at,
        $updated_at: unit.updated_at,
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  };

  const synchronizeAllUnits = async () => {
    const jsonData = await fetchAllData(unitUrl);
    for (let i = 0; i < jsonData.length; i++) {
      const unit = jsonData[i];
      // Inserir Unidade
      insertUnit(unit);
    }
  };

  const searchByQuery = async (description:string = '') => {
    try {
        const query = `
                      SELECT id, description, abbreviation, weigh
                      FROM units WHERE description LIKE ?
                  `;
  
        const response = await db.getAllAsync<Unitsinterface>(
          query,
          `%${description}%`
        );
        console.log(response)
        return response;
      } catch (error) {
        throw error;
      }
  }

  return { synchronizeAllUnits, searchByQuery };

};
