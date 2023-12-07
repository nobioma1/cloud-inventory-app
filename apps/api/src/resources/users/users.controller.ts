import { Controller, Get } from '@nestjs/common';

import { AuthPayload } from 'resources/authentication/types';
import { Auth } from 'resources/authentication/decorators/auth.decorator';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getCurrentUser(@Auth() auth: AuthPayload) {
    return this.usersService.findOrCreate({ uid: auth.sub });
  }
}
