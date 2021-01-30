import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelConteudoComponent } from './panel-conteudo/panel-conteudo.component'; 
import { NgPrimeModule } from 'app/ngprime/ngprime.module';
import { RouterModule, Routes } from '@angular/router';
import { PanelAgendamentoComponent } from './componente/panel-agendamento/panel-agendamento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateImagemComponent } from './componente/template-imagem/template-imagem.component';
import { DevComponentModule } from 'app/modules/devcomponent/devcomponent.module';
import { TemplateVideoComponent } from './componente/template-video/template-video.component';
import { TemplateNoticiaComponent } from './componente/template-noticia/template-noticia.component';
import { TemplateCotacaoComponent } from './componente/template-cotacao/template-cotacao.component';
import { TemplateLoteriaComponent } from './componente/template-loteria/template-loteria.component';
import { ShareTranslateModule } from 'app/modules/share-translate/share-translate.module';
import { TemplatePrevisaoTempoComponent } from './componente/template-previsaotempo/template-previsaotempo.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'panel',
    pathMatch:'full'
  },    
  {
    path:'panel',
    component:PanelConteudoComponent,
    children:[
      {
        path:'',
        redirectTo:'imagem',
        pathMatch:'full'
      },
      {
        path:'imagem',
        component:TemplateImagemComponent
      },
      {
        path:'imagem/:id',
        component:TemplateImagemComponent
      },
      {
        path:'video',
        component:TemplateVideoComponent
      },
      {
        path:'video/:id',
        component:TemplateVideoComponent
      },
      {
        path:'noticia',
        component:TemplateNoticiaComponent
      },
      {
        path:'noticia/:id',
        component:TemplateNoticiaComponent
      },
      {
        path:'cotacao',
        component:TemplateCotacaoComponent
      },
      {
        path:'cotacao/:id',
        component:TemplateCotacaoComponent
      },
      {
        path:'loteria',
        component:TemplateLoteriaComponent
      },
      {
        path:'loteria/:id',
        component:TemplateLoteriaComponent
      },
      {
        path:'previsaotempo',
        component:TemplatePrevisaoTempoComponent
      },
      {
        path:'previsaotempo/:id',
        component:TemplatePrevisaoTempoComponent
      },
    ]
  }
  
];

@NgModule({
  declarations: [
    PanelConteudoComponent,
    PanelAgendamentoComponent,
    TemplateImagemComponent,
    TemplateVideoComponent,
    TemplateNoticiaComponent,
    TemplateCotacaoComponent,
    TemplateLoteriaComponent,
    TemplatePrevisaoTempoComponent
  ],
  imports: [
    CommonModule,
    NgPrimeModule,
    FormsModule,
    ReactiveFormsModule,
    DevComponentModule,
    ShareTranslateModule,
    RouterModule.forChild(routes)
  ],exports:[
    PanelConteudoComponent,
    PanelAgendamentoComponent
  ]
})
export class ConteudoModule { }
