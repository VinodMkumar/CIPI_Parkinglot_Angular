import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TagDetailsService {
  private baseURL = 'https://localhost:7265/Parking/';

  constructor(private httpClient: HttpClient) { }

  getTagData() {
    return this.httpClient.get(this.baseURL + 'GetTakenParkingSpot');
  }
  inTagData(intag: any) {
    return this.httpClient.post<any>(this.baseURL + 'InParkingSpot?tagNumber=' + intag, null);
  }
  outTagData(outtag: any) {
    return this.httpClient.put<any>(this.baseURL + 'OutParkingSpot?tagNumber=' + outtag, null);
  }
  getModalStats() {
    return this.httpClient.get(this.baseURL + 'GetModelStats');
  }
}
