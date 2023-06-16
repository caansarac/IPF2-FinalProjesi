import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Kayit } from 'src/app/models/Kayit';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { Urun } from 'src/app/models/Urun';
import { Kategori } from 'src/app/models/Kategori';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-kategorilistele',
  templateUrl: './kategorilistele.component.html',
  styleUrls: ['./kategorilistele.component.css']
})
export class KategorilisteleComponent implements OnInit {
kayitlar: Kayit[];
kategoriler: Kategori[];
secUrun: Urun;
dataSource: any;
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
urunId: string;
katId: string = "";
confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
displayedColumns=['katAdi', 'katId', 'islemler']

  constructor(
    public apiServis: ApiService,
    public alert: MyAlertService,
    public route : ActivatedRoute,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p['urunId']) {
        this.urunId = p['urunId'];
        this.UrunGetir();
        this.KayitListele();
        this.KategoriListele();
      }
    });
  }

  UrunGetir() {
    this.apiServis.UrunById(this.urunId).subscribe((d: Urun) => {
      this.secUrun = d;
    });
  }
  KayitListele() {
    this.apiServis.UrunKategoriListe(this.urunId).subscribe((d: Kayit[]) => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(this.kayitlar);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  KategoriListele() {
    this.apiServis.KategoriListe().subscribe((d: Kategori[]) => {
      this.kategoriler = d;
    });
  }
  KategoriSec(katId: string) {
    this.katId = katId;
  }
  Kaydet() {
    if (this.katId == "") {
      var s:Sonuc = new Sonuc();
      s.mesaj = "Kategori seçiniz";
      this.alert.AlertUygula(s);

      return false;
    }
    var kayit: Kayit = new Kayit();
    kayit.kayitUrunId = this.urunId;
    kayit.kayitKatId = this.katId;

    this.apiServis.KayitEkle(kayit).subscribe((s: Sonuc) => {
      this.alert.AlertUygula(s);
      if (s.islem) {
        this.KayitListele();
      }
      }
    );
  }
  Sil(kayit: Kayit) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.katBilgi.katAdi + " kategorisi üründen silinecek. Onaylıyor musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if(d) {
        this.apiServis.KayitSil(kayit.kayitId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem)
          {
            this.KayitListele();
          }
        });

      }
    });
  }
}
