import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}
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
          if (event instanceof HttpResponse) {
          }
        }),
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
            try {
              if (err.status === 403) {
                this.authService.logout();
                this.router.navigate(['/signin']);
              }
            } catch (e) {
             console.log(e);
             
            }
          }
          return of(err);
        })
      );
    }
    return next.handle(req);
  }
}
