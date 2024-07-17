import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { PhotosModule } from './photos/photos.module';
import { PrismaService } from './prisma/prisma.service';
import { SavedModule } from './saved/saved.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppService } from './app.service';

@Module({
  imports: [AuthModule, PhotosModule, UsersModule, CommentsModule, SavedModule, PrismaModule],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule {}
