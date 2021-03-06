import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { Loteria } from '@radoccmodels/loteria'; 
import { FiltroService } from '@radoccservices/base/filtro-service';
import { TipoConteudoService } from '@radoccservices/tipoconteudo-services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tipoconteudo-pesquisa',
  templateUrl: './tipoconteudo-pesquisa.component.html',
  styleUrls: ['./tipoconteudo-pesquisa.component.scss'],
  providers:[ 
    MessageService,TipoConteudoService, FiltroService
  ]
})
export class TipoConteudoPesquisaComponent implements OnInit {

  public form:FormGroup = new FormGroup({
    nome:new FormControl('', Validators.required)    
  }) 
  
  public loteria:Loteria;
  public gridpesquisa;

  
  constructor(private msgService:MessageService, public tipoConteudoService:TipoConteudoService, public filtroService: FiltroService) {

  }

  ngOnInit(): void { 
  } 
  
  public gridPesquisa(grid) {
    this.gridpesquisa = grid;
  }

}
