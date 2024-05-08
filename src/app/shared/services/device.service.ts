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
  private deviceListSubject = new BehaviorSubject<Device[] | null>(null);
  public deviceList = this.deviceListSubject.asObservable();

  constructor(private http: HttpClient) {}

  public setDeviceList(devices: Device[]): void {
    this.deviceListSubject.next(devices);
  }

  public getDevices(): Observable<Device[]> {
    return this.http
      .get<Device[]>(`${this.baseUrl}/sensor-dash/v1/devices`, {
        withCredentials: true,
      })
      .pipe(
        map((devices) => {
          this.deviceListSubject.next(devices);
          return devices;
        })
      );
  }

  public addDevice(device: Device): Observable<Device> {
    return this.http.post<Device>(
      `${this.baseUrl}/sensor-dash/v1/devices/add`,
      device,
      { withCredentials: true }
    );
  }

  public updateDevice(device: Device): Observable<any> {
    return this.http.patch<Device>(
      `${this.baseUrl}/sensor-dash/v1/devices/${device._id}`,
      device,
      { withCredentials: true }
    );
  }

  public deleteDevice(serialNo: string): Observable<any> {
    return this.http.delete<Device>(
      `${this.baseUrl}/sensor-dash/v1/devices/${serialNo}`,
      { withCredentials: true }
    );
  }

  public getDeviceBySerialNo(serialNo: string): Observable<Device> {
    return this.http.get<Device>(
      `${this.baseUrl}/sensor-dash/v1/devices/serial/${serialNo}`,
      { withCredentials: true }
    );
  }
}
