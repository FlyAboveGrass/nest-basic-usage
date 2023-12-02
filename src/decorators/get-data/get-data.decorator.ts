import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';

export const GetData = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const query = request.query;

    if (!query) {
      throw new BadRequestException('GetData 只能用在 Get 请求中！');
    }

    return key ? query && query[key] : query;
  },
);
