import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Device } from '../models/Device.model';
import { Env } from '../env/env';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private baseUrl = this.env.baseUrl;

  private devices: Device[] = [
    { _id: '123123', ownerId: '123123' },
    { _id: '234234', ownerId: '234234' },
  ];

  public devicesSubject = new BehaviorSubject<Device[] | null>(this.devices);
  public devicesList = this.devicesSubject.asObservable();

  constructor(private http: HttpClient, private env: Env) {}

  loadDevices() {
    this.http.get<Device[]>(this.baseUrl).subscribe((devices) => {
      this.devicesSubject.next(devices);
    });
  }

  addDevice(device: Device): Observable<Device> {
    return this.http
      .post<Device>(`${this.baseUrl}/api/v1/devices`, device)
      .pipe(tap(() => this.loadDevices()));
  }

  updateDevice(device: Device): Observable<Device> {
    return this.http
      .put<Device>(`${this.baseUrl}/api/v1/devices/${device._id}`, device)
      .pipe(tap(() => this.loadDevices()));
  }

  deleteDevice(device: Device): Observable<Device> {
    return this.http
      .delete<Device>(`${this.baseUrl}/api/b1/devices/${device._id}`)
      .pipe(tap(() => this.loadDevices()));
  }
}
