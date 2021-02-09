import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgPrimeModule } from 'app/ngprime/ngprime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareTranslateModule } from 'app/modules/share-translate/share-translate.module';
import { LoteriaPesquisaComponent } from './loteria-pesquisa/loteria-pesquisa.component'; 
import { GridPesquisaModule } from 'app/componentes/gridpesquisa/gridpesquisa.module';
import { LoteriaCadastroComponent } from './loteria-cadastro/loteria-cadastro.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'pesquisa',
    pathMatch:'full'
  },
  {
    path:'cadastro',
    component:LoteriaCadastroComponent
  },
  {
    path:'pesquisa',
    component: LoteriaPesquisaComponent
  },   
]

@NgModule({
  declarations: [
    LoteriaPesquisaComponent,
    LoteriaCadastroComponent    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgPrimeModule,    
    GridPesquisaModule,
    ShareTranslateModule,
    RouterModule.forChild(routes)
  ]
})
export class LoteriaModule { }
