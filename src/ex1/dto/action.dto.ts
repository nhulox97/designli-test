import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ActionDto {
  @ApiProperty({ required: true })
  @IsString()
  type: string;

  @ApiProperty({ required: true })
  @IsString()
  topicArn: string;
}
