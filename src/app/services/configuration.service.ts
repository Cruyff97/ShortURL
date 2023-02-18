import { Injectable } from '@angular/core'

import configuration from '../config/environment.json'

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

constructor() {
}

getBackendUrl(){
  return structuredClone(configuration.host.backend)
}

getHost(){
  return structuredClone(configuration.host.webapp)
}

}
