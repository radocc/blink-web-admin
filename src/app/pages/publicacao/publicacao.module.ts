import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DevComponentModule } from 'app/modules/devcomponent/devcomponent.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPrimeModule } from 'app/ngprime/ngprime.module';
import { PanelPublicacaoComponent } from './panel-publicacao/panel-publicacao.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'panel',
    pathMatch:'full'
  },    
  {
    path:'panel',
    component:PanelPublicacaoComponent,
    children:[
      {
        path:'',
        redirectTo:'imagem',
        pathMatch:'full'
      },
      {
        path:'imagem',
        // component:
      },
      {
        path:'video',
        // component:
      },
      {
        path:'noticia',
        // component:
      },
      {
        path:'cotacao',
        // component:
      },
      {
        path:'loteria',
        // component:
      },
    ]
  }
  
];

@NgModule({
  declarations: [
    PanelPublicacaoComponent
  ],
  imports: [
    CommonModule,
    NgPrimeModule,
    FormsModule,
    ReactiveFormsModule,
    DevComponentModule,
    RouterModule.forChild(routes)
  ],exports:[
    
  ]
})
export class PublicacaoModule { }
