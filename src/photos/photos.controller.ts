import { Controller, Get, Param, Post, Delete, Body, Query } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get()
  async findAll(@Query('ten_hinh') name?: string) {
    return this.photosService.findAll(name);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.photosService.findOne(parseInt(id, 10));
  }

  @Get(':id/comments')
  async findComments(@Param('id') id: string) {
    return this.photosService.findCommentsByPhotoId(parseInt(id, 10));
  }

  @Get(':id/saved')
  async findSaved(@Param('id') id: string) {
    return this.photosService.findSavedByPhotoId(parseInt(id, 10));
  }

  @Get('user/:userId/photos')
  async findPhotosByUserId(@Param('userId') userId: string) {
    return this.photosService.findPhotosByUserId(parseInt(userId, 10));
  }

  @Get('user/:userId/saved-photos')
  async findSavedPhotosByUserId(@Param('userId') userId: string) {
    return this.photosService.findSavedPhotosByUserId(parseInt(userId, 10));
  }

  @Get('user/:userId')
  async findUserById(@Param('userId') userId: string) {
    return this.photosService.findUserById(parseInt(userId, 10));
  }

  @Post(':id/comments')
  async createComment(@Param('id') id: string, @Body() body: { userId: number, content: string }) {
    return this.photosService.createComment(parseInt(id, 10), body.userId, body.content);
  }

  @Post()
  async create(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photosService.create(createPhotoDto);
  }

  @Delete(':id')
  async deletePhoto(@Param('id') id: string) {
    return this.photosService.deletePhotoById(parseInt(id, 10));
  }
}
