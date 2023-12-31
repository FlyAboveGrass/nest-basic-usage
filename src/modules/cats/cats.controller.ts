import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Request } from 'express';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dtos/cats.dto';
import { CatFilter } from 'src/error/cat/cat.filter';
import { CatsPipe } from './cats.pipe';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { GetData } from 'src/decorators/get-data/get-data.decorator';

@Controller('cats')
@UseGuards(AuthGuard)
// @UseInterceptors(LoggingInterceptor) //请注意，我们传递的是 LoggingInterceptor 类型而不是实例，让框架承担实例化责任并启用依赖注入。
export class CatsController {
  constructor(private catService: CatsService) {}

  @Get('/all')
  findAll(
    @Query('data', new DefaultValuePipe('(no data found)')) query,
    @Req() req: Request,
  ): string {
    console.log(query, req);
    return `find all data -- ${query}`;
  }

  @Get('/cat1')
  findCat1(@GetData('username') username: string) {
    return {
      list: this.catService.findAll(),
      username,
    };
  }

  @Get('/error')
  @UseFilters(new CatFilter())
  throwError() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Post('/catPost')
  @UsePipes(new CatsPipe())
  @UseFilters(new CatFilter())
  async create(@Body() createCatDto: CreateCatDto) {
    // throw new ForbiddenException();
    return this.catService.create(createCatDto);
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
