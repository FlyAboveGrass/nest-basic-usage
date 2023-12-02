import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('request begin ——————');
    // const now = Date.now();
    // return next
    //   .handle()
    //   .pipe(tap(() => console.log(`request end —————— ${Date.now() - now}ms`)));

    return next.handle();
  }
}
