import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgPrimeModule } from 'app/ngprime/ngprime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShareTranslateModule } from '@radoccmodules/share-translate/share-translate.module';
import { PageCadastroConteudoComponent } from './pagecadastro-conteudo';
import { PagecadastroModule } from '@radocccomponentes/pagecadastro/pagecadastro.module';
import { RegisterActionModule } from '@radocccomponentes/register-action/register-action.module';


@NgModule({
  declarations: [
    PageCadastroConteudoComponent
  ],
  imports: [
    CommonModule,
    NgPrimeModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ShareTranslateModule,
    RegisterActionModule,
    PagecadastroModule,
    
  ],
  exports:[
    PageCadastroConteudoComponent
  ]
})
export class PageCadastroConteudoModule { }
