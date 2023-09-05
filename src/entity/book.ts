import {Entity, PrimaryColumn, Column, BaseEntity} from 'typeorm';

@Entity()
export class Book extends BaseEntity {
  @PrimaryColumn()
  isbn: string;

  @Column({nullable: false})
  title: string;

  constructor() {
    super();
    this.isbn = "";
    this.title = "";
  }
}
