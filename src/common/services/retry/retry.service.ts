import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { JodoService } from 'src/modules/jodo/jodo.service';
import { StudentRepository } from 'src/modules/student/repositories/student.repository';

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
