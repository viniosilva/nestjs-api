import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatRequest, CreateCatResponse } from './dto/create-cat.dto';

@Controller('v1/cats')
@UsePipes(new ValidationPipe({ transform: true }))
export class CatsController {
  constructor(private readonly service: CatsService) {}
  @Post()
  createCat(@Body() request: CreateCatRequest): CreateCatResponse {
    return this.service.createCat(request);
  }
}
