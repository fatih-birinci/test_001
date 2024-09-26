import { createUser, getUserByEmail, validatePassword } from '../services/userService';
import bcrypt from 'bcryptjs';
import { hashPassword } from '../utils/auth';
import { mockUser } from './mocks';
import {expect, jest, describe, beforeEach, it} from '@jest/globals';

jest.mock('../utils/auth', () => ({
  hashPassword: jest.fn<() => Promise<string>>().mockResolvedValue('hashedPassword'),
}));

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('User Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockResolvedValue({
      id: '1',
      username: 'username',
      email: 'test@example.com',
      password: 'hashedPassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const user = await createUser('username', 'test@example.com', 'password');
    expect(user).toEqual(expect.objectContaining({
      id: expect.any(String),
      username: 'username',
      email: 'test@example.com',
      password: 'hashedPassword',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    }));
    expect(hashPassword).toHaveBeenCalledWith('password');
  });

  it('should throw an error if username already exists', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: '1',
      username: 'username',
      email: 'test@example.com',
      password: 'hashedPassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await expect(createUser('username', 'test2@example.com', 'password')).rejects.toThrow('Username already exists');
  });

  it('should validate password', async () => {
    (bcrypt.compare as jest.Mock<(a:string, b:string) => Promise<boolean>>).mockResolvedValue(true);
    const isValid = await validatePassword(mockUser, 'password');
    expect(isValid).toBe(true);
  });

  it('should invalidate incorrect password', async () => {
    (bcrypt.compare as jest.Mock<(a:string, b:string) => Promise<boolean>>).mockResolvedValue(false);
    const isValid = await validatePassword(mockUser, 'wrongpassword');
    expect(isValid).toBe(false);
  });
});