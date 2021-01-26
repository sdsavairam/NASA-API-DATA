import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NasaService {
  private url: string;
  constructor(private http: HttpClient) { }

  public getNasaResult(key: string) {
    this.url = 'https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key='+key;
    return this.http.get(this.url);
  }
}
