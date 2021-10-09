import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CatsService } from './cats.service';
import { CreateCatRequest, CreateCatResponse } from './dto/create-cat.dto';

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
}
