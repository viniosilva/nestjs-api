import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ExceptionFilter } from '../../configuration/filters/exception.filter';
import { CatsService } from './cats.service';
import { CreateCatRequest, CreateCatResponse } from './dtos/create-cat.dto';
import { GetCatByIdResponse } from './dtos/get-cat-by-id.dto';
import { GetCatsResponse } from './dtos/get-cats.dto';
import { UpdateCatRequest } from './dtos/update-cat.dto';
import { CatNotFoundException } from './exceptions/cat-not-found.exception';

@Controller('v1/cats')
@UsePipes(new ValidationPipe({ transform: true }))
@UseFilters(ExceptionFilter)
@ApiTags('v1/cats')
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
export class CatsController {
  constructor(private readonly service: CatsService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Cat created', type: CreateCatResponse })
  createCat(@Body() request: CreateCatRequest): CreateCatResponse {
    return this.service.createCat(request);
  }

  @Get()
  @ApiOkResponse({ description: 'Cats found', type: GetCatsResponse })
  getCats(): GetCatsResponse {
    return this.service.getCats();
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

  @Patch(':catId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'catId', example: 1 })
  @ApiNoContentResponse({ description: 'Cat updated' })
  @ApiNotFoundResponse({ description: 'Cat not found' })
  updateCat(
    @Param('catId') catId: number,
    @Body() request: UpdateCatRequest,
  ): void {
    try {
      this.service.updateCat(catId, request);
    } catch (err) {
      if (err instanceof CatNotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw err;
    }
  }

  @Delete(':catId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'catId', example: 1 })
  @ApiNoContentResponse({ description: 'Cat removed' })
  removeCatById(@Param('catId') catId: number): void {
    this.service.removeCat(catId);
  }
}
