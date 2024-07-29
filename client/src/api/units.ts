import { myFetch } from '.';

export const createUnit = async (payload: PayloadCreateUnit): Promise<Unit> => {
  const response = await myFetch('/units', {
    withToken: true,
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response.data;
};

/**
 * @tittle Gat All Unit API
 */
export const getAllUnit = async (queries: any = {}): Promise<ResponseAPI<Unit>> => {
  const response = await myFetch(`/units?${new URLSearchParams(queries)}`);

  return response;
};

/**
 * @tittle Update Unit API
 */
export const updateUnitById = async (id: number, payload: PayloadUpdateUnit) => {
  await myFetch(`/units/${id}`, {
    withToken: true,
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

/**
 * @tittle Delete Unit API
 */
export const deleteUnitById = async (id: number): Promise<Unit> => {
  const response = await myFetch(`/units/${id}`, {
    withToken: true,
    method: 'DELETE',
  });

  return response.data;
};
