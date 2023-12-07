import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'resources/users/entities/user.entity';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { Workspace } from './entities/workspace.entity';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
  ) {}

  create(createWorkspaceDto: CreateWorkspaceDto) {
    const workspace = this.workspaceRepository.create(createWorkspaceDto);
    return this.workspaceRepository.save(workspace);
  }

  findOne(attrs: { owner: { uid: string }; id: string }) {
    return this.workspaceRepository.findOne({ where: attrs });
  }

  findAll(user: User) {
    return this.workspaceRepository.find({
      where: {
        owner: {
          id: user.id,
        },
      },
    });
  }

  async selectWorkspace(user: User) {
    const workspaces = await this.findAll(user);

    if (workspaces.length === 0) {
      const workspace = await this.create({
        owner: user,
        name: 'My Workspace (Default)',
      });

      workspaces.push(workspace);
    }

    return workspaces[0];
  }
}
