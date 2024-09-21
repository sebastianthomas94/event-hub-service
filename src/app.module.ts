import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { StudentModule } from './modules/student/student.module';
import { validate } from './common/config/env.config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentService } from './environment.service';
import { JodoService } from './modules/jodo/jodo.service';
import { JodoModule } from './modules/jodo/jodo.module';
import { HttpModule } from '@nestjs/axios';
import { RetryService } from './common/services/retry/retry.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({ validate }),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URI as string),
    StudentModule,
    HttpModule,
    JodoModule],
  controllers: [AppController],
  providers: [AppService, EnvironmentService, RetryService],
})
export class AppModule { }
