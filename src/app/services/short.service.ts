import { infos } from './../interface/infos';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Slug } from '../slug';

@Injectable({ providedIn: 'root' })
export class ShortService {
  baseURL = 'https://croppy.herokuapp.com';
  constructor(private httpClient: HttpClient) {}
  shortLogged(insertedLink: string, jwt: string) {
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${jwt}`),
    };
    return this.httpClient.post<Slug>(
      `${this.baseURL}/v1/short-url`,
      { target: `${insertedLink}` },
      header
    );
  }
  shortNotLogged(insertedLink: any) {
    return this.httpClient.post<Slug>(`${this.baseURL}/v1/short-url`, {
      target: `${insertedLink}`,
    });
  }
  getURL(slug: string) {
    return this.httpClient.get(`${this.baseURL}/v1/get-target/${slug}`);
  }
  getURLInfos(id: string) {
    return this.httpClient.get<infos>(`${this.baseURL}/api/user/url/${id}`);
  }
}
