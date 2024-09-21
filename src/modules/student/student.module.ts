import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { JodoModule } from '../jodo/jodo.module';
import { StudentRepository } from './repositories/student.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './schemas/student.schema';

@Module({
  imports: [JodoModule,
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
  ],
  controllers: [StudentController],
  providers: [StudentService, StudentRepository],
  exports:[StudentRepository]
})
export class StudentModule { }
