import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/Home/Home.component';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { UrunComponent } from './components/urun/urun.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { UrunDialogComponent } from './components/dialogs/urun-dialog/urun-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { KategorilisteleComponent } from './components/kategorilistele/kategorilistele.component';
import { ResimyukleDialogComponent } from './components/dialogs/resimyukle-dialog/resimyukle-dialog.component';
import { KategoriDialogComponent } from './components/dialogs/kategori-dialog/kategori-dialog.component';
import { UrunlisteleComponent } from './components/urunlistele/urunlistele.component';
import { UrunsecDialogComponent } from './components/dialogs/urunsec-dialog/urunsec-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    UrunComponent,
    KategoriComponent,
    KategorilisteleComponent,
    UrunlisteleComponent,

    //Dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    UrunDialogComponent,
    ResimyukleDialogComponent,
    KategoriDialogComponent,
    UrunsecDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    UrunDialogComponent,
    ResimyukleDialogComponent,
    KategoriDialogComponent,
    UrunsecDialogComponent
  ],
  providers: [MyAlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
