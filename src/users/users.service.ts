import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { nguoi_dung } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<nguoi_dung> {
    const user = await this.prisma.nguoi_dung.findUnique({
      where: { nguoi_dung_id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return this.prisma.nguoi_dung.update({
      where: { nguoi_dung_id: userId },
      data: updateUserDto,
    });
  }
}
