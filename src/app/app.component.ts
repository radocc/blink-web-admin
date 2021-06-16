import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Events } from '@radoccmodels/enum/events';
import { EventBrokerService } from 'ng-event-broker';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'tv-blink';

  constructor(private router: Router,private primengConfig: PrimeNGConfig,
    public translate: TranslateService,private eventService:EventBrokerService) {
      this.primengConfig.ripple = false;
      
  }

  ngOnInit(): void {        
    this.eventService.registerEvent(Events.atualizarLista);
    this.eventService.registerEvent(Events.editar);
    this.eventService.registerEvent(Events.novo);
    this.eventService.registerEvent(Events.copiar);
    this.eventService.registerEvent(Events.visualizar);
    this.eventService.registerEvent(Events.configAtualizaTipoTemplate);
    this.translate.setDefaultLang('pt');
    this.translate.use('pt');
    sessionStorage.setItem('lang', 'pt')
    
}
}
