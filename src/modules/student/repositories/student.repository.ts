import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentDocument } from '../schemas/student.schema';
import { CreateStudentDto } from '../dto/create-student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto';
import { Student } from '../entities/student.entity';
@Injectable()
export class StudentRepository {
  constructor(
    @InjectModel('Student') private readonly studentModel: Model<StudentDocument>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const newStudent = new this.studentModel(createStudentDto);
    const studentDocument = await newStudent.save();
    return this.toDomain(studentDocument); 
  }

  async findAll(): Promise<Student[]> {
    const studentDocuments = await this.studentModel.find().exec();
    return studentDocuments.map(this.toDomain); 
  }

  async findOne(id: string): Promise<Student> {
    const studentDocument = await this.studentModel.findById(id).exec();
    return this.toDomain(studentDocument); 
  }

  async update(id: string, updateStudentDto: Partial<UpdateStudentDto>| {success:boolean}): Promise<Student> {
    const updatedStudent = await this.studentModel.findByIdAndUpdate(id, updateStudentDto, { new: true }).exec();
    return this.toDomain(updatedStudent); 
  }

  async remove(id: string): Promise<Student> {
    const deletedStudent = await this.studentModel.findByIdAndDelete(id).exec();
    return this.toDomain(deletedStudent); 
  }

  toDomain(studentDocument: StudentDocument): Student {
    if (!studentDocument) return null;
    
    const { _id, fullName, identifier, grade, academicYearDuration, dob, fee_components } = studentDocument;

    return new Student({
      id: _id.toString(),
      fullName,
      identifier,
      grade,
      academicYearDuration,
      dob,
      fee_components,
    });
  }
}