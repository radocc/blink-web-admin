import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  
import { Tela } from '@radoccmodels/base/tela';
import { Events } from '@radoccmodels/enum/events';
import { GrupoPlayers } from '@radoccmodels/grupoplayers'; 
import { MenuService } from '@radoccservices/base/menu-service';
import { TelaService } from '@radoccservices/base/tela-service';
import { EventBrokerService } from 'ng-event-broker';

@Component({
  selector: 'app-panel-configuracao',
  templateUrl: './panel-configuracao.component.html',
  styleUrls: ['./panel-configuracao.component.scss'],
  providers:[
    MenuService, TelaService
  ]
})
export class PanelConfiguracaoComponent implements OnInit {

  public nomeBusca:string = "";
  public grupos:GrupoPlayers[] = [];
  public grupoSelecionado:GrupoPlayers;
  public nomePlayer:string = '';
  public telas:Tela[] = [ ];

  constructor(private router:Router, private menuService:MenuService, private telaService:TelaService, private eventService: EventBrokerService) {

  }

  ngOnInit(): void {
    this.eventService.registerEvent(Events.atualizarLista);
    this.eventService.registerEvent(Events.editar);
    
  }
 
  public abrirGrupo(tel){
    
  }

  public salvar(){
    
  }

}
