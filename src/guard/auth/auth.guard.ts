import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // context应用上下文： https://docs.nestjs.cn/10/fundamentals?id=%e5%ba%94%e7%94%a8%e4%b8%8a%e4%b8%8b%e6%96%87
    const request = context.switchToHttp().getRequest<Request>();
    if (request.method === 'DELETE') {
      return false;
    }

    return true;
  }
}
