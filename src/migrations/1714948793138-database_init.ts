import { MigrationInterface, QueryRunner } from 'typeorm';

export class DatabaseInit1714948793138 implements MigrationInterface {
  name = 'DatabaseInit1714948793138';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."blogs_genre_enum" AS ENUM('develop', 'design', 'lifestyle', 'technology', 'programming')`,
    );
    await queryRunner.query(
      `CREATE TABLE "blogs" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "content" text NOT NULL, "genre" "public"."blogs_genre_enum" NOT NULL, CONSTRAINT "PK_e113335f11c926da929a625f118" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "blogId" integer, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_76934127c9bd6759d0673346347" FOREIGN KEY ("blogId") REFERENCES "blogs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_76934127c9bd6759d0673346347"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "blogs"`);
    await queryRunner.query(`DROP TYPE "public"."blogs_genre_enum"`);
  }
}
