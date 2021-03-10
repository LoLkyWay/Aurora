import { type } from "os";
import { CoreEntity } from "src/common/entities/core.entities";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Keywords } from "./keywords.entitiy";

@Entity()
export class Commands extends CoreEntity {
  @Column()
  outputText: string;

  @Column()
  @ManyToOne(
    type => Keywords,
    keywords => keywords.id,
    { onDelete: 'SET NULL', eager: true }
  )
  keyword: Keywords;

  @RelationId((keyword: Keywords) => keyword.id)
  keywordId: number;

  @Column()
  userName: string;

}