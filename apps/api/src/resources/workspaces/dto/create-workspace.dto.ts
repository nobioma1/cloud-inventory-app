import { User } from 'resources/users/entities/user.entity';

export class CreateWorkspaceDto {
  name: string;
  owner: User;
}
