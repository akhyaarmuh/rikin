import { myFetch } from '.';

export const createProduct = async (payload: PayloadCreateProduct): Promise<Product> => {
  const response = await myFetch('/products', {
    withToken: true,
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response.data;
};

export const getAllProduct = async (queries: any = {}): Promise<ResponseAPI<Product>> => {
  const response = await myFetch(`/products?${new URLSearchParams(queries)}`);

  return response;
};

export const getAllProductForSale = async (
  queries: any = {}
): Promise<ResponseAPI<ProductForSale>> => {
  const response = await myFetch(`/products/for-sale?${new URLSearchParams(queries)}`);

  return response;
};

export const getProductByCode = async (code: string): Promise<ProductByCode> => {
  const response = await myFetch(`/products/${code}/code`);

  return response.data;
};

export const updateProductById = async (id: number, payload: PayloadUpdateProduct) => {
  await myFetch(`/products/${id}`, {
    withToken: true,
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

export const updateProductCodeById = async (
  unitDetailId: number,
  payload: PayloadUpdateProductCode
) => {
  await myFetch(`/products/${unitDetailId}/code`, {
    withToken: true,
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

export const updateProductPriceById = async (
  unitDetailId: number,
  payload: PayloadUpdateProductPrice
) => {
  await myFetch(`/products/${unitDetailId}/price`, {
    withToken: true,
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

export const updateProductStockById = async (
  productId: number,
  payload: PayloadUpdateProductStock
) => {
  await myFetch(`/products/${productId}/stock`, {
    withToken: true,
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

export const deleteProductById = async (id: number): Promise<Product> => {
  const response = await myFetch(`/products/${id}`, {
    withToken: true,
    method: 'DELETE',
  });

  return response.data;
};
