import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @EventPattern('createStudent')
  create(@Payload() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @EventPattern('findAllStudent')
  findAll() {
    return this.studentService.findAll();
  }

  @EventPattern('findOneStudent')
  findOne(@Payload() id: number) {
    return this.studentService.findOne(id);
  }

  @EventPattern('updateStudent')
  update(@Payload() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(updateStudentDto.id, updateStudentDto);
  }

  @EventPattern('removeStudent')
  remove(@Payload() id: number) {
    return this.studentService.remove(id);
  }
}
