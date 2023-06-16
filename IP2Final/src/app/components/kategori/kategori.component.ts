import { Component, OnInit, ViewChild } from '@angular/core';
import { Kategori } from 'src/app/models/Kategori';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { KategoriDialogComponent } from '../dialogs/kategori-dialog/kategori-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.component.html',
  styleUrls: ['./kategori.component.css']
})
export class KategoriComponent implements OnInit {
kategoriler: Kategori[];
dataSource: any;
displayedColumns = ['katAdi','katId','katUrunSayisi','islemler'];
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
dialogRef: MatDialogRef<KategoriDialogComponent>;
confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis: ApiService,
    public alert : MyAlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit()
  {
    this.KategoriListele();
  }
  KategoriListele() {
    this.apiServis.KategoriListe().subscribe((d: Kategori[]) => {
      this.kategoriler = d;
      this.dataSource = new MatTableDataSource(d);
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
    var yeniKayit: Kategori = new Kategori();
    this.dialogRef = this.matDialog.open(KategoriDialogComponent, {
      width: '400px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KategoriEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KategoriListele();
          }
        });
      }
    });
  }
  Duzenle(kayit: Kategori) {
    this.dialogRef = this.matDialog.open(KategoriDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        d.katId = kayit.katId;
        this.apiServis.KategoriDuzenle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KategoriListele();
          }
        }
      )}
    });
  }

  Sil(kayit: Kategori) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px'
  });
  this.confirmDialogRef.componentInstance.dialogMesaj = kayit.katAdi + " kategorisi silinecektir. Onaylıyor musunuz?";
  this.confirmDialogRef.afterClosed().subscribe(d => {
    if (d) {
      this.apiServis.KategoriSil(kayit.katId).subscribe((s: Sonuc) => {
        this.alert.AlertUygula(s);
        if (s.islem) {
          this.KategoriListele();
        }
      });
    }
  }
  )};
}
