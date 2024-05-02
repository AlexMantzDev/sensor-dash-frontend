import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Device } from '../models/Device.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private baseUrl = 'http://localhost:3000/api/v1/devices';

  private devices: Device[] = [
    { _id: '123123', ownerId: '123123' },
    { _id: '234234', ownerId: '234234' },
  ];

  public devicesSubject = new BehaviorSubject<Device[] | null>(this.devices);
  public devicesList = this.devicesSubject.asObservable();

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
