import { Component, OnInit } from '@angular/core';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { Sonuc } from 'src/app/models/Sonuc';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {
confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public alert: MyAlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
  }

  AlertAc(p: boolean) {
    var s: Sonuc = new Sonuc();
    s.islem = p;
    s.mesaj = "Alert test mesajı.";

    this.alert.AlertUygula(s);
  }
  ConfirmAc (){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = "Silme işlemini onaylıyor musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d=>{
      console.log(d);
      if(d) {
        //Silme Rutini


      }
    });
  }

}
