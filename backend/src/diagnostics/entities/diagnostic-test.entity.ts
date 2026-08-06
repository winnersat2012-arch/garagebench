import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DiagnosticCase } from './diagnostic-case.entity';

@Entity()
export class DiagnosticTest {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => DiagnosticCase, (dc) => dc.diagnosticTests, {
    onDelete: 'CASCADE',
  })
  case!: DiagnosticCase;

  @Column()
  name!: string;

  @Column({ nullable: true })
  expectedResult?: string;

  @Column({ nullable: true })
  actualResult?: string;

  @Column({ nullable: true })
  status?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
