import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class CatFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    // const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();

    res.status(status).json({
      statusCode2: status,
    });
  }
}
