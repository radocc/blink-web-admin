import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { FonteNoticia } from '@radoccmodels/fontenoticia';
import { FiltroService } from '@radoccservices/base/filtro-service';
import { FonteNoticiaService } from '@radoccservices/fontenoticia-services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-fontenoticia-pesquisa',
  templateUrl: './fontenoticia-pesquisa.component.html',
  styleUrls: ['./fontenoticia-pesquisa.component.scss'],
  providers:[ 
    MessageService,FonteNoticiaService, FiltroService
  ]
})
export class FonteNoticiaPesquisaComponent implements OnInit {

  public form:FormGroup = new FormGroup({
    nome:new FormControl('', Validators.required)        
  }) 
  
  public fonteNoticia:FonteNoticia;
  public gridpesquisa;

  
  constructor(private msgService:MessageService, public fonteNoticiaService:FonteNoticiaService, public filtroService: FiltroService) {

  }

  ngOnInit(): void { 
  } 
  
  public gridPesquisa(grid) {
    this.gridpesquisa = grid;
  }

}
