import { infos } from './../interface/infos';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Slug } from '../slug';

@Injectable({ providedIn: 'root' })
export class ShortService {
  baseURL = 'https://croppy.herokuapp.com';
  constructor(private http: HttpClient) {}
  shortLogged(insertedLink: string, customSlug?: string) {
    if(customSlug !== undefined){
    return this.http.post<Slug>(
      `${this.baseURL}/v1/short-url`,
      { target: `${insertedLink}`, slug : `${customSlug }` },

    )
    ;}else{
      return this.http.post<Slug>(
        `${this.baseURL}/v1/short-url`,
        { target: `${insertedLink}` },

      );
    }
  }
  shortNotLogged(insertedLink: any) {
    return this.http.post<Slug>(`${this.baseURL}/v1/short-url`, {
      target: `${insertedLink}`,
    });
  }
  getURL(slug: string) {
    return this.http.get(`${this.baseURL}/v1/get-target/${slug}`);
  }
  getURLInfos(id: string) {
    return this.http.get<infos>(`${this.baseURL}/api/user/url/${id}`);
  }

  deleteUrl(url:any){
    const token = localStorage.getItem('id_token')
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    };
return this.http.delete(`${this.baseURL}/api/user/url/${url}`,header)

  }
}
