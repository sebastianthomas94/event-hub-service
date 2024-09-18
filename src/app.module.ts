import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { StudentModule } from './modules/student/student.module';
import { validate } from './common/config/env.config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentService } from './environment.service';

@Module({
  imports: [
    ConfigModule.forRoot({ validate }),
    MongooseModule.forRoot(process.env.DATABASE_URI as string),
    StudentModule],
  controllers: [AppController],
  providers: [AppService, EnvironmentService],
})
export class AppModule { }
