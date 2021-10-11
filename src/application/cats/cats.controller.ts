import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CatsService } from './cats.service';
import { CreateCatRequest, CreateCatResponse } from './dtos/create-cat.dto';
import { GetCatByIdResponse } from './dtos/get-cat-by-id.dto';
import { CatNotFoundException } from './exceptions/cat-not-found.exception';

@Controller('v1/cats')
@UsePipes(new ValidationPipe({ transform: true }))
@ApiTags('v1/cats')
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
export class CatsController {
  constructor(private readonly service: CatsService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Cat created', type: CreateCatResponse })
  createCat(@Body() request: CreateCatRequest): CreateCatResponse {
    return this.service.createCat(request);
  }

  @Get(':catId')
  @ApiParam({ name: 'catId', example: 1 })
  @ApiOkResponse({ description: 'Cat found', type: GetCatByIdResponse })
  @ApiNotFoundResponse({ description: 'Cat not found' })
  getCatById(@Param('catId') catId: number): GetCatByIdResponse {
    try {
      return this.service.getCatById(catId);
    } catch (err) {
      if (err instanceof CatNotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw err;
    }
  }
}
