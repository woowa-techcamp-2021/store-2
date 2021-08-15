import { checkUserExists, createUser } from 'repositories/user';

import { createToken } from 'utils/jwt';
import { hashPassword } from 'utils/crypto';

interface IToken {
  accessToken: string;
  refreshToken: string;
}

async function signUp(user_id: string, password: string): Promise<IToken> {
  await checkUserExists(user_id);

  const hashedPassword = await hashPassword(password);

  const user = await createUser(user_id, hashedPassword);

  const uid = user.getDataValue('id');

  const accessToken = createToken('access', { uid });
  const refreshToken = createToken('refresh', { uid });

  return { accessToken, refreshToken };
}

export default { signUp };
