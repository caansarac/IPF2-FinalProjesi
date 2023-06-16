import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Urun } from '../models/Urun';
import { Kategori } from '../models/Kategori';
import { Observable } from 'rxjs';
import { Sonuc } from '../models/Sonuc';
import { Kayit } from '../models/Kayit';
import { UrunComponent } from '../components/urun/urun.component';
import { UrunResim } from '../models/UrunResim';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = "https://localhost:44321/api/";
  siteUrl = "https://localhost:44321/";
constructor(
  public http: HttpClient
) { }

  UrunListe(): Observable<Urun[]> {
  return this.http.get<Urun[]>(this.apiUrl + "urunliste");
  }
  UrunById(urunId: string) {
  return this.http.get(this.apiUrl +"urunbyid/" + urunId)
  }
  UrunEkle(urun: Urun): Observable<Sonuc> {
  return this.http.post<Sonuc>(this.apiUrl +"urunekle", urun);
  }
  UrunDuzenle(urun: Urun) {
  return this.http.put<Sonuc>(this.apiUrl +"urunduzenle/", urun);
  }
  UrunSil (urunId: string) {
  return this.http.delete<Sonuc>(this.apiUrl +"urunsil/" + urunId);
  }
  UrunResimGuncelle(UrunResim: UrunResim): Observable<Sonuc> {
    return this.http.post<Sonuc>(this.apiUrl +"urunresimguncelle", UrunResim);
  }

  KategoriListe() {
    return this.http.get(this.apiUrl +"kategoriliste");
    }
  KategoriById(katId: string) {
    return this.http.get(this.apiUrl +"kategoribyid/" + katId);
    }
  KategoriEkle(kat: Kategori) {
    return this.http.post(this.apiUrl +"kategoriekle", kat);
    }
  KategoriDuzenle(kat: Kategori) {
    return this.http.put<Sonuc>(this.apiUrl +"kategoriduzenle/", kat);
    }
  KategoriSil (katId: string) {
    return this.http.delete(this.apiUrl +"kategorisil/" + katId);
    }

  KategoriUrunListe(katId:string) {
    return this.http.get(this.apiUrl +"kategoriurunliste/" + katId);
    }
  UrunKategoriListe(urunId:string) {
    return this.http.get(this.apiUrl +"urunkategoriliste/" + urunId);
    }
  KayitEkle(kayit: Kayit) {
    return this.http.post(this.apiUrl + "kayitekle", kayit);
  }
  KayitSil(kayitId: string) {
    return this.http.delete(this.apiUrl + "kayitsil/"+ kayitId);
  }
}

