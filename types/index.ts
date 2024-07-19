export interface ProductSizeInterface {
  id: number;
  size: string;
  quantity: string | null;
  product_id: number;
  created_at: string;
  updated_at: string;
}

export interface ProductInterface {
  id: number;
  description: string;
  barcode: string | null;
  reference: string | null;
  price_cost: string;
  price_cash: string;
  price_forward: string;
  type_product: string;
  quantity: string;
  ncm: string | null;
  origin: string | null;
  cst: string | null;
  cfop: string | null;
  pis_cst: string | null;
  pis_percent: string | null;
  cofins_cst: string | null;
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
  product_sizes: ProductSizeInterface[] | [];
}

export interface Unitsinterface {
  id: number;
  description: string;
  abbreviation: string;
  weigh: boolean | null;
  company_id: number;
  created_at: string;
  updated_at: string;
}