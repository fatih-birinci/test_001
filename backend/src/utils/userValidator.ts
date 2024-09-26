import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../utils/auth';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const createUser = async (username: string, email: string, password: string) => {
  const hashedPassword = await hashPassword(password);
  return prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export async function validatePassword(user: any, password: string) {
  return bcrypt.compare(password, user.password);
}

export const createRole = async (name: string) => {
  return prisma.role.create({ data: { name } });
};
  
export const assignRoleToUser = async (userId: string, roleId: string) => {
  return prisma.userRole.create({
    data: {
      userId,
      roleId,
    },
  });
};
  
export const createPermission = async (name: string) => {
  return prisma.permission.create({ data: { name } });
};
  
export const assignPermissionToRole = async (roleId: string, permissionId: string) => {
  return prisma.rolePermission.create({
    data: {
      roleId,
      permissionId,
    },
  });
};