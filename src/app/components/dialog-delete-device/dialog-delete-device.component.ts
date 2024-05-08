import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { customValidators } from '../../shared/lib/custom-validators';

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
export class DialogDeleteDeviceComponent implements OnInit {
  @Input() deviceId: string;
  deleteDeviceForm: FormGroup = new FormGroup({});
  public data = {
    deviceId: '',
  };

  constructor(public dialogRef: MatDialogRef<DialogDeleteDeviceComponent>) {
    customValidators.checkDeviceIdValidator =
      customValidators.checkDeviceIdValidator.bind(this);
  }

  ngOnInit(): void {
    this.deleteDeviceForm = new FormGroup(
      {
        deviceId: new FormControl('', [Validators.required]),
      },
      { validators: customValidators.checkDeviceIdValidator }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    const result = this.deleteDeviceForm.value.deviceId;
    this.dialogRef.close(result);
  }
}
