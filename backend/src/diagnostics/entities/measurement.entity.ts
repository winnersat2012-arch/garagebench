import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DiagnosticCase } from './diagnostic-case.entity';

@Entity()
export class Measurement {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => DiagnosticCase, (dc) => dc.measurements, { onDelete: 'CASCADE' })
  case!: DiagnosticCase;

  @Column()
  name!: string;

  @Column('float')
  value!: number;

  @Column()
  unit!: string;

  @Column({ nullable: true })
  note?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
