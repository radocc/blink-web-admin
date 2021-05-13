import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelPlaylistComponent } from './panel-playlist/panel-playlist.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPrimeModule } from 'app/ngprime/ngprime.module';
import { DevComponentModule } from 'app/modules/devcomponent/devcomponent.module';
import { ShareTranslateModule } from 'app/modules/share-translate/share-translate.module';
import { ConteudoRowModule } from '@radocccomponentes/conteudo-row/conteudo-row.module';
import { PagecadastroModule } from '@radocccomponentes/pagecadastro/pagecadastro.module';
import { ConteudoDisplayDialogComponent } from '@radocccomponentes/conteudo-display-dialog/conteudo-display-dialog.component';
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
    component:PanelPlaylistComponent,
    children:[
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
    PanelPlaylistComponent,
    PlaylistCadastroComponent,
    PlaylistPesquisaComponent,
    ConteudoDialogComponent
  ],
  entryComponents:[
    ConteudoDialogComponent,
    ConteudoDisplayDialogComponent
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
export class PlaylistModule { }
