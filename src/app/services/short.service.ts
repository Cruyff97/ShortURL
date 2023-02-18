import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { infos } from '../interface/infos'
import { Slug } from '../slug'
import { ConfigurationService } from './configuration.service'

@Injectable({ providedIn: 'root' })
export class ShortService {
baseURL=''
  constructor(private http: HttpClient, private ConfigurationService:ConfigurationService) {
    this.baseURL = this.ConfigurationService.getBackendUrl()
  }
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

  getTarget(slug:string){
    return this.http
      .get(`${this.baseURL}v1/get-target/${slug}`)
  }
  deleteUrl(url:any){
    const token = localStorage.getItem('id_token')
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    };
return this.http.delete(`${this.baseURL}/api/user/url/${url}`,header)

  }
}
