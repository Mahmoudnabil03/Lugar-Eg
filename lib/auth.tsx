"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Role = "admin" | "employee" | "client";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: number;
}

interface StoredUser extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (name: string, email: string, password: string) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  googleSignIn: () => Promise<never>;
  logout: () => void;
  createEmployee: (name: string, email: string, password: string) => Promise<User>;
  listEmployees: () => User[];
  deleteUser: (id: string) => void;
}

const USERS_KEY = "lugar_users";
const SESSION_KEY = "lugar_session";
// Temporary seed admin for the pre-backend phase. Replace with real auth wiring.
const SEED_ADMIN_EMAIL = "admin@lugar-eg.com";

function roleFor(email: string): Role {
  const e = email.trim().toLowerCase();
  if (e === SEED_ADMIN_EMAIL) return "admin";
  if (e.endsWith("@lugar-eg.com")) return "employee";
  return "client";
}

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

const strip = (u: StoredUser): User => ({ id: u.id, name: u.name, email: u.email, role: u.role, createdAt: u.createdAt });

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Seed the admin account once (temporary until real backend).
    const users = readUsers();
    if (!users.some((u) => u.email === SEED_ADMIN_EMAIL)) {
      users.push({
        id: "seed-admin",
        name: "Lugar Admin",
        email: SEED_ADMIN_EMAIL,
        password: "admin123",
        role: "admin",
        createdAt: Date.now(),
      });
      writeUsers(users);
    }
    try {
      const sessionId = localStorage.getItem(SESSION_KEY);
      if (sessionId) {
        const found = readUsers().find((u) => u.id === sessionId);
        if (found) setUser(strip(found));
      }
    } catch {
      /* ignore */
    }
    setLoading(false);
  }, []);

  const persist = (u: StoredUser) => {
    localStorage.setItem(SESSION_KEY, u.id);
    setUser(strip(u));
  };

  const signup = async (name: string, email: string, password: string) => {
    const e = email.trim().toLowerCase();
    if (!name.trim() || !e || password.length < 6) throw new Error("Invalid name, email, or password (min 6 chars).");
    const users = readUsers();
    if (users.some((u) => u.email === e)) throw new Error("An account with this email already exists.");
    const nu: StoredUser = { id: `u-${Date.now()}`, name: name.trim(), email: e, password, role: roleFor(e), createdAt: Date.now() };
    users.push(nu);
    writeUsers(users);
    persist(nu);
    return strip(nu);
  };

  const login = async (email: string, password: string) => {
    const e = email.trim().toLowerCase();
    const found = readUsers().find((u) => u.email === e && u.password === password);
    if (!found) throw new Error("Wrong email or password.");
    persist(found);
    return strip(found);
  };

  const googleSignIn = async (): Promise<never> => {
    // Wired tomorrow with the real OAuth client.
    throw new Error("GOOGLE_NOT_WIRED");
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const createEmployee = async (name: string, email: string, password: string) => {
    const e = email.trim().toLowerCase();
    if (!e.endsWith("@lugar-eg.com")) throw new Error("Employee email must end with @lugar-eg.com.");
    if (password.length < 6) throw new Error("Password must be at least 6 characters.");
    const users = readUsers();
    if (users.some((u) => u.email === e)) throw new Error("An account with this email already exists.");
    const nu: StoredUser = { id: `u-${Date.now()}`, name: name.trim(), email: e, password, role: "employee", createdAt: Date.now() };
    users.push(nu);
    writeUsers(users);
    return strip(nu);
  };

  const listEmployees = () => readUsers().filter((u) => u.role === "employee").map(strip);

  const deleteUser = (id: string) => {
    writeUsers(readUsers().filter((u) => u.id !== id));
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, googleSignIn, logout, createEmployee, listEmployees, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
