import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgPrimeModule } from 'app/ngprime/ngprime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { ShareTranslateModule } from '../share-translate/share-translate.module';
import { GridPesquisaModule } from 'app/componentes/gridpesquisa/gridpesquisa.module'; 



@NgModule({
  declarations: [ 
  ],
  imports: [
    CommonModule,
    NgPrimeModule,
    ShareTranslateModule,
    ReactiveFormsModule,
    FormsModule,
    GridPesquisaModule,
  ],
  exports:[
    GridPesquisaModule
  ],
})
export class DevComponentModule { }
