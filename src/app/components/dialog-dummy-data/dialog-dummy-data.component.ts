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
    public sensorDataService: SensorDataService,
    public dialogRef: MatDialogRef<DialogDummyDataComponent>
  ) {}

  ngOnInit() {
    this.dummyDataForm = new FormGroup({
      deviceId: new FormControl('', [Validators.required]),
      numEntries: new FormControl('10', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.dummyDataForm.invalid) return;
    const deviceId = this.dummyDataForm.get('deviceId')?.value;
    const numEntries = this.dummyDataForm.get('numEntries')?.value;
    this.sensorDataService
      .genDummyData(deviceId, numEntries)
      .subscribe((res) => {
        this.dialogRef.close();
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
