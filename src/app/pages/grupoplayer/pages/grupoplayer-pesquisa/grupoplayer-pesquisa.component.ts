import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { FiltroService } from '@radoccservices/base/filtro-service';
import { MessageService } from 'primeng/api';
import { GrupoPlayerService } from '@radoccservices/grupoplayer-services';

@Component({
  selector: 'app-grupoplayer-pesquisa',
  templateUrl: './grupoplayer-pesquisa.component.html',
  styleUrls: ['./grupoplayer-pesquisa.component.scss'],
  providers:[ 
    MessageService,GrupoPlayerService, FiltroService
  ]
})
export class GrupoPlayerPesquisaComponent implements OnInit {

  public form:FormGroup = new FormGroup({
    nome:new FormControl('', Validators.required)    
  }) 
   
  public gridpesquisa;

  
  constructor(public grupoPlayerService:GrupoPlayerService) {

  }

  ngOnInit(): void { 
  } 
  
  public gridPesquisa(grid) {
    this.gridpesquisa = grid;
  }

}
