import { CoreEntity } from "src/common/entities/core.entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Commands } from "./commands.entitiy";

@Entity()
export class Keyword extends CoreEntity {
  @Column()
  keyword: string;

  // @Column({ array: true })
  @OneToMany(
    type => Commands,
    commands => commands.id,
    { onDelete: 'CASCADE' }
  )
  commands: Commands[];
}