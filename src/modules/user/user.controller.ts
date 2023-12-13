import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('userDetail')
  async getUserDetail(@Param('id') id: number) {
    const data = await this.userService.findOne(id);
    console.log('🚀-  -> getUserDetail  -> data:', data);
    return data;
  }
}
