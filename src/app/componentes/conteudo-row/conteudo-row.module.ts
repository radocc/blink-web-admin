import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConteudoRowComponent } from './conteudo-row.component';
import { NgPrimeModule } from 'app/ngprime/ngprime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShareTranslateModule } from '@radoccmodules/share-translate/share-translate.module';
import { TempoExibicaoPipe } from 'app/directives/tempoExibicao.pipe';

@NgModule({
  declarations: [
    ConteudoRowComponent,
    TempoExibicaoPipe 
  ],
  imports: [
    CommonModule,
    NgPrimeModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ShareTranslateModule,
  ],
  exports:[
    ConteudoRowComponent,
    TempoExibicaoPipe 
  ]
})
export class ConteudoRowModule { }
