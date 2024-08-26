import { fetchAllData } from "@/api/fetchData";
import { GroupsInterface } from "@/types";
import { useSQLiteContext } from "expo-sqlite";

const groupUrl = process.env.EXPO_PUBLIC_API_GROUP_URL || "";

export const useGroupDatabase = () => {
  const db = useSQLiteContext();

  const insertGroup = async (group: GroupsInterface) => {
    const statement = await db.prepareAsync(
      `INSERT INTO groups (id, description, company_id, created_at, updated_at)
                VALUES ($id, $description, $company_id, $created_at, $updated_at)
                `
    );
    try {
      await statement.executeAsync({
        $id: group.id,
        $description: group.description,
        $company_id: group.company_id,
        $created_at: group.created_at,
        $updated_at: group.updated_at,
      });
    } catch (error) {
      console.error("Failed to inserGroup: ", error);
      throw new Error("Failed to inserGroup: " + error);
    } finally {
      await statement.finalizeAsync();
    }
  };

  const updateGroup = async (group: GroupsInterface) => {
    const statement = await db.prepareAsync(
      `UPDATE groups SET
          description = $description,
          company_id = $company_id,
          created_at = $created_at,
          updated_at = $updated_at
        WHERE id = $id`
    );
    try {
      await statement.executeAsync({
        $id: group.id,
        $description: group.description,
        $company_id: group.company_id,
        $created_at: group.created_at,
        $updated_at: group.updated_at,
      });
    } catch (error) {
      console.error("Failed to updateGroup: ", error);
      throw new Error("Failed to updateGroup: " + error);
    } finally {
      await statement.finalizeAsync();
    }
  };

  const verifyGroupExists = async (UnitId: number) => {
    const query = `SELECT updated_at FROM groups WHERE id = ?`;

    try {
      const result: { updated_at: string } | null = await db.getFirstAsync(
        query,
        UnitId
      );
      return result;
    } catch (error) {
      console.error("Failed to verifyGroupExists: ", error);
      throw new Error("Failed to verifyGroupExists: " + error);
    }
  };

  const synchronizeAllGroups = async () => {
    const jsonData = await fetchAllData(groupUrl);
    for (let i = 0; i < jsonData.length; i++) {
      const group = jsonData[i];

      const existingGroup = await verifyGroupExists(group.id)

      if(existingGroup){
        const updateDate = new Date(existingGroup.updated_at);
        const newUpdateDate = new Date(group.updated_at);

        if (updateDate < newUpdateDate) {
          updateGroup(group);
        }
      }else {
        // Inserir Grupo no banco
        insertGroup(group);
      }
    }
  };

  const searchByQuery = async (description: string = "") => {
    try {
      const query = `
                          SELECT id, description
                          FROM groups WHERE description LIKE ?
                      `;

      const response = await db.getAllAsync<GroupsInterface>(
        query,
        `%${description}%`
      );
      return response;
    } catch (error) {
      console.error("Failed to searcgByQuery ", error);
      throw new Error("Failed to searcgByQuery " + error);
    }
  };

  return { synchronizeAllGroups, searchByQuery };
};
