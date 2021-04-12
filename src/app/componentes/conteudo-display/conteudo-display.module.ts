import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgPrimeModule } from 'app/ngprime/ngprime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShareTranslateModule } from '@radoccmodules/share-translate/share-translate.module';
import { ConteudoDisplayComponent } from './conteudo-display.component';

@NgModule({
  declarations: [
    ConteudoDisplayComponent
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
    ConteudoDisplayComponent
  ]
})
export class ConteudoDisplayModule { }
