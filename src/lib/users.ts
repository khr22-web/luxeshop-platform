import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
  wishlist: string[];
}

const DATA_DIR = process.env.VERCEL ? "/tmp" : path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function getUsers(): User[] {
  ensureDir();
  if (!fs.existsSync(USERS_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function saveUsers(users: User[]) {
  ensureDir();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

export function getUserByEmail(email: string): User | null {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export function getUserById(id: string): User | null {
  return getUsers().find((u) => u.id === id) || null;
}

export async function createUser(email: string, name: string, password: string): Promise<User> {
  const users = getUsers();
  if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("Email already registered");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user: User = {
    id: `user_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    email,
    name,
    passwordHash,
    createdAt: new Date().toISOString(),
    wishlist: [],
  };
  users.push(user);
  saveUsers(users);
  return user;
}

export async function verifyPassword(user: User, password: string): Promise<boolean> {
  return bcrypt.compare(password, user.passwordHash);
}

export function updateUserWishlist(userId: string, wishlist: string[]): void {
  const users = getUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx !== -1) {
    users[idx].wishlist = wishlist;
    saveUsers(users);
  }
}
