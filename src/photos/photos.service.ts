import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './entities/photo.entity';
import { hinh_anh } from '@prisma/client';


@Injectable()
export class PhotosService {
  constructor(private readonly prisma: PrismaService) {}

  // constructor(private readonly prisma: PrismaService, 
  //   @InjectModel(Photo)
  // private readonly photoModel: typeof Photo,) {}

  async findAll(name?: string) {
    return this.prisma.hinh_anh.findMany({
      where: name ? { mo_ta: { contains: name } } : {},
    });
  }

  async findOne(id: number) {
    return this.prisma.hinh_anh.findUnique({
      where: { hinh_id: id },
    });
  }
  async create(createPhotoDto: CreatePhotoDto): Promise<hinh_anh> {
    const createdPhoto = await this.prisma.hinh_anh.create({
      data: {
        ten_hinh: createPhotoDto.ten_hinh,
        duong_dan: createPhotoDto.duong_dan,
        mo_ta: createPhotoDto.mo_ta,
        nguoi_dung_id: createPhotoDto.nguoi_dung_id,
      },
    });
    return createdPhoto;
  }
}
