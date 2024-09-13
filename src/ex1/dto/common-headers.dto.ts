import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CommonHeadersDto {
  @ApiProperty({ required: true })
  @IsString()
  returnPath: string;

  @ApiProperty({ required: true })
  @IsArray()
  @IsString({ each: true })
  from: string[];

  @ApiProperty({ required: true })
  @IsString()
  date: string;

  @ApiProperty({ required: true })
  @IsArray()
  @IsString({ each: true })
  to: string[];

  @ApiProperty({ required: true })
  @IsString()
  messageId: string;

  @ApiProperty({ required: true })
  @IsString()
  subject: string;
}
