import { myFetch } from '.';

export const updateUserById = async (id: number, payload: PayloadUpdateUser) => {
  await myFetch(`/users/${id}`, {
    withToken: true,
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

export const updateUserPasswordById = async (
  id: number,
  payload: PayloadUpdatePassword
) => {
  await myFetch(`/users/${id}/password`, {
    withToken: true,
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};
