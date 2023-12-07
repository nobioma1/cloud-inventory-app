import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1701779917434 implements MigrationInterface {
  name = 'Migrations1701779917434';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`cost\``);
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`price\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`price\` decimal NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`cost\` decimal NOT NULL DEFAULT '0'`,
    );
  }
}
