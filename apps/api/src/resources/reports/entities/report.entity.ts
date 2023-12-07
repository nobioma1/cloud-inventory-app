import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Product } from 'resources/products/entities/product.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  report: string;

  @Column({ type: 'varchar', length: '20' })
  severity: string;

  @Column({ type: 'bool', default: false })
  isResolved: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Product, (product) => product.reports, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  product: Product;
}
