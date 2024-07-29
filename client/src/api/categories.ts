import { myFetch } from '.';

export const createCategory = async (
  payload: PayloadCreateCategory
): Promise<Category> => {
  const response = await myFetch('/categories', {
    withToken: true,
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response.data;
};

export const getAllCategory = async (
  queries: any = {}
): Promise<ResponseAPI<Category>> => {
  const response = await myFetch(`/categories?${new URLSearchParams(queries)}`);

  return response;
};

export const updateCategoryById = async (id: number, payload: PayloadUpdateCategory) => {
  await myFetch(`/categories/${id}`, {
    withToken: true,
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

export const deleteCategoryById = async (id: number): Promise<Category> => {
  const response = await myFetch(`/categories/${id}`, {
    withToken: true,
    method: 'DELETE',
  });

  return response.data;
};
