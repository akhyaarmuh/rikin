import { myFetch } from '.';

export const createCustomer = async (
  payload: PayloadCreateCustomer
): Promise<Customer> => {
  const response = await myFetch('/customers', {
    withToken: true,
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response.data;
};

export const getAllCustomer = async (
  queries: any = {}
): Promise<ResponseAPI<Customer>> => {
  const response = await myFetch(`/customers?${new URLSearchParams(queries)}`);

  return response;
};

export const updateCustomerById = async (id: number, payload: PayloadUpdateCustomer) => {
  await myFetch(`/customers/${id}`, {
    withToken: true,
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

export const deleteCustomerById = async (id: number): Promise<Customer> => {
  const response = await myFetch(`/customers/${id}`, {
    withToken: true,
    method: 'DELETE',
  });

  return response.data;
};
