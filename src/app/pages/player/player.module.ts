import { PlayerPesquisaComponent } from './pages/player-pesquisa/player-pesquisa.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelPlayerComponent } from './panel-player/panel-player.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPrimeModule } from 'app/ngprime/ngprime.module';
import { DevComponentModule } from 'app/modules/devcomponent/devcomponent.module';
import { ShareTranslateModule } from 'app/modules/share-translate/share-translate.module';
import { PlayerCadastroComponent } from './pages/player-cadastro/player-cadastro.component';
import { ConteudoDialogComponent } from '../playlist/pages/playlist-cadastro/dialog-conteudo/conteudo-dialog.component';
import { ConteudoRowModule } from '@radocccomponentes/conteudo-row/conteudo-row.module';
import { PagecadastroModule } from '@radocccomponentes/pagecadastro/pagecadastro.module';
import { ConteudoDisplayDialogComponent } from '@radocccomponentes/conteudo-display-dialog/conteudo-display-dialog.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'panel',
    pathMatch:'full'
  },    
  {
    path:'panel',
    component:PanelPlayerComponent,
    children:[
      {
        path:'player-pesquisa',
        component: PlayerPesquisaComponent,
        outlet: 'pesquisa'
      },
      {
        path:'player-cadastro',
        component: PlayerCadastroComponent,
        outlet: 'cadastro'
      }
    ]
  }
]

@NgModule({
  declarations: [
    PanelPlayerComponent,
    PlayerCadastroComponent,
    PlayerPesquisaComponent
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
export class PlayerModule { }
