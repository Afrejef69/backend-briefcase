import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1716771476197 implements MigrationInterface {
    name = 'FirstMigration1716771476197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_76934127c9bd6759d0673346347"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "blogId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "blogId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_76934127c9bd6759d0673346347" FOREIGN KEY ("blogId") REFERENCES "blogs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
