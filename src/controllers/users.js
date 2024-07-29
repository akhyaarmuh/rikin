import bcrypt from 'bcrypt';

import { prismaClient } from '../app.js';
import ErrorResponse from '../utilities/error-response.js';

export const updateUserById = async (req, res, next) => {
  const { id } = req.params;
  const { full_name } = req.body;

  try {
    await prismaClient.users.update({
      where: { id: Number(id) },
      data: { full_name },
    });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const updatePasswordById = async (req, res, next) => {
  const { id } = req.params;
  const { password, newPassword } = req.body;

  try {
    const user = await prismaClient.users.findFirst({ where: { id: Number(id) } });

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new ErrorResponse(`Katasandi salah`, 400);

    await prismaClient.users.update({
      where: { id },
      data: { password: bcrypt.hashSync(newPassword, 10) },
    });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
