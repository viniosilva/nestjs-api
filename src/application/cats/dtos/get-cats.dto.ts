import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponse } from '../../../configuration/pagination/dtos/pagination.dto';

class CatResponse {
  @ApiProperty({ example: 1 })
  readonly id: number;

  @ApiProperty({ example: 'Mimo' })
  readonly name: string;

  @ApiProperty({ example: '2000-11-20' })
  readonly birthday: string;
}

export class GetCatsResponse extends PaginationResponse {
  data: CatResponse[];
}
