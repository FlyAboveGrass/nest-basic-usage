import {
  Bind,
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseFilters,
} from '@nestjs/common';
import { Request } from 'express';
import { CatsService } from './cats.service';
import { CreateCatDto } from './cats.dto';
import { CatFilter } from 'src/error/cat/cat.filter';

@Controller('cats')
export class CatsController {
  constructor(private catService: CatsService) {}

  @Get()
  findAll(@Req() req: Request): string {
    console.log(req);
    return 'find all data';
  }

  @Get('/cat1')
  findCat1() {
    return this.catService.findAll();
  }

  @Get('/error')
  throwError() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Post('/catPost')
  @UseFilters(new CatFilter())
  async create(@Body() createCatDto: CreateCatDto) {
    console.log('🚀-  -> create  -> createCatDto:', createCatDto);
    throw new ForbiddenException();
  }

  // @Post()
  // throwCustomError(@Body() errorDto: Error) {
  //   throw new ForbiddenException();
  // }

  @Get(':id')
  findId(@Param() param) {
    return `find your findSomething ${param.id}`;
  }
}
