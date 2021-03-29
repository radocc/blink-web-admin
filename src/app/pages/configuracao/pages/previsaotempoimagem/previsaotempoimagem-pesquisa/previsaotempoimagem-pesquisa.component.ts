import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { Loteria } from '@radoccmodels/loteria'; 
import { PrevisaoTempoImagem } from '@radoccmodels/previsaotempoimagem';
import { FiltroService } from '@radoccservices/base/filtro-service';
import { PrevisaoTempoImagemService } from '@radoccservices/previsaotempoimagem-service';
import { TipoConteudoService } from '@radoccservices/tipoconteudo-services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-previsaotempoimagem-pesquisa',
  templateUrl: './previsaotempoimagem-pesquisa.component.html',
  styleUrls: ['./previsaotempoimagem-pesquisa.component.scss'],
  providers:[ 
    MessageService,PrevisaoTempoImagemService
  ]
})
export class PrevisaoTempoImagemPesquisaComponent implements OnInit {

  public form:FormGroup = new FormGroup({
    nome:new FormControl('', Validators.required)    
  }) 
  
  public gridpesquisa;

  
  constructor(private msgService:MessageService, public previsaoTempoImagemService:PrevisaoTempoImagemService, public filtroService: FiltroService) {

  }

  ngOnInit(): void { 
  } 
  
  public gridPesquisa(grid) {
    this.gridpesquisa = grid;
  }

}
