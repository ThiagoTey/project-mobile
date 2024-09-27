import { useSQLiteContext } from "expo-sqlite";

import { ProductInterface, ProductSizeInterface } from "@/types";
import { fetchAllData } from "@/api/fetchData";
import * as SecureStore from "expo-secure-store";
import { useConfigDatabase } from "./useConfigDatabase";

export const useProductDatabase = () => {
  const db = useSQLiteContext();

  const insertProduct = async (
    product: Omit<ProductInterface, "product_sizes">
  ) => {
    const statement = await db.prepareAsync(
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
      console.error("Failed to insert product: ", error);
      throw new Error("Failed to insert product: " + error);
    } finally {
      await statement.finalizeAsync();
    }
  };

  const updateProduct = async (
    product: Omit<ProductInterface, "product_sizes">
  ) => {
    const statement = await db.prepareAsync(
      `UPDATE products SET
          description = $description,
          barcode = $barcode,
          reference = $reference,
          price_cost = $price_cost,
          price_cash = $price_cash,
          price_forward = $price_forward,
          type_product = $type_product,
          quantity = $quantity,
          ncm = $ncm,
          origin = $origin,
          cst = $cst,
          cfop = $cfop,
          pis_cst = $pis_cst,
          pis_percent = $pis_percent,
          cofins_cst = $cofins_cst,
          cofins_percent = $cofins_percent,
          icms_percent = $icms_percent,
          inactive = $inactive,
          size = $size,
          group_id = $group_id,
          measure_id = $measure_id,
          company_id = $company_id,
          created_at = $created_at,
          updated_at = $updated_at,
          code_internal = $code_internal
        WHERE id = $id`
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
      console.error("Failed to updateProduct: ", error);
      throw new Error("Failed to updateProduct: " + error);
    } finally {
      await statement.finalizeAsync();
    }
  };

  const insertGrid = async (grid: ProductSizeInterface) => {
    const statement = await db.prepareAsync(`
        INSERT INTO productGrid (id, size, quantity, product_id, created_at, updated_at)
        VALUES ($id, $size, $quantity, $product_id, $created_at, $updated_at)
      `);

    try {
      await statement.executeAsync({
        $id: grid.id,
        $size: grid.size,
        $quantity: grid.quantity,
        $product_id: grid.product_id,
        $created_at: grid.created_at,
        $updated_at: grid.updated_at,
      });
    } catch (error) {
      console.error("Failed to insertGroup: ", error);
      throw new Error("Failed to insertGroup: " + error);
    } finally {
      await statement.finalizeAsync();
    }
  };

  const updateGrid = async (grid: ProductSizeInterface) => {
    const statement = await db.prepareAsync(`
      UPDATE productGrid SET 
        size = $size,
        quantity = $quantity,
        product_id = $product_id,
        created_at = $created_at,
        updated_at = $updated_at
      WHERE id = $id
      `);

    try {
      await statement.executeAsync({
        $id: grid.id,
        $size: grid.size,
        $quantity: grid.quantity,
        $product_id: grid.product_id,
        $created_at: grid.created_at,
        $updated_at: grid.updated_at,
      });
    } catch (error) {
      console.error("Failed to updateGrid : ", error);
      throw new Error("Failed to updateGrid : " + error);
    } finally {
      await statement.finalizeAsync();
    }
  };

  const verifyProductExists = async (productId: number) => {
    const query = `SELECT updated_at FROM products WHERE id = ?`;

    try {
      const result: { updated_at: string } | null = await db.getFirstAsync(
        query,
        productId
      );
      return result;
    } catch (error) {
      console.error("Failed to verifyProductExists: ", error);
      throw new Error("Failed to verifyProductExists: " + error);
    }
  };

  const verifyGridExists = async (gridId: number) => {
    const query = `SELECT updated_at FROM productGrid WHERE id = ?`;

    try {
      const result: { updated_at: string } | null = await db.getFirstAsync(
        query,
        gridId
      );
      return result;
    } catch (error) {
      console.error("Failed to verifyGridExists: ", error);
      throw new Error("Failed to verifyGridExists: " + error);
    }
  };

  // const { getLastSyncDate } = useConfigDatabase();

  const synchronizeAllProducts = async () => {
    const subdomain = await SecureStore.getItemAsync("subdomain");
    // const lastSyncdate = await getLastSyncDate();
    const prodUrl = `http://${subdomain}.ability.app.br/api/v1/products`;

    const jsonData = await fetchAllData(prodUrl);

    await Promise.all(
      jsonData.map(async (product: ProductInterface) => {
        const existingProduct = await verifyProductExists(product.id);

        if (existingProduct) {
          const updateDate = new Date(existingProduct.updated_at);
          const newUpdateDate = new Date(product.updated_at);

          if (updateDate < newUpdateDate) {
            await updateProduct(product);
          }
        } else {
          await insertProduct(product);
        }

        // Insere a grade
        if (product.product_sizes.length > 0) {
          const gridPromises = product.product_sizes.map(async (size) => {
            const existingGrid = await verifyGridExists(size.id);

            if (existingGrid) {
              const updateGridDate = new Date(existingGrid.updated_at);
              const newUpdateGridDate = new Date(size.updated_at);

              if (updateGridDate < newUpdateGridDate) {
                await updateGrid(size);
              }
            } else {
              await insertGrid(size);
            }
          });
          await Promise.all(gridPromises);
        }
      })
    );

    // for (let i = 0; i < jsonData.length; i++) {
    //   const product = jsonData[i];

    //   // Verifica se o produto existe, e se sim atualiza
    //   const existingProduct = await verifyProductExists(product.id);
    //   if (existingProduct) {
    //     const updateDate = new Date(existingProduct.updated_at);
    //     const newUpdateDate = new Date(product.updated_at);

    //     if (updateDate < newUpdateDate) {
    //       console.log("updateee")
    //       updateProduct(product);
    //     }
    //   } else {
    //     // Inserir Produto no banco
    //     await insertProduct(product);
    //   }

    //   // Insere a grade se tiver
    //   if (product.product_sizes.length > 0) {
    //     const existingGrid = await verifyGridExists(product.product_sizes.id);
    //     // Verifica se a grid existe
    //     if (existingGrid) {
    //       const updateGridDate = new Date(existingGrid.updated_at);
    //       const newUpdateGridDate = new Date(
    //         product.product_sizes.id.updated_at
    //       );

    //       if (updateGridDate < newUpdateGridDate) {
    //         await updateGrid(product.product_sizes);
    //       }
    //     } else {
    //       await insertGrid(product.product_sizes);
    //     }
    //   }
    // }
  };

  const searchByQuery = async (
    description: string = "",
    id?: number,
    reference: string = "",
    sortOrder: string = "ASC",
    sortBy: string = "description",
    limit: number = 50
  ) => {
    try {
      const searchValue = `%${id || description || reference}%`;
      const query = `
                    SELECT id, description, price_cash, quantity, code_internal 
                    FROM products 
                    WHERE coalesce(${sortBy},'') LIKE $searchValue 
                    ORDER BY ${sortBy} ${sortOrder} 
                    LIMIT $limit
                `;
      const response = await db.getAllAsync<ProductInterface>(query, {
        // $searchField: 'description',
        $searchValue: searchValue,
        // $sortBy: sortBy,
        // $sortOrder: sortOrder,
        $limit: limit,
      });
      return response;
    } catch (error) {
      console.log(error);
      console.error("Failed to SearchByQuery: ", error);
      throw new Error("Failed to SearchByQuery: " + error);
    }
  };

  const getById = async (id: number) => {
    try {
      // Ver a opção de fazer um LEFT JOIN depois
      const productQuery = "SELECT * FROM products WHERE id = ?";
      const productResponse = await db.getFirstAsync<ProductInterface>(
        productQuery,
        [id]
      );

      const gridQuery =
        "SELECT id, size, quantity, product_id FROM productGrid WHERE product_id = ?";
      const gridResponse = await db.getFirstAsync<ProductSizeInterface[]>(
        gridQuery,
        [id]
      );
      // console.log(gridResponse);

      return { productResponse, gridResponse };
    } catch (error) {
      console.error("Failed to getById: ", error);
      throw new Error("Failed to getById: " + error);
    }
  };

  return { searchByQuery, synchronizeAllProducts, getById };
};
