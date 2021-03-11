import { CoreEntity } from "src/common/entities/core.entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Commands } from "./commands.entitiy";

/*
  @author AJu (zoz0312)
  Keyword: 공통된 Keyword를 위한 Table
*/
@Entity()
export class Keyword extends CoreEntity {
  @Column()
  keyword: string;

  // @Column({ array: true })
  @OneToMany(
    type => Commands,
    commands => commands.keyword,
    { onDelete: 'CASCADE' }
  )
  commands: Commands[];
}