import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1716773555909 implements MigrationInterface {
  name = 'Migration1716773555909';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."blogs_genre_enum" AS ENUM('develop', 'design', 'lifestyle', 'technology', 'programming')`,
    );
    await queryRunner.query(
      `CREATE TABLE "blogs" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "content" text NOT NULL, "genre" "public"."blogs_genre_enum" NOT NULL, "userId" integer, CONSTRAINT "PK_e113335f11c926da929a625f118" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "blogs" ADD CONSTRAINT "FK_50205032574e0b039d655f6cfd3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blogs" DROP CONSTRAINT "FK_50205032574e0b039d655f6cfd3"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "blogs"`);
    await queryRunner.query(`DROP TYPE "public"."blogs_genre_enum"`);
  }
}
