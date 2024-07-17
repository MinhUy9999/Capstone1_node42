import { Controller, Put, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put(':userId')
  async updateUser(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(parseInt(userId, 10), updateUserDto);
  }
}
