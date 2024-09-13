import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { RecordDto } from './record.dto';

export class SnsEventDto {
  @ApiProperty({ isArray: true, required: true, type: RecordDto })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecordDto)
  Records: RecordDto[];
}
