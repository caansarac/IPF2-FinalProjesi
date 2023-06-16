import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Urun } from 'src/app/models/Urun';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ResimyukleDialogComponent } from '../resimyukle-dialog/resimyukle-dialog.component';
import { UrunDialogComponent } from '../urun-dialog/urun-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-urunsec-dialog',
  templateUrl: './urunsec-dialog.component.html',
  styleUrls: ['./urunsec-dialog.component.css']
})
export class UrunsecDialogComponent implements OnInit {
  urunler: Urun[];
  displayedColumns = ['urunAdi', 'urunFiyat', 'urunKatAdi', 'urunSaticisi', 'urunKatSayisi', 'islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  resimDialogRef:MatDialogRef<ResimyukleDialogComponent>;
    constructor(
      public apiServis: ApiService,
      public matDialog: MatDialog,
      public alert : MyAlertService,
      public dialogRef:MatDialogRef<UrunDialogComponent>

    ) { }

    ngOnInit() {
      this.UrunListele();
    }

    UrunListele() {
      this.apiServis.UrunListe().subscribe((d:Urun[]) => {
        this.urunler = d;
      this.dataSource = new MatTableDataSource(this.urunler);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      });
    }
    Filtrele(e){
      var deger = e.target.value;
      this.dataSource.filter = deger.trim().toLowerCase();
      if(this.dataSource.paginator){
        this.dataSource.paginator.firstPage();
      }
    }
    UrunSec(urun: Urun){
      this.dialogRef.close(urun);
    }
}
