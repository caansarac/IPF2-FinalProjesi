using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IPF2.ViewModel
{
    public class UrunModel
    {
        public string urunId { get; set; }
        public string urunAdi { get; set; }
        public string urunKatAdi { get; set; }
        public int urunFiyat { get; set; }
        public string urunSaticisi { get; set; }
        public int urunKatSayisi { get; set; }
        public string urunResim { get; set; }
    }
}