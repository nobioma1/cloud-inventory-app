import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1701725939807 implements MigrationInterface {
  name = 'Migrations1701725939807';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`description\` \`description\` text NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`description\` \`description\` text NOT NULL`,
    );
  }
}
