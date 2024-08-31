import { fetchAllData } from "@/api/fetchData";
import { Unitsinterface } from "@/types";
import { useSQLiteContext } from "expo-sqlite";
import * as SecureStore from "expo-secure-store";

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
      console.error("Failed to insertUnit: ", error);
      throw new Error("Failed to insertUnit: " + error);
    } finally {
      await statement.finalizeAsync();
    }
  };

  const updateUnit = async (unit: Unitsinterface) => {
    const statement = await db.prepareAsync(
      `UPDATE units SET
          description = $description,
          abbreviation = $abbreviation,
          weigh = $weigh,
          company_id = $company_id,
          created_at = $created_at,
          updated_at = $updated_at
        WHERE id = $id`
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
      console.error("Failed to updateUnit: ", error);
      throw new Error("Failed to updateUnit: " + error);
    } finally {
      await statement.finalizeAsync();
    }
  };

  const verifyUnitsExists = async (UnitId: number) => {
    const query = `SELECT updated_at FROM units WHERE id = ?`;

    try {
      const result: { updated_at: string } | null = await db.getFirstAsync(
        query,
        UnitId
      );
      return result;
    } catch (error) {
      console.error("Failed to verifyUnitsExists: ", error);
      throw new Error("Failed to verifyUnitsExists: " + error);
    }
  };

  const synchronizeAllUnits = async () => {
    const subdomain = await SecureStore.getItemAsync("subdomain");
    const unitUrl = `http://${subdomain}.ability.app.br/api/v1/measures`

    const jsonData = await fetchAllData(unitUrl);
    for (let i = 0; i < jsonData.length; i++) {
      const unit = jsonData[i];

      const existingUnit = await verifyUnitsExists(unit.id)

      if(existingUnit) {
        const updateDate = new Date(existingUnit.updated_at);
        const newUpdateDate = new Date(unit.updated_at);

        if (updateDate < newUpdateDate) {
          updateUnit(unit);
        }
      } else {
        // Inserir Unidade
        insertUnit(unit);
      }
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
        return response;
      } catch (error) {
        console.error("Failed to searchByQuery: ", error);
        throw new Error("Failed to searchByQuery: " + error);
      }
  }

  return { synchronizeAllUnits, searchByQuery };

};
