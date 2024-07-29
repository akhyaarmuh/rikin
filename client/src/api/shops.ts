import { myFetch } from '.';

export const createShop = async (payload: PayloadCreateShop): Promise<Shop> => {
  const response = await myFetch('/shops', {
    withToken: true,
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response.data;
};

export const getAllShop = async (queries: any = {}): Promise<ResponseAPI<Shop>> => {
  const response = await myFetch(`/shops?${new URLSearchParams(queries)}`);

  return response;
};

export const updateShopById = async (id: number, payload: PayloadUpdateShop) => {
  await myFetch(`/shops/${id}`, {
    withToken: true,
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

export const activateShopById = async (id: number, payload: PayloadUpdateLK) => {
  await myFetch(`/shops/${id}/activate-shop`, {
    withToken: true,
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

export const deleteShopById = async (id: number): Promise<Shop> => {
  const response = await myFetch(`/shops/${id}`, {
    withToken: true,
    method: 'DELETE',
  });

  return response.data;
};
