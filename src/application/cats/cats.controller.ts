import { Body, Controller, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatRequest, CreateCatResponse } from './dto/create-cat.dto';

@Controller('v1/cats')
export class CatsController {
  constructor(private readonly service: CatsService) {}
  @Post()
  createCat(@Body() request: CreateCatRequest): CreateCatResponse {
    return this.service.createCat(request);
  }
}
