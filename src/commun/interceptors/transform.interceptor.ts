import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { isObject, isArray } from 'lodash';
import { classToPlain } from 'class-transformer';

export class TransformInterceptor implements NestInterceptor {

  private logger = new Logger('TransformInterceptor');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    return next
            .handle()
            .pipe(
                tap(() => this.logger.log('TransformInterceptor intercept response...')),
                map(res => (isObject(res) ? this.transformResponse(res) : res))
            );
  }

  transformResponse(response) {
    if (isArray(response)) {
      return response.map(item => this.transformToPlain(item));
    }
    return this.transformToPlain(response);
  }

  transformToPlain(plainOrClass) {
    return plainOrClass && plainOrClass.constructor !== Object ? classToPlain(plainOrClass) : plainOrClass;
  }
}
