import { myFetch } from '.';

export const createEmploye = async (payload: PayloadCreateEmploye): Promise<Employe> => {
  const response = await myFetch('/employe', {
    withToken: true,
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response.data;
};

export const getAllEmploye = async (queries: any = {}): Promise<ResponseAPI<Employe>> => {
  const response = await myFetch(`/employe?${new URLSearchParams(queries)}`);

  return response;
};

export const updateEmployeById = async (id: number, payload: PayloadUpdateEmploye) => {
  await myFetch(`/employe/${id}`, {
    withToken: true,
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

export const deleteEmployeById = async (id: number): Promise<Employe> => {
  const response = await myFetch(`/employe/${id}`, {
    withToken: true,
    method: 'DELETE',
  });

  return response.data;
};
