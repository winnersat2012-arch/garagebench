import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DiagnosticCase } from './diagnostic-case.entity';

@Entity()
export class Symptom {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => DiagnosticCase, (dc) => dc.symptoms, { onDelete: 'CASCADE' })
  case!: DiagnosticCase;

  @Column()
  description!: string;

  @Column({ default: 'frequent' })
  frequency!: string;

  @Column({ nullable: true })
  context?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
