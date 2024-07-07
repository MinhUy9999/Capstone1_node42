import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.mat_khau, 10);
    const user = await this.prisma.nguoi_dung.create({
      data: {
        ...createUserDto,
        mat_khau: hashedPassword,
      },
    });

    const token = this.jwtService.sign({ userId: user.nguoi_dung_id });
    return { token };
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.nguoi_dung.findFirst({
      where: { email: loginDto.email },
    });

    if (!user || !(await bcrypt.compare(loginDto.mat_khau, user.mat_khau))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ userId: user.nguoi_dung_id });
    return { token };
  }
}
