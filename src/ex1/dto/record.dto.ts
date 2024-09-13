import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { SesDto } from './ses.dto';

export class RecordDto {
  @ApiProperty({ required: true })
  @IsString()
  eventVersion: string;

  @ApiProperty({ required: true, type: SesDto })
  @ValidateNested()
  @Type(() => SesDto)
  ses: SesDto;

  @ApiProperty({ required: true })
  @IsString()
  eventSource: string;
}
