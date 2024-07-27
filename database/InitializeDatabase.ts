import { type SQLiteDatabase } from "expo-sqlite";

export async function initializedatabase(database: SQLiteDatabase) {
  // Tabela Unidades
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS units (
        id INTEGER PRIMARY KEY,
        description TEXT,
        abbreviation TEXT,
        weigh: BOOLEAN,
        company_id: INTEGER,
        created_at: DATE,
        updated_at: DATE
    )
`);
  // Tabela Grupos
  await database.execAsync(`
    CREATE DATABSE IF NOT EXISTS groups (
        id: INTEGER PRIMARY KEY,
        description: TEXT,
        company_id: INTEGER,
        created_at: DATE,
        updated_at: DATE
    ) 
`);
  // Tabela Produtos
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
                FOREIGN KEY (group_id) REFERENCES groups(id),
                FOREIGN KEY (measure_id) REFERENCES units(id)
            );
            `);
  // Tabela Grid de Produtos
  await database.execAsync(`
                CREATE TABLE IF NOT EXISTS productGrid (
                    id INTEGER PRIMARY KEY,
                    size TEXT,
                    quantity TEXT,
                    product_id INTEGER,
                    created_at DATE,
                    updated_at DATE,
                    FOREIGN KEY (product_id) REFERENCES products(id)
                );
                `);
}
