import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateCatRequest {
  @ApiProperty({ example: 'Mimo' })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiProperty({ example: '2000-11-20' })
  @IsOptional()
  @IsDateString()
  readonly birthday?: string;
}
