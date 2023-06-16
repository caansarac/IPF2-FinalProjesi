import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit {

  dialogBaslik : string;
  dialogMesaj : string;
  dialogIslem : boolean;

  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
  ) { }

  ngOnInit() {
  }

}
