import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Urun } from 'src/app/models/Urun';
import { UrunResim } from 'src/app/models/UrunResim';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-resimyukle-dialog',
  templateUrl: './resimyukle-dialog.component.html',
  styleUrls: ['./resimyukle-dialog.component.css']
})
export class ResimyukleDialogComponent implements OnInit {
secilenResim: any;
urunResim: UrunResim = new UrunResim();
secUrun: Urun
  constructor(
    public resimDialogRef : MatDialogRef<ResimyukleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public apiServis: ApiService
  ) {
    this.secUrun = this.data;
   }


  ngOnInit() {
  }
  ResimSec(e) {
    var resimler = e.target.files;
    var resim = resimler[0];

    var fr = new FileReader();
    fr.onloadend = () => {
      this.secilenResim = fr.result;
      this.urunResim.resimData = fr.result.toString();
      this.urunResim.resimUzanti = resim.type;
    };
    fr.readAsDataURL(resim);
  }
}
