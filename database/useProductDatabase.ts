import { useSQLiteContext } from "expo-sqlite";

import { ProductInterface, ProductSizeInterface } from "@/types";
import { fetchAllData } from "@/api/fetchData";

const prodUrl = process.env.EXPO_PUBLIC_API_PROD_URL || "";

export const useProductDatabase = () => {
  const database = useSQLiteContext();

  const insertProduct = async (product: Omit<ProductInterface, "product_sizes"> ) => {
    const statement = await database.prepareAsync(
      `INSERT INTO products (id,description, barcode, reference, 
        price_cost, price_cash, price_forward, type_product, quantity, ncm, 
        origin, cst, cfop, pis_cst, pis_percent, cofins_cst, cofins_percent, icms_percent,
        inactive, size, group_id, measure_id, company_id, created_at, updated_at, code_internal)
        VALUES ($id,$description, $barcode, $reference, 
        $price_cost, $price_cash, $price_forward, $type_product, $quantity, $ncm, 
        $origin, $cst, $cfop, $pis_cst, $pis_percent, $cofins_cst, $cofins_percent, $icms_percent,
        $inactive, $size, $group_id, $measure_id, $company_id, $created_at, $updated_at, $code_internal)`
    );

    try {
      await statement.executeAsync({
        $id: product.id,
        $description: product.description,
        $barcode: product.barcode,
        $reference: product.reference,
        $price_cost: product.price_cost,
        $price_cash: product.price_cash,
        $price_forward: product.price_forward,
        $type_product: product.type_product,
        $quantity: product.quantity,
        $ncm: product.ncm,
        $origin: product.origin,
        $cst: product.cst,
        $cfop: product.cfop,
        $pis_cst: product.pis_cst,
        $pis_percent: product.pis_percent,
        $cofins_cst: product.cofins_cst,
        $cofins_percent: product.cofins_percent,
        $icms_percent: product.icms_percent,
        $inactive: product.inactive,
        $size: product.size,
        $group_id: product.group_id,
        $measure_id: product.measure_id,
        $company_id: product.company_id,
        $created_at: product.created_at,
        $updated_at: product.updated_at,
        $code_internal: product.code_internal,
      });

    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  };

  const insertGrid = async (grid: ProductSizeInterface) => {
    const statement = await database.prepareAsync(`
        INSERT INTO productGrid (id, size, quantity, product_id, created_at, updated_at)
        VALUES ($id, $size, $quantity, $product_id, $created_at, $updated_at)
      `);

      try {
        await statement.executeAsync({
          $id: grid.id,
          $size: grid.created_at,
          $quantity: grid.quantity,
          $product_id: grid.product_id,
          $created_at: grid.created_at,
          $updated_at: grid.updated_at
        })
      } catch (error) {
        throw error
      }finally{
        await statement.finalizeAsync();
      }
  }

  const synchronizeAllProducts = async () => {
    const jsonData = await fetchAllData(prodUrl);
    for (let i = 0; i < jsonData.length; i++) {
      const product = jsonData[i];
      // Inserir Produto no banco
      insertProduct(product);

      // Insere a grade se tiver
      if(product.product_sizes.length > 0) {
        insertGrid(product.product_sizes)
      }
    }
  };

  const seartchByDescription = async (description: string) => {
    try {
      const query = `
                    SELECT id, description, price_cash, quantity, code_internal 
                    FROM products WHERE description LIKE ?
                `;

      const response = await database.getAllAsync<ProductInterface>(
        query,
        `%${description}%`
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  const seartchById = async (id: number) => {
    
  }

  return { seartchByDescription, synchronizeAllProducts };
};
