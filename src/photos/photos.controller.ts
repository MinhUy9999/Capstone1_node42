import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get()
  findAll(@Query('name') name: string) {
    return this.photosService.findAll(name);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.photosService.findOne(+id);
  }

  @Post()
  create(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photosService.create(createPhotoDto);
  }
}
