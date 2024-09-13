import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsString,
  ValidateNested,
} from 'class-validator';
import { HeaderDto } from './header.dto';
import { CommonHeadersDto } from './common-headers.dto';

export class MailDto {
  @ApiProperty({ required: true })
  @Transform(({ value }) => new Date(value))
  @IsDefined()
  timestamp: Date;

  @ApiProperty({ required: true })
  @IsString()
  source: string;

  @ApiProperty({ required: true })
  @IsString()
  messageId: string;

  @ApiProperty({ required: true })
  @IsArray()
  @IsString({ each: true })
  destination: string[];

  @ApiProperty({ required: true })
  @IsBoolean()
  headersTruncated: boolean;

  @ApiProperty({ isArray: true, required: true, type: HeaderDto })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HeaderDto)
  headers: HeaderDto[];

  @ApiProperty({ required: true, type: CommonHeadersDto })
  @ValidateNested()
  @Type(() => CommonHeadersDto)
  commonHeaders: CommonHeadersDto;
}
