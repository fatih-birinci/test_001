import { Request, Response } from 'express';
import { getUserByEmail, updateUserPassword, createUser } from '../services/userService';
import { generateToken, verifyToken, comparePasswords } from '../utils/auth';
import nodemailer from 'nodemailer';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../../types';

const isMinLength = (password: string) => password.length >= 8;
const isMaxLength = (password: string) => password.length <= 64;
const hasUppercase = (password: string) => /[A-Z]/.test(password);
const hasLowercase = (password: string) => /[a-z]/.test(password);
const hasDigit = (password: string) => /[0-9]/.test(password);
const hasSpecialChar = (password: string) => /[!@#$%^&*]/.test(password);

const validateMinimumPasswordRequirements = (password: string) => {
  return [
    isMinLength,
    isMaxLength,
    hasUppercase,
    hasLowercase,
    hasDigit,
    hasSpecialChar
  ].every(check => check(password));
};

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateUsername = (username: string) => {
  const usernameRegex = /^[a-zA-Z0-9_]+$/; // Only allows alphanumeric characters and underscores
  return username && usernameRegex.test(username);
};

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!validateUsername(username)) {
    return res.status(400).json({ error: 'Invalid username. Only alphanumeric characters and underscores are allowed.' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  if (!validateMinimumPasswordRequirements(password)) {
    return res.status(400).json({ error: 'Password does not meet the requirements.' });
  }

  try {
    const user = await createUser(username, email, password);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'User registration failed' });
  }
};

export const health = (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Service is healthy' });
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    const token = generateToken(user.id);
    res.json({ message: 'Logged in successfully', user, token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

export const logout = async (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Logged out successfully' });
  });
}

export const generatePasswordResetToken = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const token = generateToken(user.id);

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Password Reset',
    text: `You requested a password reset. Click the link to reset your password: http://localhost:3000/reset-password?token=${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error); // Log the error for debugging
        return res.status(500).json({ error: 'Error sending email' });
    }
    res.status(200).json({ message: 'Password reset email sent' });
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = verifyToken(token) as JwtPayload;
    const userId = decoded.userId;
    await updateUserPassword(userId, newPassword);
    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid or expired token' });
  }
};