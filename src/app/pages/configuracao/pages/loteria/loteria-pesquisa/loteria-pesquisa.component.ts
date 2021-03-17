import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { Loteria } from '@radoccmodels/loteria'; 
import { FiltroService } from '@radoccservices/base/filtro-service';
import { LoteriaService } from '@radoccservices/loteria-services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-loteria-pesquisa',
  templateUrl: './loteria-pesquisa.component.html',
  styleUrls: ['./loteria-pesquisa.component.scss'],
  providers:[ 
    MessageService,LoteriaService, FiltroService
  ]
})
export class LoteriaPesquisaComponent implements OnInit {

  public gridpesquisa;

  
  constructor(public loteriaService:LoteriaService) {

  }

  ngOnInit(): void { 
  } 
  
  public gridPesquisa(grid) {
    this.gridpesquisa = grid;
  }

}
