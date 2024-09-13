import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class HeaderDto {
  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  value: string;
}
