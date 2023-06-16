using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using IPF2.Models;
using IPF2.ViewModel;
using System.Data.Entity.Validation;
using System.IO;
using System.Drawing;

namespace IPF2.Controllers
{
    public class ServisController : ApiController
    {
        ACSDBmdfEntities2 db = new ACSDBmdfEntities2();
        SonucModel sonuc = new SonucModel();

        #region Ürün

        [HttpGet]
        [Route("api/urunliste")]
        public List<UrunModel> UrunListe()
        {
            List<UrunModel> liste = db.Urun.Select(x => new UrunModel()
            {
                urunId = x.urunId,
                urunAdi = x.urunAdi,
                urunFiyat = x.urunFiyat,
                urunKatAdi = x.urunKatAdi,
                urunSaticisi = x.urunSaticisi,
                urunResim = x.urunResim,
                urunKatSayisi = x.Kayit.Count(),
            }).ToList();

            return liste;
        }
        [HttpGet]
        [Route("api/urunbyid/{urunId}")]
        public UrunModel UrunById(string urunId)
        {
            UrunModel kayit = db.Urun.Where(s => s.urunId == urunId).Select(x => new
            UrunModel()
            {
                urunId = x.urunId,
                urunAdi = x.urunAdi,
                urunFiyat = x.urunFiyat,
                urunKatAdi = x.urunKatAdi,
                urunResim = x.urunResim,
                urunSaticisi = x.urunSaticisi,
            }).SingleOrDefault();
            return kayit;
        }
        [HttpPost]
        [Route("api/urunekle")]
        public SonucModel UrunEkle(UrunModel model)
        {
            if (db.Urun.Count(s => s.urunAdi == model.urunAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Bu ürün adı kayıtlı.";
                return sonuc;
            }

            Urun yeni = new Urun();
            yeni.urunId = Guid.NewGuid().ToString();
            yeni.urunAdi = model.urunAdi;
            yeni.urunFiyat = model.urunFiyat;
            yeni.urunKatAdi = model.urunKatAdi;
            yeni.urunResim = model.urunResim;
            yeni.urunSaticisi = model.urunSaticisi;

            try
            {

                db.Urun.Add(yeni);
                db.SaveChanges();
            }


            catch (DbEntityValidationException ex)
            {
                var errorMessages = ex.EntityValidationErrors
                        .SelectMany(x => x.ValidationErrors)
                        .Select(x => x.ErrorMessage);

                var fullErrorMessage = string.Join("; ", errorMessages);

                var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
            }


            sonuc.islem = true;
            sonuc.mesaj = "Ürün eklendi.";
            return sonuc;
        }
        [HttpPut]
        [Route("api/urunduzenle/")]
        public SonucModel UrunDuzenle(UrunModel model)
        {
            Urun kayit = db.Urun.Where(s => s.urunId == model.urunId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Ürün bulunamadı.";
                return sonuc;
            }

            kayit.urunAdi = model.urunAdi;
            kayit.urunFiyat = model.urunFiyat;
            kayit.urunKatAdi = model.urunKatAdi;
            kayit.urunSaticisi = model.urunSaticisi;
            kayit.urunResim = model.urunResim;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Ürün düzenlendi.";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/urunsil/{urunId}")]
        public SonucModel UrunSil(string urunId)
        {
            Urun kayit = db.Urun.Where(s => s.urunId == urunId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt bulunamadı.";
                return sonuc;
            }

            if (db.Kayit.Count(s => s.kayitUrunId == urunId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Ürün bir kategoriye kayıtlı olduğu için ürün sil,nemez.";
                return sonuc;
            }

            db.Urun.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ürün silindi.";
            return sonuc;
        }
        [HttpPost]
        [Route("api/urunresimguncelle")]
        public SonucModel UrunResimGuncelle(urunFotoModel model)
        {
            Urun urun = db.Urun.Where(s => s.urunId == model.urunId).SingleOrDefault();
            if ( urun == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt bulunamadı.";
                return sonuc;
            }

            if (urun.urunResim != "profil.png")
            {
                string yol = System.Web.Hosting.HostingEnvironment.MapPath("~/Dosyalar/" +urun.urunResim);
                if (File.Exists(yol))
                {
                    File.Delete(yol);
                }
            }

            string data = model.resimData;
            string base64 = data.Substring(data.IndexOf(',') + 1);
            base64 = base64.Trim('\0');
            byte[] imgbytes = Convert.FromBase64String(base64);
            string dosyaAdi = urun.urunId + model.resimUzanti.Replace("image/", ".");
            using (var ms=new MemoryStream(imgbytes,0,imgbytes.Length))
            {
                Image img = Image.FromStream(ms, true);
                img.Save(System.Web.Hosting.HostingEnvironment.MapPath
                    ("~/Dosyalar/" + dosyaAdi));
            }

            urun.urunResim = dosyaAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Resim güncellendi.";


            return sonuc;
        }
        #endregion

        #region Kategori

        [HttpGet]
        [Route("api/kategoriliste")]
        public List<KategoriModel> KategoriListe()
        {
            List<KategoriModel> liste = db.Kategori.Select(x => new KategoriModel()
            {
                katId = x.katId,
                katAdi = x.katAdi,
                katUrunSayisi = x.Kayit.Count(),
            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/kategoribyid/{katId}")]
        public KategoriModel KategoriById(string katId)
        {
            KategoriModel kayit = db.Kategori.Where(s => s.katId == katId).Select(x => new KategoriModel()
            {
                katId = x.katId,
                katAdi = x.katAdi
            }).SingleOrDefault();
            return kayit;
        }

        [HttpPut]
        [Route("api/kategoriduzenle/")]
        public SonucModel KategoriDuzenle(KategoriModel model)
        {
            Kategori kayit = db.Kategori.Where(s => s.katId == model.katId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kategori bulunamadı.";
                return sonuc;
            }

            kayit.katId = model.katId;
            kayit.katAdi = model.katAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori düzenlendi.";

            return sonuc;
        }

        [HttpPost]
        [Route("api/kategoriekle")]
        public SonucModel KategoriEkle(KategoriModel model)
        {
            if(db.Kategori.Count(s => s.katAdi == model.katAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen kategori adı kayıtlıdır.";
            }

            Kategori yeni = new Kategori();
            yeni.katId = Guid.NewGuid().ToString();
            yeni.katAdi = model.katAdi;
            db.Kategori.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kategori eklendi.";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/kategorisil/{katId}")]

        public SonucModel KategoriSil(string katId)
        {
            Kategori kayit = db.Kategori.Where(s => s.katId == katId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt bulunamadı.";
                return sonuc;
            }

            if (db.Kayit.Count(s => s.kayitKatId == katId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kategoriye kayıtlı ürün olduğu için kategori silinemez.";
                return sonuc;
            }

            db.Kategori.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kategori silindi.";
            return sonuc;
        }
        #endregion

        #region Kayit

        [HttpGet]
        [Route("api/kategoriurunliste/{katId}")]
        public List<KayitModel> KategoriUrunListe(string katId)
        {
            List<KayitModel> liste = db.Kayit.Where(s => s.kayitKatId == katId).Select(x => new KayitModel()
            {
                kayitId = x.kayitId,
                kayitUrunId= x.kayitUrunId,
                kayitKatId = x.kayitKatId
            }
            ).ToList();
            foreach (var kayit in liste)
            {
                kayit.katBilgi = KategoriById(kayit.kayitKatId);
                kayit.urunBilgi = UrunById(kayit.kayitUrunId);
            }

            return liste;
        }

        [HttpGet]
        [Route("api/urunkategoriliste/{urunId}")]
        public List<KayitModel> UrunKategoriListe(string urunId)
        {
            List<KayitModel> liste = db.Kayit.Where(s => s.kayitUrunId == urunId).Select(x => new KayitModel()
            {
                kayitId = x.kayitId,
                kayitUrunId = x.kayitUrunId,
                kayitKatId = x.kayitKatId
            }
            ).ToList();
            foreach (var kayit in liste)
            {
                kayit.katBilgi = KategoriById(kayit.kayitKatId);
                kayit.urunBilgi = UrunById(kayit.kayitUrunId);
            }

            return liste;
        }


        [HttpPost]
        [Route("api/kayitekle")]
        public SonucModel KayitEkle(KayitModel model)
        {
            if (db.Kayit.Count(s => s.kayitKatId == model.kayitKatId &&
            s.kayitUrunId == model.kayitUrunId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "İlgili ürün kategoriye zaten kayıtlıdır.";
                return sonuc;
            }

            Kayit yeni = new Kayit();
            yeni.kayitId = Guid.NewGuid().ToString();
            yeni.kayitUrunId = model.kayitUrunId;
            yeni.kayitKatId = model.kayitKatId;
            db.Kayit.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori kaydı eklendi.";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/kayitsil/{kayitId}")]
        public SonucModel KayitSil(string kayitId)
        {
            Kayit kayit = db.Kayit.Where(s => s.kayitId == kayitId).SingleOrDefault();
            {
                if (kayit == null)
                {
                    sonuc.islem = false;
                    sonuc.mesaj = "Kayıt bulunamadı.";
                    return sonuc;
                }

                db.Kayit.Remove(kayit);
                db.SaveChanges();
                sonuc.islem = true;
                sonuc.mesaj = "Kategori kaydı silindi.";
                return sonuc;

            }

        }

        #endregion
    }
}

