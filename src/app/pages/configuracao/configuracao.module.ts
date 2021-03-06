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
import { MatIconModule } from '@angular/material/icon';
import { EquipamentoPesquisaComponent } from './pages/equipamento/equipamento-pesquisa/equipamento-pesquisa.component';
import { EquipamentoCadastroComponent } from './pages/equipamento/equipamento-cadastro/equipamento-cadastro.component';
import { TipoConteudoPesquisaComponent } from './pages/tipoconteudo/tipoconteudo-pesquisa/tipoconteudo-pesquisa.component';
import { TipoConteudoCadastroComponent } from './pages/tipoconteudo/tipoconteudo-cadastro/tipoconteudo-cadastro.component';
import { FonteNoticiaCadastroComponent } from './pages/fontenoticia/fontenoticia-cadastro/fontenoticia-cadastro.component';
import { FonteNoticiaPesquisaComponent } from './pages/fontenoticia/fontenoticia-pesquisa/fontenoticia-pesquisa.component';

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
          path:'loteria-pesquisa',
          component: LoteriaPesquisaComponent,
          outlet: 'pesquisa'
        },
        {
          path:'loteria-cadastro',
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
        },
        {
          path:'equipamento-pesquisa',
          component: EquipamentoPesquisaComponent,
          outlet: 'pesquisa'
        },
        {
          path:'equipamento-cadastro',
          outlet: 'cadastro',
          component: EquipamentoCadastroComponent
        },
        {
          path:'tipoconteudo-pesquisa',
          component: TipoConteudoPesquisaComponent,
          outlet: 'pesquisa'
        },
        {
          path:'tipoconteudo-cadastro',
          outlet: 'cadastro',
          component: TipoConteudoCadastroComponent
        },
        {
          path:'fontenoticia-pesquisa',
          component: FonteNoticiaPesquisaComponent,
          outlet: 'pesquisa'
        },
        {
          path:'fontenoticia-cadastro',
          outlet: 'cadastro',
          component: FonteNoticiaCadastroComponent
        },
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
      TemplatePesquisaComponent,
      EquipamentoCadastroComponent,
      EquipamentoPesquisaComponent,
      TipoConteudoCadastroComponent,
      TipoConteudoPesquisaComponent,
      FonteNoticiaCadastroComponent,
      FonteNoticiaPesquisaComponent
    ],
    imports: [
      CommonModule,
      NgPrimeModule,
      FormsModule,
      ReactiveFormsModule,
      DevComponentModule,
      ShareTranslateModule,
      RouterModule.forChild(routes),
      DragDropModule,
      MatIconModule
    ]
  })
  export class ConfiguracaoModule { }