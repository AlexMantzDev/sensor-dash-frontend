import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SensorData } from '../models/sensorData.model';

@Injectable({
  providedIn: 'root',
})
export class SensorDataServiceService {
  private baseUrl = 'http://localhost:3000/api/v1/sensor-data';
  private sensorDataSubject = new BehaviorSubject<SensorData | undefined>(
    undefined
  );
  sensorData = this.sensorDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadTemperature() {
    this.http.get<SensorData[]>(this.baseUrl);
  }

  loadHumidity() {}
}
