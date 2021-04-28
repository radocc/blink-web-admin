import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { FiltroService } from '@radoccservices/base/filtro-service';
import { PrevisaoTempoService } from '@radoccservices/previsaotempo-service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-previsaotempo-pesquisa',
  templateUrl: './previsaotempo-pesquisa.component.html',
  styleUrls: ['./previsaotempo-pesquisa.component.scss'],
  providers:[ 
    MessageService,PrevisaoTempoService
  ]
})
export class PrevisaoTempoPesquisaComponent implements OnInit {

  public form:FormGroup = new FormGroup({
    nome:new FormControl('', Validators.required)    
  }) 
  
  public gridpesquisa;

  
  constructor(private msgService:MessageService, public previsaoTempoService:PrevisaoTempoService, public filtroService: FiltroService) {

  }

  ngOnInit(): void { 
  } 
  
  public gridPesquisa(grid) {
    this.gridpesquisa = grid;
  }

}
