import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Arquivo } from '@radoccmodels/base/arquivo';
import { Conteudo } from '@radoccmodels/conteudo';
import { Player } from '@radoccmodels/player';
import { ArquivoService } from '@radoccservices/base/arquivo-service';
import { ConteudoService } from '@radoccservices/conteudo-services';
import { PlayerService } from '@radoccservices/player-services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-player-cadastro',
  templateUrl: './player-cadastro.component.html',
  styleUrls: ['./player-cadastro.component.scss'],
  providers:[
    ArquivoService,
    MessageService,PlayerService
  ]
})
export class PlayerCadastroComponent implements OnInit {

  
  public form:FormGroup = new FormGroup({
    nome:new FormControl('', Validators.required),    
    localizacao:new FormControl(),
    dataImplantacao:new FormControl(),
    identificacao:new FormControl(),
    orientacao:new FormControl(),
    grupos:new FormControl()
  }) 
  
  public player:Player;

  constructor(public arquivoService:ArquivoService, private msgService:MessageService, private playerService:PlayerService) {

  }

  ngOnInit(): void { 
  }
  
  public salvar(){
    
  }

  public publicar(){

  }

  public preview(){

  }

  public importar(){

  }

}
