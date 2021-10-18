import { Injectable } from '@nestjs/common';
import { PaginationRequest } from '../../configuration/pagination/dtos/pagination.dto';
import {
  dateToyyyyMMdd,
  yyyyMMddToDate,
} from '../../configuration/date/vanilla-date.service';
import { Cat } from './cat.entity';
import { CreateCatRequest, CreateCatResponse } from './dtos/create-cat.dto';
import { GetCatByIdResponse } from './dtos/get-cat-by-id.dto';
import { GetCatsResponse } from './dtos/get-cats.dto';
import { UpdateCatRequest } from './dtos/update-cat.dto';
import { CatNotFoundException } from './exceptions/cat-not-found.exception';
import {
  getEnd,
  getNextPage,
  getPreviousPage,
  getStart,
} from '../../configuration/pagination/pagination.service';

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
    return this.cats[last]?.id + 1 || 1;
  }

  getCatById(catId: number): GetCatByIdResponse {
    const cat = this.cats.find(({ id }) => id === catId);
    if (!cat) throw new CatNotFoundException(catId);

    return { ...cat, birthday: dateToyyyyMMdd(cat.birthday) };
  }

  getCats({
    page = 1,
    size = 10,
    url = '',
  }: PaginationRequest): GetCatsResponse {
    const start = getStart(page, size);
    const end = getEnd(page, size);
    const data = this.cats.slice(start, end).map((cat) => ({
      ...cat,
      birthday: dateToyyyyMMdd(cat.birthday),
    }));

    return {
      count: this.cats.length,
      previous: getPreviousPage(url, page, size),
      next: getNextPage(url, page, size, this.cats.length),
      data,
    };
  }

  updateCat(catId: number, request: UpdateCatRequest): void {
    const i = this.cats.findIndex(({ id }) => id === catId);
    let cat = this.cats[i];
    if (!cat) throw new CatNotFoundException(catId);

    const catInfo = Object.keys(request).reduce((acc, key) => {
      if (key === 'birthday') {
        acc[key] = yyyyMMddToDate(request[key]);
      } else {
        acc[key] = request[key];
      }
      return acc;
    }, {}) as Cat;

    cat = { ...cat, ...catInfo };
  }

  removeCat(catId: number): void {
    const i = this.cats.findIndex(({ id }) => id === catId);
    this.cats.splice(i, 1);
  }
}
