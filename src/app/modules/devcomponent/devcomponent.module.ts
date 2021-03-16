import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterActionComponent } from 'app/componentes/register-action/register-action.component';
import { NgPrimeModule } from 'app/ngprime/ngprime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { ShareTranslateModule } from '../share-translate/share-translate.module';
import { GridPesquisaModule } from 'app/componentes/gridpesquisa/gridpesquisa.module';
import { PagecadastroModule } from '@radocccomponentes/pagecadastro/pagecadastro.module';



@NgModule({
  declarations: [
    RegisterActionComponent
  ],
  imports: [
    CommonModule,
    NgPrimeModule,
    ShareTranslateModule,
    ReactiveFormsModule,
    FormsModule,
    GridPesquisaModule,
    PagecadastroModule
  ],
  exports:[
    RegisterActionComponent,
    GridPesquisaModule,
    PagecadastroModule
  ],
})
export class DevComponentModule { }
