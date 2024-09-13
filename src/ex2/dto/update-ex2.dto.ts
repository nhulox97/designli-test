import { PartialType } from '@nestjs/mapped-types';
import { CreateEx2Dto } from './create-ex2.dto';

export class UpdateEx2Dto extends PartialType(CreateEx2Dto) {}
