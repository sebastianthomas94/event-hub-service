import { Module } from '@nestjs/common';
import { JodoService } from './jodo.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [JodoService],
    exports: [JodoService],
})
export class JodoModule { }
