import localePt  from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
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
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { ConteudoRowModule } from '@radocccomponentes/conteudo-row/conteudo-row.module';
import { PageCadastroConteudoModule } from '@radocccomponentes/pagecadastro-conteudo/pagecadastro-conteudo.module';
import { TemplateDefaultComponent } from './componente/template-default/template-default.component';
import { ConteudoDisplayDialogComponent } from '@radocccomponentes/conteudo-display-dialog/conteudo-display-dialog.component';

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
      {
        path:'default/:tipo',
        component:TemplateDefaultComponent
      },
      {
        path:'default/:tipo/:id',
        component:TemplateDefaultComponent
      },
    ]
  }
  
];
registerLocaleData(localePt);
export const MY_FORMATS = {
    parse: {
      dateInput: 'DD/MM/YYYY',
    },
    display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    },
  };
@NgModule({
  declarations: [
    PanelConteudoComponent,
    PanelAgendamentoComponent,
    TemplateImagemComponent,
    TemplateVideoComponent,
    TemplateNoticiaComponent,
    TemplateCotacaoComponent,
    TemplateLoteriaComponent,
    TemplatePrevisaoTempoComponent,
    TemplateDefaultComponent
  ],
  entryComponents:[
    ConteudoDisplayDialogComponent
  ],
  imports: [
    CommonModule,
    NgPrimeModule,
    FormsModule,
    ReactiveFormsModule,
    DevComponentModule,
    ShareTranslateModule,
    ConteudoRowModule,
    PageCadastroConteudoModule,
    RouterModule.forChild(routes)
  ],
  providers:[
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  exports:[
    PanelConteudoComponent,
    PanelAgendamentoComponent
  ]
})
export class ConteudoModule { }
