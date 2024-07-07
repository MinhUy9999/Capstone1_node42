import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto) {
    return this.prisma.binh_luan.create({
      data: createCommentDto,
    });
  }

  async findAll() {
    return this.prisma.binh_luan.findMany();
  }

  async findOne(id: number) {
    return this.prisma.binh_luan.findUnique({
      where: { binh_luan_id: id },
    });
  }

  async findByPhotoId(photoId: number) {
    return this.prisma.binh_luan.findMany({
      where: { hinh_id: photoId },
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.prisma.binh_luan.update({
      where: { binh_luan_id: id },
      data: updateCommentDto,
    });
  }

  async remove(id: number) {
    return this.prisma.binh_luan.delete({
      where: { binh_luan_id: id },
    });
  }
}
