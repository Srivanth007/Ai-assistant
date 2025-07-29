import { prisma } from './prisma';
import bcrypt from 'bcrypt';

export async function registerUser(email, password) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error('User already exists');

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
    },
  });

  return user;
}

export async function loginUser(email, password) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const session = await prisma.session.create({
    data: {
      userId: user.id,
    },
  });

  return { user, session };
}

export async function getUserToken(userId, provider) {
  const token = await prisma.account.findFirst({
    where: {
      userId,
      provider,
    },
  });
  return token;
}

