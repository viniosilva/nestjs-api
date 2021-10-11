import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class CreateCatRequest {
  @ApiProperty({ example: 'Mimo' })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: '2000-11-20' })
  @IsDateString()
  readonly birthday: string;
}

export class CreateCatResponse {
  @ApiProperty({ example: 1 })
  readonly id: number;

  @ApiProperty({ example: 'Mimo' })
  readonly name: string;

  @ApiProperty({ example: '2000-11-20' })
  readonly birthday: string;
}
