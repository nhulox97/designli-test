import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

const baseApiPropertyProps: ApiPropertyOptions = { required: true };
export class SnsResponseDoc {
  @ApiProperty(baseApiPropertyProps)
  spam: boolean;

  @ApiProperty(baseApiPropertyProps)
  virus: boolean;

  @ApiProperty(baseApiPropertyProps)
  dns: boolean;

  @ApiProperty(baseApiPropertyProps)
  retrasado: boolean;

  @ApiProperty(baseApiPropertyProps)
  month: string;

  @ApiProperty(baseApiPropertyProps)
  emisor: string;

  @ApiProperty(baseApiPropertyProps)
  receptor: string[];
}
