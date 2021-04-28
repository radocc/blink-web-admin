import { EquipamentoService } from './../../../../../services/equipamento-services';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { FiltroService } from '@radoccservices/base/filtro-service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-equipamento-pesquisa',
  templateUrl: './equipamento-pesquisa.component.html',
  styleUrls: ['./equipamento-pesquisa.component.scss'],
  providers:[ 
    MessageService,EquipamentoService, FiltroService
  ]
})
export class EquipamentoPesquisaComponent implements OnInit {

  public form:FormGroup = new FormGroup({
    nome:new FormControl('', Validators.required)    
  }) 
  
  public gridpesquisa;

  
  constructor(private msgService:MessageService, public equipamentoService:EquipamentoService) {

  }

  ngOnInit(): void { 
  } 
  
  public gridPesquisa(grid) {
    this.gridpesquisa = grid;
  }

}
