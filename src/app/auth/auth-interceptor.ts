import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

   let token = localStorage.getItem('id_token');
   if (token) {
       const myRequest =  req.clone({
     setHeaders: {
       'Authorization': `Bearer ${token}`
     }
   });
       return next.handle(myRequest);
   }
   return next.handle(req);
  
}
}
