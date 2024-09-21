import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { JodoService } from 'src/modules/jodo/jodo.service';
import { StudentRepository } from 'src/modules/student/repositories/student.repository';
import { StudentDocument } from 'src/modules/student/schemas/student.schema';

@Injectable()
export class RetryService {

    constructor(
        private readonly studentRepository: StudentRepository,
        private readonly jodoService: JodoService
    ) { }
    // Cron job that runs every 5 minutes to retry failed student creations
    @Cron('*/5 * * * * ')
    async retryFailedCreations() {
        console.log('entered cron')
        const failedStudents = await this.studentRepository.findOnePartial({ success: false });
        console.log(failedStudents)
        for (const student of failedStudents) {
            console.log(`Retrying student creation for: ${student.fullName}`);
            this.jodoService.registerStudent(student);                                      //this is assuming that registerStudent()api is idempotent
        }

    }
}
