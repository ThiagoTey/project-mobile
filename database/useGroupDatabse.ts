import { fetchAllData } from "@/api/fetchData";
import { GroupsInterface } from "@/types";
import { useSQLiteContext } from "expo-sqlite"

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
          throw error;
        } finally {
          await statement.finalizeAsync();
        }
      };
    
      const synchronizeAllGroups = async () => {
        const jsonData = await fetchAllData(groupUrl);
        for (let i = 0; i < jsonData.length; i++) {
          const group = jsonData[i];
          // Inserir Grupo no banco
          insertGroup(group);
        }
      };
    
      const searchByQuery = async (description:string = '') => {
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
            throw error;
          }
      }
    
      return { synchronizeAllGroups, searchByQuery };
    
}