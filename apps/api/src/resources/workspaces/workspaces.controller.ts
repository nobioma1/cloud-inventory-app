import { Controller, Get } from '@nestjs/common';

import { UsersService } from 'resources/users/users.service';
import { AuthPayload } from 'resources/authentication/types';
import { Auth } from 'resources/authentication/decorators/auth.decorator';
import { WorkspacesService } from './workspaces.service';

@Controller('workspaces')
export class WorkspacesController {
  constructor(
    private readonly userService: UsersService,
    private readonly workspacesService: WorkspacesService,
  ) {}

  @Get()
  async fetchWorkspace(@Auth() auth: AuthPayload) {
    const user = await this.userService.findOrCreate({ uid: auth.sub });
    return this.workspacesService.selectWorkspace(user);
  }
}
