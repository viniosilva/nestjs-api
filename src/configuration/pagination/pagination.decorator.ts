import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function Pagination() {
  return applyDecorators(
    ApiQuery({ name: 'page', example: 1, required: false, type: Number }),
    ApiQuery({ name: 'size', example: 10, required: false, type: Number }),
  );
}
