import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1701715723639 implements MigrationInterface {
  name = 'Migrations1701715723639';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`workspace\` ADD \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`workspace\` ADD \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`workspace\` ADD \`ownerId\` varchar(36) NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`workspace\` DROP COLUMN \`name\``);
    await queryRunner.query(
      `ALTER TABLE \`workspace\` ADD \`name\` varchar(150) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`workspace\` ADD CONSTRAINT \`FK_51f2194e4a415202512807d2f63\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`workspace\` DROP FOREIGN KEY \`FK_51f2194e4a415202512807d2f63\``,
    );
    await queryRunner.query(`ALTER TABLE \`workspace\` DROP COLUMN \`name\``);
    await queryRunner.query(
      `ALTER TABLE \`workspace\` ADD \`name\` varchar(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`workspace\` DROP COLUMN \`ownerId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`workspace\` DROP COLUMN \`updatedAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`workspace\` DROP COLUMN \`createdAt\``,
    );
  }
}
