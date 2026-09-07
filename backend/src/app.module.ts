import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiModule } from './common/ai/ai.module';
import { DiagnosticsModule } from './diagnostics/diagnostics.module';
import { Vehicle } from './diagnostics/entities/vehicle.entity';
import { DiagnosticCase } from './diagnostics/entities/diagnostic-case.entity';
import { Symptom } from './diagnostics/entities/symptom.entity';
import { DtcCode } from './diagnostics/entities/dtc-code.entity';
import { Measurement } from './diagnostics/entities/measurement.entity';
import { Hypothesis } from './diagnostics/entities/hypothesis.entity';
import { DiagnosticTest } from './diagnostics/entities/diagnostic-test.entity';
import { Evidence } from './diagnostics/entities/evidence.entity';

const entities = [
  Vehicle,
  DiagnosticCase,
  Symptom,
  DtcCode,
  Measurement,
  Hypothesis,
  DiagnosticTest,
  Evidence,
];

function createDatabaseOptions(): TypeOrmModuleOptions {
  if (process.env.GARAGEBENCH_DESKTOP === '1') {
    return {
      type: 'sqljs',
      location: process.env.GARAGEBENCH_DATABASE ?? 'garagebench.sqlite',
      autoSave: true,
      sqlJsConfig: {
        locateFile: (file: string) => require.resolve(`sql.js/dist/${file}`),
      },
      entities,
      synchronize: true,
      autoLoadEntities: true,
    };
  }

  return {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities,
    synchronize: process.env.DB_SYNC === 'true',
    autoLoadEntities: true,
  };
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(createDatabaseOptions()),
    AiModule,
    DiagnosticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
