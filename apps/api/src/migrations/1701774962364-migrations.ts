import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1701774962364 implements MigrationInterface {
  name = 'Migrations1701774962364';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`report\` (\`id\` varchar(36) NOT NULL, \`report\` text NOT NULL, \`severity\` varchar(20) NOT NULL, \`isResolved\` tinyint NOT NULL DEFAULT 0, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`productId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`report\` ADD CONSTRAINT \`FK_2977b14ac9fdbd2597728d4e3b3\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`report\` DROP FOREIGN KEY \`FK_2977b14ac9fdbd2597728d4e3b3\``,
    );
    await queryRunner.query(`DROP TABLE \`report\``);
  }
}
