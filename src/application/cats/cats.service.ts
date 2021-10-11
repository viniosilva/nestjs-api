import { Injectable } from '@nestjs/common';
import {
  dateToyyyyMMdd,
  yyyyMMddToDate,
} from '../../configuration/date/vanilla-date.service';
import { Cat } from './cat.entity';
import { CreateCatRequest, CreateCatResponse } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  private readonly cats = [];

  createCat(request: CreateCatRequest): CreateCatResponse {
    const cat = new Cat({
      id: this.generateCatId(),
      birthday: yyyyMMddToDate(request.birthday),
      name: request.name,
    });

    this.cats.push(cat);

    return { ...cat, birthday: dateToyyyyMMdd(cat.birthday) };
  }

  private generateCatId(): number {
    const last = this.cats.length - 1;
    return this.cats[last]?.id || 1;
  }
}
