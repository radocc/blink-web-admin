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
import { GrupoPlayerPesquisaComponent } from './pages/grupoplayer-pesquisa/grupoplayer-pesquisa.component';
import { GrupoPlayerCadastroComponent } from './pages/grupoplayer-cadastro/grupoplayer-cadastro.component';
import { PlaylistCadastroComponent } from './pages/playlist-cadastro/playlist-cadastro.component';
import { PlaylistPesquisaComponent } from './pages/playlist-pesquisa/playlist-pesquisa.component';
import { ConteudoDialogComponent } from './pages/playlist-cadastro/dialog-conteudo/conteudo-dialog.component';

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
      },
      {
        path:'grupoplayer-pesquisa',
        component: GrupoPlayerPesquisaComponent,
        outlet: 'pesquisa'
      },
      {
        path:'grupoplayer-cadastro',
        component: GrupoPlayerCadastroComponent,
        outlet: 'cadastro'
      },
      {
        path:'playlist-cadastro',
        component: PlaylistCadastroComponent,
        outlet: 'cadastro'
      },
      {
        path:'playlist-pesquisa',
        component: PlaylistPesquisaComponent,
        outlet: 'pesquisa'
      }

    ]
  }
]

@NgModule({
  declarations: [
    PanelPlayerComponent,
    PlayerCadastroComponent,
    PlayerPesquisaComponent,    
    GrupoPlayerCadastroComponent,
    GrupoPlayerPesquisaComponent,
    PlaylistCadastroComponent,
    PlaylistPesquisaComponent,
    ConteudoDialogComponent
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
export class PlayerModule { }
