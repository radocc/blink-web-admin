import { LoginPage } from '@radoccpages/login/panel-login/login.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PainelSiteComponent } from './componentes/layouts/painel-site/painel-site.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
   {
     path:'login',
     loadChildren: () => import('@radoccpages/login/login.module').then(m => m.LoginModule)
   },
   {
    path:'redefinir-senha/:token',
    loadChildren: () => import('@radoccpages/redefinir/redefinir-senha.module').then(m => m.RedefinirModule)
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
        path:'relatorio',
        loadChildren: () => import('@radoccpages/relatorio/relatorio.module').then(m => m.RelatorioModule)
      },
      {
        path:'configuracao',
        loadChildren: () => import('@radoccpages/configuracao/configuracao.module').then(m => m.ConfiguracaoModule)
      }
    ] 
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
