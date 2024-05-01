import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceServiceService {
  private baseUrl = 'http://localhost:3000/api/v1/devices';
  private devicesSubject = new BehaviorSubject<Device[] | undefined>(undefined);
  deviceList = this.devicesSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadDevices() {
    this.http.get<Device[]>(this.baseUrl).subscribe((devices) => {
      this.devicesSubject.next(devices);
    });
  }

  addDevice(device: Device): Observable<Device> {
    return this.http
      .post<Device>(this.baseUrl, device)
      .pipe(tap(() => this.loadDevices()));
  }

  updateDevice(device: Device): Observable<Device> {
    return this.http
      .put<Device>(`${this.baseUrl}/${device._id}`, device)
      .pipe(tap(() => this.loadDevices()));
  }

  deleteDevice(id: string): Observable<Device> {
    return this.http
      .delete<Device>(`${this.baseUrl}/${id}`)
      .pipe(tap(() => this.loadDevices()));
  }
}
