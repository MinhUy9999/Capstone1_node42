import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { binh_luan, hinh_anh, luu_anh, nguoi_dung } from '@prisma/client';

@Injectable()
export class PhotosService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(name?: string): Promise<hinh_anh[]> {
    if (name) {
      // Workaround for case-insensitive search
      const photos = await this.prisma.hinh_anh.findMany();
      return photos.filter(photo =>
        photo.ten_hinh.toLowerCase().includes(name.toLowerCase())
      );
    }
    return this.prisma.hinh_anh.findMany();
  }

  async findOne(id: number): Promise<hinh_anh> {
    return this.prisma.hinh_anh.findUnique({
      where: { hinh_id: id },
      include: { nguoi_dung: true }, 
    });
    
  }
  async findCommentsByPhotoId(id: number): Promise<binh_luan[]> {
    return this.prisma.binh_luan.findMany({
      where: { hinh_id: id },
      include: { nguoi_dung: true }, // Include user information
    });
  }

  async findSavedByPhotoId(id: number): Promise<luu_anh[]> {
    return this.prisma.luu_anh.findMany({
      where: { hinh_id: id },
    });
  }
  async findPhotosByUserId(userId: number): Promise<hinh_anh[]> {
    return this.prisma.hinh_anh.findMany({
      where: { nguoi_dung_id: userId },
    });
  }
  async findSavedPhotosByUserId(userId: number): Promise<luu_anh[]> {
    return this.prisma.luu_anh.findMany({
      where: { nguoi_dung_id: userId },
      include: { hinh_anh: true }, // Include photo information
    });
  }
  async findUserById(userId: number): Promise<nguoi_dung> {
    const user = await this.prisma.nguoi_dung.findUnique({
      where: { nguoi_dung_id: userId },
    });
    return user;
  }
  async create(createPhotoDto: CreatePhotoDto): Promise<hinh_anh> {
    return this.prisma.hinh_anh.create({
      data: {
        ten_hinh: createPhotoDto.ten_hinh,
        duong_dan: createPhotoDto.duong_dan,
        mo_ta: createPhotoDto.mo_ta,
        nguoi_dung_id: createPhotoDto.nguoi_dung_id,
      },
    });
  }
  async createComment(photoId: number, userId: number, content: string): Promise<binh_luan> {
    return this.prisma.binh_luan.create({
      data: {
        hinh_id: photoId,
        nguoi_dung_id: userId,
        ngay_binh_luan: new Date(),
        noi_dung: content,
      },
    });
}
async deletePhotoById(id: number): Promise<hinh_anh> {
  // Delete related comments
  await this.prisma.binh_luan.deleteMany({
    where: { hinh_id: id },
  });

  // Delete related saved photos
  await this.prisma.luu_anh.deleteMany({
    where: { hinh_id: id },
  });

  const photo = await this.prisma.hinh_anh.findUnique({
    where: { hinh_id: id },
  });


  return this.prisma.hinh_anh.delete({
    where: { hinh_id: id },
  });

}}
