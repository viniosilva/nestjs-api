import { ApiProperty } from '@nestjs/swagger';

export class PaginationRequest {
  page?: number;
  size?: number;
  url?: string;
}

export class PaginationResponse {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ example: 'http://localhost:3000/v1/cats/?page=3&size=10' })
  next: string;

  @ApiProperty({ example: 'http://localhost:3000/v1/cats/?page=1&size=10' })
  previous: string;
}
