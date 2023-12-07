import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1701725802599 implements MigrationInterface {
  name = 'Migrations1701725802599';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`product\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(200) NOT NULL, \`description\` text NOT NULL, \`quantityInStock\` int NOT NULL DEFAULT '0', \`price\` decimal NOT NULL DEFAULT '0', \`cost\` decimal NOT NULL DEFAULT '0', \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`workspaceId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_5f8c992144f84570ede5786be5a\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`workspace\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_5f8c992144f84570ede5786be5a\``,
    );
    await queryRunner.query(`DROP TABLE \`product\``);
  }
}
