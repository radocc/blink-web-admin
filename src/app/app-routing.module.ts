import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
        loadChildren: '@radoccpages/conteudo/conteudo.module#ConteudoModule'
      }
    ] 
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
