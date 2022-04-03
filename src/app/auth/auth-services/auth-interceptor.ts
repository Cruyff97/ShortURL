import { throwError } from 'rxjs/internal/observable/throwError';
import { NgxSpinnerModule } from 'ngx-spinner';
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
  constructor(private authService: AuthService, private router: Router, private spinner: NgxSpinnerModule) {}
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
            console.log(err);
            try {
              switch (err.status) {
                case 403:
                  this.authService.logout();
                this.router.navigate(['/signin']);
                break;
                default:
                  let error= err.error.message
                  return throwError(() => error)
                  
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
