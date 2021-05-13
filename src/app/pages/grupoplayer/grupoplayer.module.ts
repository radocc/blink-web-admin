
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPrimeModule } from 'app/ngprime/ngprime.module';
import { DevComponentModule } from 'app/modules/devcomponent/devcomponent.module';
import { ShareTranslateModule } from 'app/modules/share-translate/share-translate.module';
import { GrupoPlayerPesquisaComponent } from './pages/grupoplayer-pesquisa/grupoplayer-pesquisa.component';
import { GrupoPlayerCadastroComponent } from './pages/grupoplayer-cadastro/grupoplayer-cadastro.component';
import { ConteudoRowModule } from '@radocccomponentes/conteudo-row/conteudo-row.module';
import { PagecadastroModule } from '@radocccomponentes/pagecadastro/pagecadastro.module';
import { ConteudoDisplayDialogComponent } from '@radocccomponentes/conteudo-display-dialog/conteudo-display-dialog.component';
import { PanelGrupoPlayerComponent } from './panel-grupoplayer/panel-grupoplayer.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'panel',
    pathMatch:'full'
  },    
  {
    path:'panel',
    component:PanelGrupoPlayerComponent,
    children:[      
      {
        path:'grupoplayer-pesquisa',
        component: GrupoPlayerPesquisaComponent,
        outlet: 'pesquisa'
      },
      {
        path:'grupoplayer-cadastro',
        component: GrupoPlayerCadastroComponent,
        outlet: 'cadastro'
      }
    ]
  }
]

@NgModule({
  declarations: [
    PanelGrupoPlayerComponent,
    GrupoPlayerCadastroComponent,
    GrupoPlayerPesquisaComponent
  ],
  entryComponents:[
  ],
  imports: [
    CommonModule,
    NgPrimeModule,
    FormsModule,
    ReactiveFormsModule,
    DevComponentModule,
    ConteudoRowModule,
    ShareTranslateModule,
    RouterModule.forChild(routes),
    PagecadastroModule
  ]
})
export class GrupoPlayerModule { }
