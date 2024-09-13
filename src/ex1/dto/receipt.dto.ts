import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { VerdictDto } from './verdict.dto';
import { ActionDto } from './action.dto';

export class ReceiptDto {
  @ApiProperty({ required: true })
  @IsDefined()
  @Transform(({ value }) => new Date(value))
  timestamp: Date;

  @ApiProperty({ required: true })
  @IsNumber()
  processingTimeMillis: number;

  @ApiProperty({ required: true })
  @IsArray()
  @IsString({ each: true })
  recipients: string[];

  @ApiProperty({ required: true, type: VerdictDto })
  @ValidateNested()
  @Type(() => VerdictDto)
  spamVerdict: VerdictDto;

  @ApiProperty({ required: true, type: VerdictDto })
  @ValidateNested()
  @Type(() => VerdictDto)
  virusVerdict: VerdictDto;

  @ApiProperty({ required: true, type: VerdictDto })
  @ValidateNested()
  @Type(() => VerdictDto)
  spfVerdict: VerdictDto;

  @ApiProperty({ required: true, type: VerdictDto })
  @ValidateNested()
  @Type(() => VerdictDto)
  dkimVerdict: VerdictDto;

  @ApiProperty({ required: true, type: VerdictDto })
  @ValidateNested()
  @Type(() => VerdictDto)
  dmarcVerdict: VerdictDto;

  @ApiProperty({ required: true })
  @IsString()
  dmarcPolicy: string;

  @ApiProperty({ required: true, type: ActionDto })
  @ValidateNested()
  @Type(() => ActionDto)
  action: ActionDto;
}
