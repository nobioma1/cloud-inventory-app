import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

import { WorkspacesService } from '../workspaces.service';

@Injectable()
export class IsWorkspaceGuard implements CanActivate {
  constructor(private readonly workspaceService: WorkspacesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const uid = request?.auth?.payload.sub;
    const workspaceId = request?.params?.workspaceId;

    try {
      if (!uid || !workspaceId) {
        throw new Error('Invalid userId or workspaceId');
      }

      const workspace = await this.workspaceService.findOne({
        id: workspaceId,
        owner: {
          uid,
        },
      });

      if (!workspace) {
        throw new Error('Workspace not found');
      }

      request['workspace'] = workspace;
    } catch {
      throw new ForbiddenException();
    }

    return true;
  }
}
