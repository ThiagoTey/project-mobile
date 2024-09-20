import { useSQLiteContext } from "expo-sqlite";

export const useConfigDatabase = () => {
  const db = useSQLiteContext();

  const updateLastSyncDate = async () => {
    const now = new Date().toISOString();
    const statement = await db.prepareAsync(
      `UPDATE config SET last_sync = $now`
    );

    try {
      await statement.executeAsync({
        $now: now,
      });
    } catch (error) {
      console.error("Failed to UpdateLastSyncDate: ", error);
      throw new Error("Failed to UpdateLastSyncDate: " + error);
    } finally {
      statement.finalizeAsync();
    }
  };

  const getLastSycndate = async () => {
    const query = "SELECT last_sync FROM config";
    try {
      const response: { last_sync: Date } | null = await db.getFirstAsync(
        query
      );
      return response;
    } catch (error) {
      console.error("Failed to getLastSyncdate: ", error);
      throw new Error("Failed to getLastSyncdate: " + error);
    }
  };

  return { updateLastSyncDate, getLastSycndate };
};
