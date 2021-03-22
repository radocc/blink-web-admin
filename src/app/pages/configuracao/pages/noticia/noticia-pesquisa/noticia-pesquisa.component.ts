import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { Loteria } from '@radoccmodels/loteria'; 
import { FiltroService } from '@radoccservices/base/filtro-service';
import { LoteriaService } from '@radoccservices/loteria-services';
import { NoticiaService } from '@radoccservices/noticia-services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-noticia-pesquisa',
  templateUrl: './noticia-pesquisa.component.html',
  styleUrls: ['./noticia-pesquisa.component.scss'],
  providers:[ 
    MessageService,NoticiaService, FiltroService
  ]
})
export class NoticiaPesquisaComponent implements OnInit {

  public gridpesquisa;

  
  constructor(public noticiaService:NoticiaService) {

  }

  ngOnInit(): void { 
  } 
  
  public gridPesquisa(grid) {
    this.gridpesquisa = grid;
  }

}
