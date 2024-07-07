import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SavedService {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: number) {
    return this.prisma.luu_anh.findMany({
      where: { nguoi_dung_id: userId },
      include: {
        hinh_anh: true,
      },
    });
  }

  async savePhoto(userId: number, photoId: number) {
    return this.prisma.luu_anh.create({
      data: {
        nguoi_dung_id: userId,
        hinh_id: photoId,
        ngay_luu: new Date(),
      },
    });
  }

  async deleteSavedPhoto(userId: number, photoId: number) {
    return this.prisma.luu_anh.deleteMany({
      where: {
        nguoi_dung_id: userId,
        hinh_id: photoId,
      },
    });
  }
}
