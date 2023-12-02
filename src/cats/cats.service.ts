import { Injectable } from '@nestjs/common';
import { Cat } from './cats.interface';

@Injectable()
export class CatsService {
  private cats: Cat[] = [];

  findAll(): Cat[] {
    return [
      ...this.cats,
      {
        name: 'cats1',
        age: 1,
        breed: '',
      },
    ];
  }

  create(params) {
    return params;
  }
}
