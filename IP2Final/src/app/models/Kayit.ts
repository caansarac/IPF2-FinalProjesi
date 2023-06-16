import { Urun } from "./Urun";
import { Kategori } from "./Kategori";

export class Kayit {
  kayitId: string;
  kayitUrunId: string;
  kayitKatId: string;
  urunBilgi: Urun;
  katBilgi: Kategori;
}
