import { Request, Response } from "express";
import prisma from "../prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { error } from "console";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { id, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      res.status(400).json({ message: "User does not exist" });
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(400).json({ message: "Invalid password" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    return;
  }
};
