import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SensorDataService } from '../../shared/services/sensor-data.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceService } from '../../shared/services/device.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog-dummy-data',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './dialog-dummy-data.component.html',
  styleUrl: './dialog-dummy-data.component.scss',
})
export class DialogDummyDataComponent implements OnInit {
  dummyDataForm: FormGroup = new FormGroup({});

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public sensorDataService: SensorDataService,
    public deviceService: DeviceService,
    public dialogRef: MatDialogRef<DialogDummyDataComponent>
  ) {}

  ngOnInit() {
    this.dummyDataForm = new FormGroup({
      serialNo: new FormControl('', [Validators.required]),
      numEntries: new FormControl('10', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.dummyDataForm.invalid) return;
    const serialNo = this.dummyDataForm.get('serialNo')?.value;
    const numEntries = this.dummyDataForm.get('numEntries')?.value;
    this.sensorDataService
      .genDummyData(serialNo, numEntries)
      .subscribe((res) => {
        this.sensorDataService.getAllData().subscribe((data) => {
          const sensorDataMap =
            this.sensorDataService.sortSensorDataByDeviceId(data);
          const devices = [];
          for (let [device, sensorData] of sensorDataMap) {
            devices.push(device);
            this.deviceService.setDeviceList(devices);
          }
        });

        this.dialogRef.close();
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
