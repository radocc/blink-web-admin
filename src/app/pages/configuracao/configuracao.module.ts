import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DevComponentModule } from 'app/modules/devcomponent/devcomponent.module';
import { ShareTranslateModule } from 'app/modules/share-translate/share-translate.module';
import { NgPrimeModule } from 'app/ngprime/ngprime.module';
import { LoteriaCadastroComponent } from './pages/loteria/loteria-cadastro/loteria-cadastro.component';
import { LoteriaPesquisaComponent } from './pages/loteria/loteria-pesquisa/loteria-pesquisa.component';
import { PanelConfiguracaoComponent } from './panel-configuracao/panel-configuracao.component';
import { TemplateCadastroComponent } from './pages/template/template-cadastro/template-cadastro.component';
import { TemplatePesquisaComponent } from './pages/template/template-pesquisa/template-pesquisa.component';
import { DevImageDirective } from 'app/directives/dev-image.directive';
import {DragDropModule} from '@angular/cdk/drag-drop';

const routes: Routes = [
    {
      path:'',
      redirectTo:'panel',
      pathMatch:'full'
    },    
    {
      path:'panel',
      component: PanelConfiguracaoComponent,
      children:[
        // {
        //   path:'',
        //   redirectTo:'loteria',
        //   pathMatch:'full'
        // },
        {
          path:'',
          component: LoteriaPesquisaComponent
        },
        {
          path:'',
          outlet: 'cadastro',
          component: LoteriaCadastroComponent
        },
        {
          path: 'template-pesquisa',
          component: TemplatePesquisaComponent,
          outlet: 'pesquisa'
        },
        {
          path: 'template-cadastro',
          component: TemplateCadastroComponent,
          outlet: 'cadastro'
        }
      ]
    }
  ]
  
  @NgModule({
    declarations: [
      DevImageDirective,
      PanelConfiguracaoComponent,
      LoteriaCadastroComponent,
      LoteriaPesquisaComponent,
      TemplateCadastroComponent,
      TemplatePesquisaComponent    
    ],
    imports: [
      CommonModule,
      NgPrimeModule,
      FormsModule,
      ReactiveFormsModule,
      DevComponentModule,
      ShareTranslateModule,
      RouterModule.forChild(routes),
      DragDropModule
    ]
  })
  export class ConfiguracaoModule { }