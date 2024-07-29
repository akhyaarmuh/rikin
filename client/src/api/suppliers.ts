import { myFetch } from '.';

export const createSupplier = async (
  payload: PayloadCreateSupplier
): Promise<Supplier> => {
  const response = await myFetch('/suppliers', {
    withToken: true,
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response.data;
};

export const getAllSupplier = async (
  queries: any = {}
): Promise<ResponseAPI<Supplier>> => {
  const response = await myFetch(`/suppliers?${new URLSearchParams(queries)}`);

  return response;
};

export const updateSupplierById = async (id: number, payload: PayloadUpdateSupplier) => {
  await myFetch(`/suppliers/${id}`, {
    withToken: true,
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

export const deleteSupplierById = async (id: number): Promise<Supplier> => {
  const response = await myFetch(`/suppliers/${id}`, {
    withToken: true,
    method: 'DELETE',
  });

  return response.data;
};
