import { type SQLiteDatabase } from "expo-sqlite";

export async function initializedatabase(database: SQLiteDatabase) {
  await database.execAsync(`
        CREATE TABLE IF NOT EXISTS productGrid (
            id INTEGER PRIMARY KEY,
            size TEXT,
            quantity TEXT,
            product_id INTEGER,
            created_at DATE,
            updated_at DATE,
        )
        `);
  await database.execAsync(`
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY,
                description TEXT NOT NULL,
                barcode TEXT,
                reference TEXT,
                price_cost TEXT,
                price_cash TEXT,
                price_forward TEXT,
                type_product TEXT,
                quantity TEXT,
                ncm TEXT,
                origin TEXT,
                cst TEXT,
                cfop TEXT,
                pis_cst TEXT,
                pis_percent TEXT,
                cofins_cst TEXT,
                cofins_percent TEXT,
                icms_percent TEXT,
                inactive BOOLEAN,
                size BOOLEAN,
                group_id INTEGER,
                measure_id INTEGER,
                company_id INTEGER,
                created_at DATE,
                updated_at DATE,
                code_internal INTEGER,
                product_grid_id,
                FOREIGN KEY (product_grid_id) REFERENCES id(productGrid)
            )
            `);
}