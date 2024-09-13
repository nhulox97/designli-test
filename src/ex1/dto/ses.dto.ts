import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ReceiptDto } from './receipt.dto';
import { MailDto } from './mail.dto';

export class SesDto {
  @ApiProperty({ required: true, type: ReceiptDto })
  @ValidateNested()
  @Type(() => ReceiptDto)
  receipt: ReceiptDto;

  @ApiProperty({ required: true, type: MailDto })
  @ValidateNested()
  @Type(() => MailDto)
  mail: MailDto;
}
