import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PainelSiteComponent } from './componentes/layouts/painel-site/painel-site.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgPrimeModule } from './ngprime/ngprime.module';
import { ConteudoModule } from './pages/conteudo/conteudo.module'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from '@radoccpages/login/login.page';
import { ShareTranslateModule } from './modules/share-translate/share-translate.module';
import { NoopInterceptor } from '@radoccservices/base/interceptor-http';
import { Router } from '@angular/router';
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RegisterActionComponent } from './componentes/register-action/register-action.component';
import { DevComponentModule } from './modules/devcomponent/devcomponent.module';
import { DevionnTranslateLoader } from './modules/share-translate/devionn-translate-loader';
@NgModule({
  declarations: [
    AppComponent,
    PainelSiteComponent,
    LoginPage
  ],
  exports:[
    ShareTranslateModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgPrimeModule, 
    ConteudoModule,
    HttpClientModule,
    ShareTranslateModule,
    DevComponentModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    DevionnTranslateLoader,
    { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true, deps: [Router] },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
