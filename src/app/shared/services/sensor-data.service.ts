import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SensorData } from '../models/SensorData.model';

@Injectable({
  providedIn: 'root',
})
export class SensorDataService {
  private baseUrl = 'http://localhost:3000/api/v1/sensor-data';
  private sensorDataSubject = new BehaviorSubject<SensorData | undefined>(
    undefined
  );
  sensorData = this.sensorDataSubject.asObservable();

  public data = [
    { time: '1714539600', temperature: 75 },
    { time: '1714543200', temperature: 75 },
    { time: '1714546800', temperature: 75 },
    { time: '1714550400', temperature: 75 },
    { time: '1714554000', temperature: 75 },
    { time: '1714557600', temperature: 75 },
    { time: '1714561200', temperature: 75 },
    { time: '1714564800', temperature: 75 },
    { time: '1714568400', temperature: 75 },
    { time: '1714572000', temperature: 75 },
    { time: '1714575600', temperature: 75 },
    { time: '1714579200', temperature: 75 },
    { time: '1714582800', temperature: 75 },
  ];

  constructor(private http: HttpClient) {}

  loadTemperature(deviceId: string) {
    this.http.get<SensorData[]>(this.baseUrl, { params: { deviceId } });
  }

  loadHumidity() {}
}
