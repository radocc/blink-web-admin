import { PlayerService } from './../../../../services/player-services';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { Loteria } from '@radoccmodels/loteria'; 
import { FiltroService } from '@radoccservices/base/filtro-service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-player-pesquisa',
  templateUrl: './player-pesquisa.component.html',
  styleUrls: ['./player-pesquisa.component.scss'],
  providers:[ 
    MessageService,PlayerService, FiltroService
  ]
})
export class PlayerPesquisaComponent implements OnInit {

  public form:FormGroup = new FormGroup({
    nome:new FormControl('', Validators.required)    
  }) 
  
  public loteria:Loteria;
  public gridpesquisa;

  
  constructor(public playerService:PlayerService) {

  }

  ngOnInit(): void { 
  } 
  
  public gridPesquisa(grid) {
    this.gridpesquisa = grid;
  }

}
