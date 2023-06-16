import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Urun } from 'src/app/models/Urun';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-urun-dialog',
  templateUrl: './urun-dialog.component.html',
  styleUrls: ['./urun-dialog.component.css']
})
export class UrunDialogComponent implements OnInit {
dialogBaslik: string;
islem: string;
frm:FormGroup;
yeniKayit: Urun;

  constructor(
    public apiServis:ApiService,
    public matDialog: MatDialog,
    public frmBuild: FormBuilder,
    public dialogRef: MatDialogRef<UrunDialogComponent>,

    @Inject (MAT_DIALOG_DATA) public data: any
  ) {

    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem == 'ekle'){
      this.dialogBaslik = "Ürün Ekle";
    }
    if(this.islem == 'duzenle'){
      this.dialogBaslik = "Ürün Düzenle";
    }
    this.frm = this.FormOlustur();

  }

  ngOnInit() {
  }

  FormOlustur() {
    return this.frmBuild.group({
      urunAdi: [this.yeniKayit.urunAdi],
      urunFiyat: [this.yeniKayit.urunFiyat],
      urunSaticisi: [this.yeniKayit.urunSaticisi],
      urunKatAdi: [this.yeniKayit.urunKatAdi],
      urunResim: [this.yeniKayit.urunResim],
    });
  }
}
