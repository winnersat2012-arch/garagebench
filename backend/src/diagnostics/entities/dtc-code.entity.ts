import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DiagnosticCase } from './diagnostic-case.entity';

@Entity()
export class DtcCode {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => DiagnosticCase, (dc) => dc.dtcCodes, { onDelete: 'CASCADE' })
  case!: DiagnosticCase;

  @Column()
  code!: string;

  @Column({ nullable: true })
  description?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
