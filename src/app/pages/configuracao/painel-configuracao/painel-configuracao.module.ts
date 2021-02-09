import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgPrimeModule } from 'app/ngprime/ngprime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DevComponentModule } from 'app/modules/devcomponent/devcomponent.module';
import { ShareTranslateModule } from 'app/modules/share-translate/share-translate.module';
import { PainelConfiguracaoComponent } from './painel-configuracao.component';
import { LoteriaModule } from '../pages/loteria/loteria.module';

const routes: Routes = [
  {
    path:'',
    redirectTo:'painel',
    pathMatch:'full'
  },    
  {
    path:'painel',
    component: PainelConfiguracaoComponent,
    children:[
      {
        path:'',
        redirectTo:'loteria',
        pathMatch:'full'
      },
      {
        path:'loteria',
        loadChildren: () => import('@radoccpages/configuracao/pages/loteria/loteria.module').then(m => m.LoteriaModule)
      },
    ]
  }
]

@NgModule({
  declarations: [
    PainelConfiguracaoComponent    
  ],
  imports: [
    CommonModule,
    NgPrimeModule,
    FormsModule,
    ReactiveFormsModule,
    DevComponentModule,
    ShareTranslateModule,
    LoteriaModule,
    RouterModule.forChild(routes)
  ]
})
export class PainelConfiguracaoModule { }
