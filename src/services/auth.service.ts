import jwt from "jsonwebtoken";
import UserRepository from "../repositories/user.repository";
import { UserInterface, AuthPayload } from "../interfaces/user.interface";

class AuthService {
  private userRepository: UserRepository;
  private jwtSecret: string;
  private jwtExpire: string;

  constructor() {
    this.userRepository = new UserRepository();
    this.jwtSecret = process.env.JWT_SECRET || "default-secret-change-this";
    this.jwtExpire = process.env.JWT_EXPIRE || "7d";
  }

  async register(userData: UserInterface): Promise<{ token: string; user: any }> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("Email already registered hai bhai!");
    }

    const existingUsername = await this.userRepository.findByUsername(
      userData.username
    );
    if (existingUsername) {
      throw new Error("Username le liya kisi ne pehle se!");
    }

    const user = await this.userRepository.create(userData);
    const token = this.generateToken({
      userId: user.id,
      username: user.username,
      email: user.email
    });

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    };
  }

  async login(
    email: string,
    password: string
  ): Promise<{ token: string; user: any }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Email ya password galat hai!");
    }

    const isPasswordValid = await this.userRepository.comparePassword(
      user,
      password
    );
    if (!isPasswordValid) {
      throw new Error("Email ya password galat hai!");
    }

    const token = this.generateToken({
      userId: user.id,
      username: user.username,
      email: user.email
    });

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    };
  }

  verifyToken(token: string): AuthPayload {
    try {
      return jwt.verify(token, this.jwtSecret) as AuthPayload;
    } catch (error) {
      throw new Error("Invalid token hai bhai!");
    }
  }

  private generateToken(payload: AuthPayload): string {
    return jwt.sign(payload, this.jwtSecret, { expiresIn: this.jwtExpire });
  }
}

export default AuthService;
