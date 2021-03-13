import { PlayerPesquisaComponent } from './componente/player-pesquisa/player-pesquisa.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelPlayerComponent } from './panel-player/panel-player.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPrimeModule } from 'app/ngprime/ngprime.module';
import { DevComponentModule } from 'app/modules/devcomponent/devcomponent.module';
import { ShareTranslateModule } from 'app/modules/share-translate/share-translate.module';
import { PlayerCadastroComponent } from './componente/player-cadastro/player-cadastro.component';

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
    ]
  }
]

@NgModule({
  declarations: [
    PanelPlayerComponent,
    PlayerCadastroComponent,
    PlayerPesquisaComponent
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
