import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Urun } from 'src/app/models/Urun';
import { ApiService } from 'src/app/services/api.service';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { UrunDialogComponent } from '../dialogs/urun-dialog/urun-dialog.component';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { Sonuc } from 'src/app/models/Sonuc';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { ResimyukleDialogComponent } from '../dialogs/resimyukle-dialog/resimyukle-dialog.component';
import { UrunResim } from 'src/app/models/UrunResim';

@Component({
  selector: 'app-urun',
  templateUrl: './urun.component.html',
  styleUrls: ['./urun.component.css']
})
export class UrunComponent implements OnInit {
urunler: Urun[];
displayedColumns = ['urunResim', 'urunAdi', 'urunFiyat', 'urunKatAdi', 'urunSaticisi', 'urunKatSayisi', 'islemler'];
dataSource: any;
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
dialogRef:MatDialogRef<UrunDialogComponent>;
confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
resimDialogRef:MatDialogRef<ResimyukleDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert : MyAlertService
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
  Ekle() {
    var yeniKayit: Urun = new Urun();
    this.dialogRef = this.matDialog.open(UrunDialogComponent, {
      width: '400px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.UrunEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UrunListele();
          }
        });
      }
    });
  }
  Duzenle(kayit: Urun) {
    this.dialogRef = this.matDialog.open(UrunDialogComponent, {
      width: '400px',
      data:{
        kayit: kayit,
        islem: 'duzenle' }
      });
      this.dialogRef.afterClosed().subscribe(d => {
        if (d) {
        kayit.urunAdi = d.urunAdi;
        kayit.urunFiyat = d.urunFiyat;
        kayit.urunKatAdi = d.urunKatAdi;
        kayit.urunSaticisi  = d.urunSaticisi;

        this.apiServis.UrunDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
        });
      }
  })};
  Sil(kayit: Urun) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.urunAdi + " isimli ürün silinecektir. Onaylıyor musunuz?";

    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.UrunSil(kayit.urunId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UrunListele();
          }
        })
      }
    })
  }
  ResimGuncelle(kayit: Urun) {
    this.resimDialogRef = this.matDialog.open(ResimyukleDialogComponent, {
      width: '400px',
      data:kayit
      }
    );
    this.resimDialogRef.afterClosed().subscribe((d: UrunResim) => {
      if (d) {
        d.urunId = kayit.urunId;
        this.apiServis.UrunResimGuncelle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UrunListele();
        }
        });
    }
    }
  )}
}
