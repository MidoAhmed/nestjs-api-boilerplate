import {MigrationInterface, QueryRunner} from "typeorm";

export class TaskRefactoring1586950791101 implements MigrationInterface {
    name = 'TaskRefactoring1586950791101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" RENAME COLUMN "name" TO "title"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" RENAME COLUMN "title" TO "name"`, undefined);
    }

}
