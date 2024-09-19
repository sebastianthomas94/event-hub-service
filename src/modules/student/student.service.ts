import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { JodoService } from '../jodo/jodo.service';
import { StudentRepository } from './repositories/student.repository';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {

  constructor(private readonly jodoService: JodoService, private readonly repository: StudentRepository) { }

  create(createStudentDto: CreateStudentDto) {                  //this is just a prototype. needs more work
    const id = 'randomId';
    const newStudent = new Student({ ...createStudentDto, id })
    this.repository.create(newStudent)
    const response = this.jodoService.registerStudent(createStudentDto);
    if (response) {
      this.repository.update(id, { success: true });
      return 'student has been created';
    }
    return 'student has been added to ledger'; //jodo service was down so will be updated after some time
  }


  findOne(id: string) {
    const response = this.jodoService.getStudent(id);
    return response;
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    this.repository.update(id, { success: false });     //this logic should be reviewed
    const response = this.jodoService.updateStudent(id, updateStudentDto);
    if (response) {
      this.repository.update(id, { success: true });
      return `This action updates a #${id} student`;

    }
    return `This action updates a #${id} student is being proceeded`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;            //there is no delete api in jodo
  }
}
