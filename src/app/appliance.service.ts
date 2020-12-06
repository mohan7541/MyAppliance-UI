import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Appliance from "./model/Appliances";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplianceService {

  private REST_API_SERVER = "http://localhost:8080/appliance";

  constructor(private httpClient: HttpClient) { }

  public getAllAppliances(params: string): Observable<Appliance[]> {
    var url = this.REST_API_SERVER;
    if(params) {
      url = this.REST_API_SERVER + "?"+params;
    }
    return this.httpClient.get<Appliance[]>(url);
  }

  public createAppliance(appliance: Appliance): Observable<Appliance> {
    console.log(appliance);
    return this.httpClient.post<Appliance>(this.REST_API_SERVER, appliance);
  }

  public updateAppliance(applinace: Appliance) {
    return this.httpClient.put<Appliance>(this.REST_API_SERVER, applinace);
  }

  public removeAppliance(serialNumber: String): Observable<void> {
    return this.httpClient.delete<void>(this.REST_API_SERVER + '/' + serialNumber);
  }
}
