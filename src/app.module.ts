import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { PhotosModule } from './photos/photos.module';
import { PrismaService } from './prisma/prisma.service';
import { SavedModule } from './saved/saved.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, PhotosModule, UsersModule, CommentsModule, SavedModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
