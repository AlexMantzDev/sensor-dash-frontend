import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SensorData } from '../models/SensorData.model';
import { Env } from '../env/env';
import { Device } from '../models/Device.model';

@Injectable({
  providedIn: 'root',
})
export class SensorDataService {
  private baseUrl = this.env.baseUrl;
  private sensorDataSubject = new BehaviorSubject<SensorData | undefined>(
    undefined
  );
  private sensorData = this.sensorDataSubject.asObservable();

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

  constructor(private http: HttpClient, private env: Env) {}

  loadTemperature(device: Device) {
    this.http.get<SensorData[]>(`${this.baseUrl}/api/v1/sensor-data`, {
      params: { deviceId: device._id },
    });
  }

  loadHumidity() {}
}
