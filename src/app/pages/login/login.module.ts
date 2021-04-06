import { NgPrimeModule } from './../../ngprime/ngprime.module';
import { CommonModule } from '@angular/common';
import { LoginPage } from '@radoccpages/login/panel-login/login.page';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
import { RecuperacaoSenhaEnviadaComponent } from './recuperacao-senha-enviada/recuperacao-senha-enviada.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareTranslateModule } from '@radoccmodules/share-translate/share-translate.module';
import { RedefinirSenhaComponent } from './redefinir-senha/redefinir-senha.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    
  },
  {
    path: 'recuperacao-senha-enviada',
    component: RecuperacaoSenhaEnviadaComponent
  },
  {
    path: 'recuperar-senha',
    component: RecuperarSenhaComponent
  },
  {
    path: 'recuperar-senha/:login',
    component: RecuperarSenhaComponent
  },
  {
    path: 'redefinir-senha/:token',
    component: RedefinirSenhaComponent
  }
];

@NgModule({
  declarations: [
    LoginPage,
    RecuperacaoSenhaEnviadaComponent,
    RecuperarSenhaComponent,
    RedefinirSenhaComponent
  ],
  imports: [
    CommonModule,
    NgPrimeModule,
    ShareTranslateModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    
  ]
})
export class LoginModule { }