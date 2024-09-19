import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { CreateStudentDto, StudentRes } from '../student/dto/create-student.dto';

@Injectable()
export class JodoService {

    constructor(private readonly httpService: HttpService) { }

    private readonly baseUrl = process.env.JODO_BASE_URL as string;
    private readonly endPoint = process.env.JODO_REGISTER_STUDENT_ENDPOINT as string;
    private readonly headers = {
        'Authorization': `Bearer ${process.env.JODO_KEY}`,
        'Content-Type': 'application/json',
    };


    registerStudent(createStudentDto: CreateStudentDto): Observable<AxiosResponse<StudentRes>> {
        const registrationId = 'randomId';
        const url = `${this.baseUrl}${this.endPoint}/${registrationId}/student`;

        try {
            const response = this.httpService.post(url, createStudentDto, { headers: this.headers });
            return response;
        } catch (error) {
            throw new Error('Failed to create student in Jodo'); //write logic for recording the fail and redo the http request
        }
    }

    getStudent(id: string): Observable<AxiosResponse<StudentRes>> {
        const url = `${this.baseUrl}${this.endPoint}/${id}/student`;
        try {
            const response = this.httpService.get(url, { headers: this.headers });
            return response;                                           //proper interface required
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch new student data');    // this is to be changed
        }
    }

    updateStudent(id: string, updateStudent: Partial<CreateStudentDto>): Observable<AxiosResponse<StudentRes>>{
        const url = `${this.baseUrl}${this.endPoint}/${id}/student`;
        try{
            const response = this.httpService.patch(url, updateStudent,{ headers: this.headers });
            return response;
        }
        catch(e){

        }
    }
}
