import { throwError } from 'rxjs/internal/observable/throwError';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
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
  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}
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
      this.spinner.show();
      return next.handle(myRequest).pipe(
        tap((event) => {
          if (event instanceof HttpResponse) {
            this.spinner.hide();
          }
        }),
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
            try {
              switch (err.status) {
                case 403:
                  this.spinner.hide();
                  this.authService.logout();
                  this.router.navigate(['/signin']);
                  break;
                default:
                  this.spinner.hide();
                  let error = err.error.message;
                  return throwError(() => error);
              }
            } catch (e) {
              this.spinner.hide();
            }
          }
          return of(err);
        })
      );
    }
    return next.handle(req);
  }
}
