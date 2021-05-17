import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { NgPrimeModule } from 'app/ngprime/ngprime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShareTranslateModule } from '@radoccmodules/share-translate/share-translate.module';
import { ConteudoDisplayComponent } from './conteudo-display.component'; 
import { ConteudoRowModule } from '@radocccomponentes/conteudo-row/conteudo-row.module';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}; 
@NgModule({
  declarations: [
    ConteudoDisplayComponent
  ],
  entryComponents:[
    ConteudoDisplayComponent
  ],
  imports: [
    CommonModule,
    NgPrimeModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ConteudoRowModule,
    ShareTranslateModule,
  ],
  providers:[
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  exports:[
    ConteudoDisplayComponent
  ]
})
export class ConteudoDisplayModule { }
