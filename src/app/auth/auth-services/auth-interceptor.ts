import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('id_token');
    if (token) {
      const myRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(myRequest).pipe(
        tap((event) => {
          if (event instanceof HttpErrorResponse) {
            if (event.status == 403) {
              this.authService.logout();
            }
          }
        })
      );
    }
    return next.handle(req);
  }
}
