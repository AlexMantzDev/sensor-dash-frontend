import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { SensorData } from '../models/SensorData.model';
import { env } from '../../environments/environment';
import { Device } from '../models/Device.model';

@Injectable({
  providedIn: 'root',
})
export class SensorDataService {
  private baseUrl = env.baseUrl;
  private sensorDataSubject = new BehaviorSubject<SensorData[] | undefined>(
    undefined
  );
  public sensorData: Observable<SensorData[]> =
    this.sensorDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllDataByUserId(): Observable<SensorData[]> {
    return this.http
      .get<any>(`${this.baseUrl}/sensor-dash/v1/sensor-data/`, {
        withCredentials: true,
      })
      .pipe(
        map((obj) => {
          const data = obj.data;
          this.sensorDataSubject.next(data);
          return data;
        })
      );
  }

  // getAllDataByDeviceId(deviceId: string): Observable<SensorData[]> {}

  sortSensorDataByDeviceId(
    sensorData: SensorData[]
  ): Map<string, SensorData[]> {
    const sortedData = new Map<string, SensorData[]>();
    sensorData.forEach((data) => {
      if (sortedData.has(data.device)) {
        sortedData.get(data.device)?.push(data);
      } else {
        sortedData.set(data.device, [data]);
      }
    });
    return sortedData;
  }

  genDummyData(deviceId: string, numEntries: number): Observable<any> {
    return this.http.post<SensorData>(
      `${this.baseUrl}/sensor-dash/v1/sensor-data/dummy`,
      {
        deviceId,
        numEntries,
      },
      { withCredentials: true }
    );
  }
}
