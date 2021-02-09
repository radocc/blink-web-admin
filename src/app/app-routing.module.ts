import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PainelConfiguracaoModule } from '@radoccpages/configuracao/painel-configuracao/painel-configuracao.module';
import { LoginPage } from '@radoccpages/login/login.page';
import { PainelSiteComponent } from './componentes/layouts/painel-site/painel-site.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginPage
  },
  {
    path:'admin',
    component:PainelSiteComponent,
    children:[
      {
        path:'conteudo',
        loadChildren: () => import('@radoccpages/conteudo/conteudo.module').then(m => m.ConteudoModule)
      },
      {
        path:'publicacao',        
        loadChildren: () => import('@radoccpages/publicacao/publicacao.module').then(m => m.PublicacaoModule)
      },
      {
        path:'player',
        loadChildren: () => import('@radoccpages/player/player.module').then(m => m.PlayerModule)
      },
      {
        path:'grupo',
        loadChildren: () => import('@radoccpages/grupo/grupo.module').then(m => m.GrupoModule)
      },
      {
        path:'relatorio',
        loadChildren: () => import('@radoccpages/relatorio/relatorio.module').then(m => m.RelatorioModule)
      },
      {
        path:'configuracao',
        loadChildren: () => import('@radoccpages/configuracao/painel-configuracao/painel-configuracao.module').then(m => m.PainelConfiguracaoModule)
      }
    ] 
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
