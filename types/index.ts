interface ProductSize {
  id: number;
  size: string;
  quantity: string;
  product_id: number;
  created_at: string;
  updated_at: string;
}

interface Product {
  id: number;
  description: string;
  barcode: string | null;
  reference: string | null;
  price_cost: string;
  price_cash: string;
  price_forward: string;
  type_product: string;
  quantity: string;
  ncm: string;
  origin: string;
  cst: string;
  cfop: string;
  pis_cst: string;
  pis_percent: string | null;
  cofins_cst: string;
  cofins_percent: string | null;
  icms_percent: string | null;
  inactive: boolean;
  size: boolean;
  group_id: number;
  measure_id: number;
  company_id: number;
  created_at: string;
  updated_at: string;
  code_internal: number;
  product_sizes: ProductSize[];
}
