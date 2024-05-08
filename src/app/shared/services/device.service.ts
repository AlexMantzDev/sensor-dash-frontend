import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Device } from '../models/Device.model';
import { env } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private baseUrl = env.baseUrl;
  private devicesSubject = new BehaviorSubject<Device[] | null>(null);
  public deviceList = this.devicesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getDevices(): Observable<Device[]> {
    return this.http
      .get<Device[]>(`${this.baseUrl}/sensor-dash/v1/devices`, {
        withCredentials: true,
      })
      .pipe(
        map((devices) => {
          this.devicesSubject.next(devices);
          return devices;
        })
      );
  }

  addDevice(device: Device): Observable<Device> {
    return this.http.post<Device>(
      `${this.baseUrl}/sensor-dash/v1/devices/add`,
      device,
      { withCredentials: true }
    );
  }

  updateDevice(device: Device): Observable<any> {
    return this.http.patch<Device>(
      `${this.baseUrl}/sensor-dash/v1/devices/${device._id}`,
      device,
      { withCredentials: true }
    );
  }

  deleteDevice(device: Device): Observable<any> {
    return this.http.delete<Device>(
      `${this.baseUrl}/sensor-dash/b1/devices/${device._id}`,
      { withCredentials: true }
    );
  }
}
