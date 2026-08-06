import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DiagnosticCase } from './diagnostic-case.entity';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 17, unique: true })
  vin!: string;

  @Column()
  make!: string;

  @Column()
  model!: string;

  @Column()
  year!: number;

  @Column({ nullable: true })
  mileage?: number;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => DiagnosticCase, (dc) => dc.vehicle)
  cases!: DiagnosticCase[];
}
