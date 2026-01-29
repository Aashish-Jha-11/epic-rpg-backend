import Database from "../config/database";
import bcrypt from "bcryptjs";
import { UserDocument, UserInterface } from "../interfaces/user.interface";

class UserRepository {
  private prisma = Database.getInstance();

  async create(userData: UserInterface): Promise<UserDocument> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    return await this.prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        isActive: userData.isActive
      }
    });
  }

  async findById(id: string): Promise<UserDocument | null> {
    return await this.prisma.user.findUnique({
      where: { id }
    });
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.prisma.user.findUnique({
      where: { email }
    });
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return await this.prisma.user.findUnique({
      where: { username }
    });
  }

  async update(
    id: string,
    updateData: Partial<UserInterface>
  ): Promise<UserDocument | null> {
    const data: any = {};

    if (updateData.username) data.username = updateData.username;
    if (updateData.email) data.email = updateData.email;
    if (updateData.password) {
      data.password = await bcrypt.hash(updateData.password, 10);
    }
    if (updateData.isActive !== undefined) data.isActive = updateData.isActive;

    return await this.prisma.user.update({
      where: { id },
      data
    });
  }

  async comparePassword(
    user: UserDocument,
    candidatePassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, user.password);
  }
}

export default UserRepository;
