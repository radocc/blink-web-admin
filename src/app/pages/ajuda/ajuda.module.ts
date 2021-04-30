import { FilterPipe } from './pipeFilter';
import { NgPrimeModule } from '../../ngprime/ngprime.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { ShareTranslateModule } from '@radoccmodules/share-translate/share-translate.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AjudaComponent } from './ajuda.component';

const routes: Routes = [
    {
      path:'',
      component: AjudaComponent,
    }
];

@NgModule({
    declarations: [
      AjudaComponent,
      FilterPipe
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
  export class AjudaModule { }