import { User } from "@prisma/client";

export interface UserInterface {
  username: string;
  email: string;
  password: string;
  isActive: boolean;
}

export type UserDocument = User;

export interface AuthPayload {
  userId: string;
  username: string;
  email: string;
}
