import { NgPrimeModule } from '../../ngprime/ngprime.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { RedefinirSenhaComponent } from "./redefinir-senha.component";
import { ShareTranslateModule } from '@radoccmodules/share-translate/share-translate.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
      path:'',
      component: RedefinirSenhaComponent,
    }
];

@NgModule({
    declarations: [
      RedefinirSenhaComponent
    ],
    imports: [
      CommonModule,
      NgPrimeModule,
      ShareTranslateModule,
      RouterModule.forChild(routes),
      ReactiveFormsModule,
      FormsModule,
      
    ]
  })
  export class RedefinirModule { }