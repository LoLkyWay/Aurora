import { CoreEntity } from "src/common/entities/core.entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Commands } from "./commands.entitiy";

@Entity()
export class Keywords extends CoreEntity {
  @Column()
  keyword: string;

  @Column()
  @OneToMany(
    type => Commands,
    commands => commands.id
  )
  commands: Commands[];
}