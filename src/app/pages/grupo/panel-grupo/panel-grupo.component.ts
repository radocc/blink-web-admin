import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { GrupoPlayer } from '@radoccmodels/grupoplayer';
import { GrupoPlayers } from '@radoccmodels/grupoplayers';
import { GrupoPlayerService } from '@radoccservices/grupoplayer-services';
import { GrupoPlayersService } from '@radoccservices/grupoplayers-services';

@Component({
  selector: 'app-panel-grupo-player',
  templateUrl: './panel-grupo.component.html',
  styleUrls: ['./panel-grupo.component.scss'],
  providers:[
    GrupoPlayerService, GrupoPlayersService
  ]
})
export class PanelGrupoComponent implements OnInit {

  public nomeBusca:string = "";
  public grupos:GrupoPlayers[] = [];
  public grupoSelecionado:GrupoPlayers;
  public nomePlayer:string = '';

  constructor(private router:Router, private grupoService:GrupoPlayerService, private gruposService:GrupoPlayersService) {

  }

  ngOnInit(): void {
    
  }

  public pesquisarPlayer(){
    this.gruposService.findNome(this.nomePlayer).subscribe((lista)=>{
      this.grupos = lista;
    })
  }
 
  public abrirGrupo(grupo){

  }

  public salvar(){
    
  }

}
