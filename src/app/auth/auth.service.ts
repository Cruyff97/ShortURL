import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { LoginRes } from '../interface/login-res';
import { IMyUrls } from '../interface/my-urls';
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

  get myUrls() {
    let token = localStorage.getItem('id_token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    });
    return this.http.get<IMyUrls>(`${this.rootUrl}/api/user/urls`, {
      headers: headers,
    });
  }
}
