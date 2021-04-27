import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgPrimeModule } from 'app/ngprime/ngprime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShareTranslateModule } from '@radoccmodules/share-translate/share-translate.module';
import { GaleriaConteudoComponent } from './galeria-conteudo.component';
import { ConteudoDisplayModule } from '@radocccomponentes/conteudo-display/conteudo-display.module';
import { ConteudoRowModule } from '@radocccomponentes/conteudo-row/conteudo-row.module';

@NgModule({
  declarations: [
    GaleriaConteudoComponent    
  ],
  entryComponents:[
    GaleriaConteudoComponent
  ],
  imports: [
    CommonModule,
    NgPrimeModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ConteudoRowModule,
    ConteudoDisplayModule,
    ShareTranslateModule,
  ],
  exports:[
    GaleriaConteudoComponent
  ]
})
export class GaleriaConteudoModule { }
