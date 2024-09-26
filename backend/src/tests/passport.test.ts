import passport from '../config/passport';
import { getUserByEmail, validatePassword } from '../services/userService';
import { mockUser } from './mocks';
import {expect, jest, describe, beforeEach, it} from '@jest/globals';

jest.mock('../services/userService');

describe('Passport Local Strategy', () => {

  beforeEach(() => {
    (getUserByEmail as jest.Mock).mockClear();
    (validatePassword as jest.Mock).mockClear();
  });

  it('should authenticate user with correct email and password', async () => {
    (getUserByEmail as jest.Mock<(email:string) => any>).mockResolvedValue(mockUser);
    (validatePassword as jest.Mock<(user: any, password: string) => Promise<boolean>>).mockResolvedValue(true);    (validatePassword as jest.Mock<(user: any, password: string) => Promise<boolean>>).mockResolvedValue(true);

    const done = jest.fn();
    await passport.authenticate('local', (err: Error | null, user: any, info: any) => {
      expect(err).toBeNull();
      expect(user).toEqual(mockUser);
      expect(info).toBeUndefined();
    })({ body: { email: 'test@example.com', password: 'password' } }, {}, done);
  });

  it('should fail authentication with incorrect email', async () => {
    (getUserByEmail as jest.Mock<(email:string) => any>).mockResolvedValue(null);

    const done = jest.fn();
    await passport.authenticate('local', (err: any, user: any, info: any) => {
      expect(err).toBeNull();
      expect(user).toBeFalsy();
      expect(info.message).toBe('Incorrect email.');
    })({ body: { email: 'wrong@example.com', password: 'password' } }, {}, done);
  });

  it('should fail authentication with incorrect password', async () => {
    (getUserByEmail as jest.Mock<(email:string) => any>).mockResolvedValue(mockUser);
    (validatePassword as jest.Mock<(user: any, password: string) => Promise<boolean>>).mockResolvedValue(false);

    const done = jest.fn();
    await passport.authenticate('local', (err: any, user: any, info: any) => {
      expect(err).toBeNull();
      expect(user).toBeFalsy();
      expect(info.message).toBe('Incorrect password.');
    })({ body: { email: 'test@example.com', password: 'wrongpassword' } }, {}, done);
  });
});