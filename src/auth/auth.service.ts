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
        email: createUserDto.email,
        mat_khau: hashedPassword,
        ho_ten: createUserDto.ho_ten,
        tuoi: createUserDto.tuoi,
      },
    });
  
    const token = this.jwtService.sign({ userId: user.nguoi_dung_id });
    return {
      user: {
        nguoi_dung_id: user.nguoi_dung_id,
        email: user.email,
        ho_ten: user.ho_ten,
        tuoi: user.tuoi,
      },
      token
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.nguoi_dung.findFirst({
      where: { email: loginDto.email },
    });

    if (!user || !(await bcrypt.compare(loginDto.mat_khau, user.mat_khau))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ userId: user.nguoi_dung_id });
    return {
      user: {
        nguoi_dung_id: user.nguoi_dung_id,
        email: user.email,
        ho_ten: user.ho_ten,
        tuoi: user.tuoi,
      },
      token
    };
  }
}
