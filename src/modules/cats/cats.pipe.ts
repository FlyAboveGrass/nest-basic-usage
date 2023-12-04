import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { evolve } from 'ramda';

@Injectable()
export class CatsPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // 参数是原生 JavaScript 类型时，它负责绕过验证步骤（它们不能附加验证装饰器，因此没有理由通过验证步骤运行它们）
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    // body 对象在从网络请求反序列化时不携带任何类型信息（这是底层平台（例如 Express）的工作方式）
    const object = evolve({
      age: Number,
    })(plainToInstance(metatype, value));

    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return object;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
