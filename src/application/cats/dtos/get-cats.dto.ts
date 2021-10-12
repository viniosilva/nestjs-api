import { ApiProperty } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';

class CatResponse {
  @ApiProperty({ example: 1 })
  readonly id: number;

  @ApiProperty({ example: 'Mimo' })
  readonly name: string;

  @ApiProperty({ example: '2000-11-20' })
  readonly birthday: string;
}

export class GetCatsResponse {
  data: CatResponse[];
}
