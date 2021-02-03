import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgPrimeModule } from 'app/ngprime/ngprime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DevComponentModule } from 'app/modules/devcomponent/devcomponent.module';
import { ShareTranslateModule } from 'app/modules/share-translate/share-translate.module';
import { RouterModule, Routes } from '@angular/router';
import { PanelGrupoComponent } from './panel-grupo/panel-grupo.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'panel',
    pathMatch:'full'
  },    
  {
    path:'panel',
    component:PanelGrupoComponent
  }
]


@NgModule({
  declarations: [
    PanelGrupoComponent
  ],
  imports: [
    CommonModule,
    NgPrimeModule,
    FormsModule,
    ReactiveFormsModule,
    DevComponentModule,
    ShareTranslateModule,
    RouterModule.forChild(routes)
  ]
})
export class GrupoModule { }
