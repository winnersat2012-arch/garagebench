import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DiagnosticCase } from './diagnostic-case.entity';

@Entity()
export class Hypothesis {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => DiagnosticCase, (dc) => dc.hypotheses, { onDelete: 'CASCADE' })
  case!: DiagnosticCase;

  @Column()
  statement!: string;

  @Column({ type: 'text' })
  rationale!: string;

  @Column('float', { default: 0 })
  probability!: number;

  @Column({ default: 'provisional' })
  status!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
