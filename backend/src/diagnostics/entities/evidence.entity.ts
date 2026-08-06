import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DiagnosticCase } from './diagnostic-case.entity';
import { EvidenceKind } from './evidence-kind.enum';

@Entity()
export class Evidence {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => DiagnosticCase, (dc) => dc.evidences, { onDelete: 'CASCADE' })
  case!: DiagnosticCase;

  @Column({
    type: 'enum',
    enum: EvidenceKind,
    default: EvidenceKind.DECLARED,
  })
  kind!: EvidenceKind;

  @Column()
  key!: string;

  @Column({ type: 'text' })
  value!: string;

  @Column({ type: 'float', nullable: true })
  confidence?: number;

  @Column({ nullable: true })
  source?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
