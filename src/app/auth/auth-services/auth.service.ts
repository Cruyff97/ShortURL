import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { LoginRes } from 'src/app/interface/login-res';
import { IMyUrls } from 'src/app/interface/my-urls';
import { JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  
  
  constructor(private http: HttpClient) {}
  
  rootUrl = 'https://croppy.herokuapp.com';
  signedin$ = new BehaviorSubject(false);

  public isAuthenticated(): boolean {  
    const jwtHelper = new JwtHelperService() 
    const token = localStorage.getItem('id_token')!;
    return !jwtHelper.isTokenExpired(token);
  }

validateJwt() {
  let token = localStorage.getItem('id_token');

    return this.http.get(`${this.rootUrl}/validate/jwt`);
  }

  loggedIn() {
    if(localStorage.getItem('id_token')){
      return true;
    }
    return false;
  }

  signUp(credentials: any) {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': `${this.rootUrl}`,
    });
    return this.http
      .post(`${this.rootUrl}/v1/auth/register`, credentials, {
        headers: headers,
      })
        }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('username');
    return this.signedin$.next(false);
  }
  login(credentials: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http
      .post<LoginRes>(`${this.rootUrl}/v1/auth/login`, credentials, {
        headers: headers,
      })
      .pipe(
        tap(() => {
          this.signedin$.next(true);
        })
      );
  }
get username(){
  return localStorage.getItem('username');
}
  get myUrls() {

    return this.http.get<IMyUrls>(`${this.rootUrl}/api/user/urls`);
  }
}
