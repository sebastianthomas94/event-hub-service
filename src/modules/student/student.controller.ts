import { Controller, Param } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller()
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @EventPattern('createStudent')
  create(@Payload() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @EventPattern('findOneStudent')
  findOne(@Payload() id: string) {
    return this.studentService.findOne(id);
  }

  @EventPattern('updateStudent')
  update(@Param('id') id: string, @Payload() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @EventPattern('removeStudent')
  remove(@Payload() id: number) {
    return this.studentService.remove(id);
  }
}
