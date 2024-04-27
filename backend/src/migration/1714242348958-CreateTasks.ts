import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTasks1714242348958 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tasks",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "title",
            type: "varchar",
          },

          {
            name: "description",
            type: "varchar",
          },
          {
            name: "tag",
            type: "varchar",
          },
          {
            name: "date",
            type: "timestamp",
          },
          {
            name: "duration",
            type: "integer",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tasks");
  }
}
