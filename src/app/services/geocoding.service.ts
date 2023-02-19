import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"

@Injectable({
    providedIn: "root"
})
export class GeocodingService {
    geocoding = ` https://nominatim.openstreetmap.org/search?format=json&`
    constructor(private http: HttpClient) {}

    getGeocoding(address: string) {
        return this.http.get(`${this.geocoding}q=${address}`)
    }
}
