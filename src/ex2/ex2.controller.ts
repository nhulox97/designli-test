import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Ex2Service } from './ex2.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('ex2')
export class Ex2Controller {
  constructor(private readonly ex2Service: Ex2Service) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  getJsonFromEmail(@UploadedFile() file: Express.Multer.File) {
    return this.ex2Service.getJsonFromEmail(file);
  }
}
