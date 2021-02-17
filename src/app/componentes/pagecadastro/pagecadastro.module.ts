import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageCadastroComponent } from './pagecadastro.component';
import { NgPrimeModule } from 'app/ngprime/ngprime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShareTranslateModule } from '@radoccmodules/share-translate/share-translate.module';



@NgModule({
  declarations: [
    PageCadastroComponent
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
    PageCadastroComponent
  ]
})
export class PagecadastroModule { }
