import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Workspace } from 'resources/workspaces/entities/workspace.entity';
import { Report } from 'resources/reports/entities/report.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '200' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', default: 0 })
  quantityInStock: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Workspace, (workspace) => workspace.products, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  workspace: Workspace;

  @OneToMany(() => Report, (report) => report.product)
  reports: Report[];
}
