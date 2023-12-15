import * as bcrypt from 'bcrypt';
import {
  generateAccessToken,
  hashPassword,
} from '../../utils/functions/auth.helpers.js';
import HttpException from '../../utils/http-exception.js';
import Prisma from '../../prisma.js';
import { UserRole } from '../../utils/constants.js';

async function login({ email, password }) {
  const user = await Prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    throw new HttpException('User not found', 401);
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new HttpException('Invalid login', 401);
  }

  return {
    access_token: generateAccessToken(user.id, user.role),
  };
}

async function register({ email, name, password, userRole }) {
  const user = await Prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    throw new HttpException('User already exists', 409);
  }
  const hash = await hashPassword(password);

  if (userRole === UserRole.PROFESSOR) {
    await Prisma.professor.create({
      data: {
        user: {
          create: {
            email: email,
            name: name,
            role: userRole,
            password: hash,
          },
        },
      },
    });
  } else if (userRole === UserRole.STUDENT) {
    await Prisma.student.create({
      data: {
        user: {
          create: {
            email: email,
            name: name,
            role: userRole,
            password: hash,
          },
        },
      },
    });
  } else {
    throw new HttpException('Invalid user role', 400);
  }

  return {
    message: 'User created',
  };
}

async function getMyProfile(userId) {
  const user = await Prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new HttpException('User not found', 404);
  }

  return {
    id: user.id,
    role: user.role,
    name: user.name,
  };
}

export { login, register, getMyProfile };
