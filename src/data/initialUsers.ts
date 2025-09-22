import type { User } from "../types";

export const ADMIN_PASSWORD = "admin123"; // demo only

export const initialUsers: User[] = [
  {
    id: 1,
    name: "PEIX",
    payments: { q1: false, q2: true, q3: false, q4: false }
  },
  {
    id: 2,
    name: "POCHI",
    payments: { q1: true, q2: true, q3: true, q4: false }
  },
  {
    id: 3,
    name: "PUMU",
    payments: { q1: true, q2: false, q3: false, q4: false }
  },
  {
    id: 4,
    name: "VERO",
    payments: { q1: false, q2: false, q3: true, q4: true }
  },
  {
    id: 5,
    name: "LLUC",
    payments: { q1: true, q2: true, q3: false, q4: false }
  },
  {
    id: 6,
    name: "AITOR",
    payments: { q1: true, q2: true, q3: false, q4: false }
  },
  {
    id: 7,
    name: "YVONNE",
    payments: { q1: true, q2: true, q3: false, q4: false }
  },
  {
    id: 8,
    name: "CALLE",
    payments: { q1: true, q2: true, q3: false, q4: false }
  },
  {
    id: 9,
    name: "RENA",
    payments: { q1: true, q2: true, q3: false, q4: false }
  },
  {
    id: 10,
    name: "RAUL",
    payments: { q1: true, q2: true, q3: false, q4: false }
  },
  {
    id: 11,
    name: "NIL",
    payments: { q1: true, q2: true, q3: false, q4: false }
  },
  {
    id: 12,
    name: "TROME",
    payments: { q1: true, q2: true, q3: false, q4: false }
  },
  {
    id: 13,
    name: "VISO",
    payments: { q1: true, q2: true, q3: false, q4: false }
  }
];
