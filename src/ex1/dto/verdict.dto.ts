import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VerdictDto {
  @ApiProperty({ required: true })
  @IsString()
  status: string;
}
