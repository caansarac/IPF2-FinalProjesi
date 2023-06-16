import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Kategori } from 'src/app/models/Kategori';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-kategori-dialog',
  templateUrl: './kategori-dialog.component.html',
  styleUrls: ['./kategori-dialog.component.css']
})
export class KategoriDialogComponent implements OnInit {
  dialogBaslik: string;
  islem: string;
  frm:FormGroup;
  yeniKayit: Kategori;

    constructor(
      public apiServis:ApiService,
      public matDialog: MatDialog,
      public frmBuild: FormBuilder,
      public dialogRef: MatDialogRef<KategoriDialogComponent>,

      @Inject (MAT_DIALOG_DATA) public data: any
    ) {

      this.islem = data.islem;
      this.yeniKayit = data.kayit;
      if (this.islem == 'ekle'){
        this.dialogBaslik = "Kategori Ekle";
      }
      if(this.islem == 'duzenle'){
        this.dialogBaslik = "Kategori Düzenle";
      }
      this.frm = this.FormOlustur();

    }

    ngOnInit() {
    }

    FormOlustur() {
      return this.frmBuild.group({
        katAdi: [this.yeniKayit.katAdi],
        katId: [this.yeniKayit.katId],
        katUrunSayisi: [this.yeniKayit.katUrunSayisi],
      });
    }
}
