import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { Symptom } from './symptom.entity';
import { DtcCode } from './dtc-code.entity';
import { Measurement } from './measurement.entity';
import { Hypothesis } from './hypothesis.entity';
import { DiagnosticTest } from './diagnostic-test.entity';
import { Evidence } from './evidence.entity';

@Entity()
export class DiagnosticCase {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.cases, { onDelete: 'CASCADE' })
  vehicle!: Vehicle;

  @Column()
  caseNumber!: string;

  @Column({ nullable: true })
  complaint?: string;

  @Column({ default: 'OPEN' })
  status!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Symptom, (symptom) => symptom.case, { cascade: true })
  symptoms!: Symptom[];

  @OneToMany(() => DtcCode, (dtc) => dtc.case, { cascade: true })
  dtcCodes!: DtcCode[];

  @OneToMany(() => Measurement, (measurement) => measurement.case, { cascade: true })
  measurements!: Measurement[];

  @OneToMany(() => Hypothesis, (hypothesis) => hypothesis.case, { cascade: true })
  hypotheses!: Hypothesis[];

  @OneToMany(() => DiagnosticTest, (test) => test.case, { cascade: true })
  diagnosticTests!: DiagnosticTest[];

  @OneToMany(() => Evidence, (evidence) => evidence.case, { cascade: true })
  evidences!: Evidence[];
}
