import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Kategori } from 'src/app/models/Kategori';
import { ApiService } from 'src/app/services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Kayit } from 'src/app/models/Kayit';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { UrunsecDialogComponent } from '../dialogs/urunsec-dialog/urunsec-dialog.component';

@Component({
  selector: 'app-urunlistele',
  templateUrl: './urunlistele.component.html',
  styleUrls: ['./urunlistele.component.css']
})
export class UrunlisteleComponent implements OnInit {
  katId: string;
  secKat: Kategori;
  kayitlar: Kayit[];
  displayedColumns = ['urunResim', 'urunAdi', 'urunFiyat', 'urunKatAdi', 'urunSaticisi', 'islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  dialogRef: MatDialogRef<UrunsecDialogComponent>;

  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p) {
        this.katId = p['katId'];
        this.KategoriById();
        this.KayitListele();
      }
    });
  }
  KayitListele() {
    this.apiServis.KategoriUrunListe(this.katId).subscribe((d: Kayit[]) => {
      this.kayitlar = d;
    this.dataSource = new MatTableDataSource(this.kayitlar);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    });
  }
  KategoriById() {
    this.apiServis.KategoriById(this.katId).subscribe((d: Kategori) => {
      this.secKat = d;
    }
  )};
  Ekle() {
    this.dialogRef = this.matDialog.open(UrunsecDialogComponent, {
      width: '700px'
    })
    this.dialogRef.afterClosed().subscribe(d => {
      if (d)
      {
        var kayit: Kayit = new Kayit();
        kayit.kayitUrunId = d.urunId;
        kayit.kayitKatId = this.katId;

        this.apiServis.KayitEkle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitListele();
          }
        });
      }
    });
  }
  Sil(kayit: Kayit) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.urunBilgi.urunAdi + " adlı ürün bu kategoriden kaldırılacaktır. Onaylıyor musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KayitSil(kayit.kayitId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitListele();
          }
        });
      }
    });
  }
}
