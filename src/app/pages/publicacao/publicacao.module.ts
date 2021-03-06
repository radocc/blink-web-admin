import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DevComponentModule } from 'app/modules/devcomponent/devcomponent.module';
import { ConteudoRowModule } from 'app/componentes/conteudo-row/conteudo-row.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPrimeModule } from 'app/ngprime/ngprime.module';
import { PanelPublicacaoComponent } from './panel-publicacao/panel-publicacao.component';
import { ShareTranslateModule } from '@radoccmodules/share-translate/share-translate.module';
import { PlaylistDialogComponent } from './componente/dialog-playlist/playlist-dialog.component';
import { PlaylistPesquisaDialogComponent } from './componente/dialog-playlist-pesquisa/playlist-pesquisa-dialog.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'panel',
    pathMatch:'full'
  },    
  {
    path:'panel',
    component:PanelPublicacaoComponent
  }
];

@NgModule({
  declarations: [
    PanelPublicacaoComponent,
    PlaylistDialogComponent,
    PlaylistPesquisaDialogComponent
  ],
  entryComponents:[
    PlaylistDialogComponent,
    PlaylistPesquisaDialogComponent
  ],
  imports: [
    CommonModule,
    NgPrimeModule,
    FormsModule,
    ReactiveFormsModule,
    ConteudoRowModule,
    ShareTranslateModule,
    DevComponentModule,
    RouterModule.forChild(routes)
  ],exports:[
    
  ]
})
export class PublicacaoModule { }
