import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/Home/Home.component';
import { UrunComponent } from './components/urun/urun.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { KategorilisteleComponent } from './components/kategorilistele/kategorilistele.component';
import { UrunlisteleComponent } from './components/urunlistele/urunlistele.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'urun',
    component: UrunComponent
  },
  {
    path:'kategori',
    component: KategoriComponent
  },
  {
    path:'kategorilistele/:urunId',
    component: KategorilisteleComponent
  },
  {
    path:'urunlistele/:katId',
    component: UrunlisteleComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
