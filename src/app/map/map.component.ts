import { GeocodingService } from './../services/geocoding.service';
import { Component, Input, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @Input() click: any;
  constructor(private geocoding: GeocodingService) {}

  ngOnInit(): void {
    (mapboxgl as any).accessToken =
      'pk.eyJ1IjoicGVsbWF0OTciLCJhIjoiY2wxYjN0ZHkzMW1jODNqcGZmcTFnZ2QyOSJ9.fFSrxtClplLuvDOrrXVwAw';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [52,5],
      zoom: 1,
      attributionControl: false,
    });
    this.click.map((eachClick: any) => {
      let clickInfos = eachClick;

      let click_ids = clickInfos._id;
      console.log(click_ids);
      //try

      this.geocoding.getGeocoding(click_ids).subscribe((res: any) => {
        console.log('geocoding res', res);
        let latitude = res[0].lat;
        let longitude = res[0].lon;
        console.log('latitude', latitude);
        console.log('longitude', longitude);
        let coordinates: [number, number] = [longitude, latitude];
        console.log('coordinates', coordinates);
        let message = res[0].display_name;

        // create a HTML element for each feature
        let el = document.createElement('div');
        el.className = 'marker';
        if (clickInfos.count <= 1) {
          el.classList.add('marker-minor');
        }
        if (clickInfos.count > 1) {
          el.classList.add('marker-major');
        }

        // make a marker for each feature and add to the map
        const marker= new mapboxgl.Marker(el)
          .setLngLat(coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                `<h3 class="where-title">${message}</h3><p class="clicks-num">Clicks: ${clickInfos.count}</p>`
              )
          )
          .addTo(map);

      });
    });

    const layers = ['0-10', '10-20', '20-50', '50-100', '100-200'];
    const colors = ['#e2f0e8', '#c2e1d0', '#9cd0b8', '#71c09f', '#30b086'];
    const legend = document.getElementById('legend');

    layers.forEach((layer, i) => {
      const color = colors[i];
      const item = document.createElement('div');
      const key = document.createElement('span');
      key.className = 'legend-key';
      key.style.backgroundColor = color;

      const value = document.createElement('span');
      value.innerHTML = `${layer}`;
      item.appendChild(key);
      item.appendChild(value);
      legend!.appendChild(item);
    });
  }
}
