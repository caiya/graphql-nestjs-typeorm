import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CatEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ length: 50 })
  name: string;

  @Column() age: number;

  @Column() userId: number;

}