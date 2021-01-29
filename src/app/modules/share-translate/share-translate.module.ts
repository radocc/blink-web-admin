import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import localePt from '@angular/common/locales/pt';
import { DevionnTranslateLoader } from './devionn-translate-loader';

registerLocaleData(localePt);
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: DevionnTranslateLoader,
        deps: [Router, HttpClient]
      }
    })
  ],
  providers:[
    DevionnTranslateLoader
  ],
  exports:[
    TranslateModule
  ]
})
export class ShareTranslateModule {

  constructor(public translate: TranslateService){
      let lang = sessionStorage.getItem('lang');
      if(lang == null || lang == '' || !lang || lang == 'undefined'){
          lang = 'pt';
      }
      this.translate.setDefaultLang(lang);
      translate.use(lang);
  }
}
