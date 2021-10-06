import { Injectable } from '@nestjs/common';
import {
  dateToyyyyMMdd,
  yyyyMMddToDate,
} from '../../configuration/date/vanilla-date.service';
import { Cat } from './cat.entity';
import { CreateCatRequest, CreateCatResponse } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  createCat(request: CreateCatRequest): CreateCatResponse {
    const cat = new Cat({
      id: 1,
      birthday: yyyyMMddToDate(request.birthday),
      name: request.name,
    });

    return { ...cat, birthday: dateToyyyyMMdd(cat.birthday) };
  }
}
