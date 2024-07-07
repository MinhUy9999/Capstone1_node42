import { Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { SavedService } from './saved.service';

@Controller('saved')
export class SavedController {
  constructor(private readonly savedService: SavedService) {}

  @Get('user/:id')
  findByUserId(@Param('id') id: string) {
    return this.savedService.findByUserId(+id);
  }

  @Post('user/:userId/photo/:photoId')
  savePhoto(@Param('userId') userId: string, @Param('photoId') photoId: string) {
    return this.savedService.savePhoto(+userId, +photoId);
  }

  @Delete('user/:userId/photo/:photoId')
  deleteSavedPhoto(@Param('userId') userId: string, @Param('photoId') photoId: string) {
    return this.savedService.deleteSavedPhoto(+userId, +photoId);
  }
}
