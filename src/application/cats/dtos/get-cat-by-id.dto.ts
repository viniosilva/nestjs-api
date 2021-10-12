import { ApiProperty } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';

export class GetCatByIdParam {
  @ApiProperty({ example: 1 })
  @IsPositive()
  readonly catId: number;
}

export class GetCatByIdResponse {
  @ApiProperty({ example: 1 })
  readonly id: number;

  @ApiProperty({ example: 'Mimo' })
  readonly name: string;

  @ApiProperty({ example: '2000-11-20' })
  readonly birthday: string;
}
