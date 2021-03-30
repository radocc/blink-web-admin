import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import localePt from '@angular/common/locales/pt';
import { DevionnTranslateLoader } from './devionn-translate-loader';
import { PrimeNGConfig } from 'primeng/api';

registerLocaleData(localePt);
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: DevionnTranslateLoader,
        deps: [Router, HttpClient]
      }
    })
  ],
  providers:[
    DevionnTranslateLoader
  ],
  exports:[
    TranslateModule
  ]
})
export class ShareTranslateModule {

  constructor(public translate: TranslateService, private primeNgConfig:PrimeNGConfig){
      let lang = sessionStorage.getItem('lang');
      if(lang == null || lang == '' || !lang || lang == 'undefined'){
          lang = 'pt';
      }
      this.translate.setDefaultLang(lang);
      translate.use(lang);
      this.primeNgConfig.setTranslation({
        accept:'Aceitar',
        reject:'Recusar',
        startsWith:'Inicia com',
        contains:'Contém',
        endsWith:'Termina com',
        notContains: 'Não Contém',
        equals: 'Igual',
        notEquals: 'Diferente',
        noFilter:'Não Filtrar',
        lt: "Less than",
        lte: "Less than or equal to",
        gt: "Greater than",
        gte: "Great then or equals",
        is: "é",
        isNot: "não é",
        before: "Antes",
        after: "Após",
        clear: "Limpar",
        apply: "Aplicar",
        matchAll: "Match All",
        matchAny: "Match Any",
        addRule: "Adicionar Regra",
        removeRule: "Remover Regra",
        choose: "Escolher",
        upload: "Carregar",
        cancel: "Cancelar",
        dayNames: ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sabado"],
        dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
        dayNamesMin: ["Do","Se","Te","Qua","Qui","Sex","Sab"],
        monthNames: ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
        monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        today: "Hoje",
        weekHeader: "Semana"
      })
  }
}
