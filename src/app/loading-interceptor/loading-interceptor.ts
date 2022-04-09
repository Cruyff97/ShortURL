import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { finalize, Observable } from 'rxjs';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
isLoading: boolean=false;
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
this.isLoading=true;
console.log(this.isLoading);

    return next.
        handle(req)
        .pipe(
            finalize(() => {
                this.isLoading=false;
                console.log('Intercepted request ...',this.isLoading);
            }
        )
    );
}
}