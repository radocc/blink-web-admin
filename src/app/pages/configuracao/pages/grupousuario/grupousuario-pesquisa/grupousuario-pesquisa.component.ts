import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { Loteria } from '@radoccmodels/loteria'; 
import { FiltroService } from '@radoccservices/base/filtro-service';
import { GrupoUsuarioService } from '@radoccservices/base/grupousuario-service';
import { UsuarioService } from '@radoccservices/base/usuario-service'; 
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-grupousuario-pesquisa',
  templateUrl: './grupousuario-pesquisa.component.html',
  styleUrls: ['./grupousuario-pesquisa.component.scss'],
  providers:[ 
    MessageService,GrupoUsuarioService, FiltroService
  ]
})
export class GrupoUsuarioPesquisaComponent implements OnInit {

  public form:FormGroup = new FormGroup({
    nome:new FormControl('', Validators.required)    
  }) 
  
  public loteria:Loteria;
  public gridpesquisa;

  
  constructor(private msgService:MessageService, public grupoUsuarioService:GrupoUsuarioService, public filtroService: FiltroService) {

  }

  ngOnInit(): void { 
  } 
  
  public gridPesquisa(grid) {
    this.gridpesquisa = grid;
  }

}
