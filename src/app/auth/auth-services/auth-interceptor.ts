import { Router } from '@angular/router';
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
          if (event instanceof HttpErrorResponse) {
            if (event.status == 403) {
              console.log(event);
              
              this.authService.logout();
              this.router.navigate(['/signin']);
            }
          }
        })
      );
    }
    return next.handle(req);
  }
}
