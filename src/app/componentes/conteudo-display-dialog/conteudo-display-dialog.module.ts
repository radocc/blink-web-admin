import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgPrimeModule } from 'app/ngprime/ngprime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShareTranslateModule } from '@radoccmodules/share-translate/share-translate.module';
import { ConteudoDisplayDialogComponent } from './conteudo-display-dialog.component';
import { ConteudoDisplayModule } from '@radocccomponentes/conteudo-display/conteudo-display.module';

@NgModule({
  declarations: [
    ConteudoDisplayDialogComponent
  ],
  entryComponents:[
    ConteudoDisplayDialogComponent
  ],
  imports: [
    CommonModule,
    NgPrimeModule,
    ReactiveFormsModule,
    ConteudoDisplayModule,
    FormsModule,
    RouterModule,
    ShareTranslateModule,
  ],
  exports:[
    ConteudoDisplayDialogComponent
  ]
})
export class ConteudoDisplayDialogModule { }
