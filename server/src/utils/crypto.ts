import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  const saltRound: number = +(process.env.HASH_SALT_ROUND || 1);

  const salt = await bcrypt.genSalt(saltRound);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

export async function checkPassword(requestPassword: string, passwordOnDB: string): Promise<boolean> {
  const result = bcrypt.compare(requestPassword, passwordOnDB);

  return result;
}
