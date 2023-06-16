using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IPF2.ViewModel
{
    public class KayitModel
    {
        public string kayitId { get; set; }
        public string kayitUrunId { get; set; }
        public string kayitKatId { get; set; }
        public KategoriModel katBilgi { get; set; }
        public UrunModel urunBilgi { get; set; }
    }
}