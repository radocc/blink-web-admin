import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PanelConfiguracaoComponent } from './panel-configuracao/panel-configuracao.component';
import { NgPrimeModule } from 'app/ngprime/ngprime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DevComponentModule } from 'app/modules/devcomponent/devcomponent.module';
import { ShareTranslateModule } from 'app/modules/share-translate/share-translate.module';
import { LoteriaCadastroComponent } from './pages/loteria/loteria-cadastro/loteria-cadastro.component';
import { LoteriaPesquisaComponent } from './pages/loteria/loteria-pesquisa/loteria-pesquisa.component';
import { GridPesquisaComponent } from 'app/componentes/gridpesquisa/gridpesquisa.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'panel',
    pathMatch:'full'
  },    
  {
    path:'panel',
    component:PanelConfiguracaoComponent,
    children:[
      {
        path:'',
        redirectTo:'loteria',
        pathMatch:'full'
      },
      {
        path:'loteria',
        loadChildren: '@radoccpages/configuracao/pages/loteria/loteria.module#LoteriaModule'
      },
    ]
  }
]

@NgModule({
  declarations: [
    PanelConfiguracaoComponent    
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
export class ConfiguracaoModule { }
