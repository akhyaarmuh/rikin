export interface ProductCart {
  id: number;
  unit_detail_id: number;
  code: string;
  type: 'price' | 'sale_price';
  stock: number;
  prices: {
    price: number;
    sale_price: number;
  };

  name: string;
  unit: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Draft {
  customerId: number;
  products: ProductCart[];
}
