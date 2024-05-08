import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { customValidators } from '../../shared/lib/custom-validators';
import { DeviceService } from '../../shared/services/device.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog-delete-device',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog-delete-device.component.html',
  styleUrl: './dialog-delete-device.component.scss',
})
export class DialogDeleteDeviceComponent implements OnInit, OnDestroy {
  deviceList = [];
  devListSub: Subscription;
  deleteDeviceForm: FormGroup = new FormGroup({});

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogDeleteDeviceComponent>,
    public deviceService: DeviceService
  ) {}

  ngOnInit(): void {
    this.deleteDeviceForm = new FormGroup(
      {
        devSerialNo: new FormControl('', [Validators.required]),
      },
      { validators: customValidators.checkDeviceSerialNo.bind(this) }
    );
    this.devListSub = this.deviceService.deviceList.subscribe((devices) => {
      this.deviceList = devices;
    });
  }

  ngOnDestroy(): void {
    if (this.devListSub) {
      this.devListSub.unsubscribe();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    const result = this.deleteDeviceForm.value.devSerialNo;
    this.deviceService.deleteDevice(result).subscribe(
      (res) => {
        this.deviceService.setDeviceList(
          this.deviceList.filter((device) => device !== result)
        );
      },
      (err) => {
        console.log(err);
      }
    );
    this.dialogRef.close();
  }
}
