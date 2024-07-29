interface ProductByCode {
  id: number;
  unit_detail_id: number;
  code: string;

  name: string;
  unit_name: string;
  prices: { price: number; sale_price: number };
  stock: number;
}

interface ProductForSale {
  id: number;
  code: string;
  quantity: number;
  product: {
    id: number;
    name: string;
    product_stock_details: { stock: number }[];
  };
  unit: { name: string };
  price: { price: number; sale_price: number }[];
}

interface Product {
  id: number;
  name: string;
  description: string | null;
  min_stock: number | null;
  category: {
    id: number;
    name: string;
  };
  product_unit_details: {
    id: number;
    code: string;
    quantity: number;
    unit: {
      name: string;
    };
    price: {
      price: number;
      sale_price: number;
    }[];
  }[];
  product_stock_details: {
    capital: number;
    stock: number;
  }[];
}

interface PayloadCreateProduct {
  name: string;
  category_id: number;
  description: string;
  min_stock: number;
  unit_detail: {
    unit_id: number;
    code: string;
    quantity: number;
    price: number;
    sale_price: number;
  }[];
  stock_detail: {
    capital: number;
    stock: number;
  }[];
}

interface PayloadUpdateProduct {
  name: string;
  category_id: number;
  description: string;
  min_stock: number;
}

interface PayloadUpdateProductCode {
  code: string;
}

interface PayloadUpdateProductPrice {
  price: number;
  sale_price: number;
}

interface PayloadUpdateProductStock {
  stock_detail: {
    capital: number;
    stock: number;
  }[];
}
