import { type } from "os";
import { CoreEntity } from "src/common/entities/core.entities";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Keyword } from "./keyword.entitiy";

@Entity()
export class Commands extends CoreEntity {
  @Column()
  outputText: string;

  // @Column()
  @ManyToOne(
    type => Keyword,
    keyword => keyword.commands,
    { onDelete: 'CASCADE' },
  )
  keyword: Keyword;

  @RelationId((command: Commands) => command.keyword)
  keywordId: number;

  @Column()
  userName: string;

}