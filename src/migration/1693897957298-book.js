const { Table, TableColumn} = require("typeorm");

module.exports = class Book1693897957298 {

    async up(queryRunner) {

        await queryRunner.createTable(new Table({
            name: "book",
            columns: [
                new TableColumn({
                    name: "isbn",
                    type: "varchar",
                    isPrimary: true,
                }),
                new TableColumn({
                    name: "title",
                    type: "varchar",
                    isNullable: false,
                })
            ]
        }));
    }

    async down(queryRunner) {
        await queryRunner.dropTable("book");
    }

}
