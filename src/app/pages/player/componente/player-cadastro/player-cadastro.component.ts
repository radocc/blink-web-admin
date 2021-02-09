import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Arquivo } from '@radoccmodels/base/arquivo';
import { Empresa } from '@radoccmodels/base/empresa';
import { Conteudo } from '@radoccmodels/conteudo';
import { Player } from '@radoccmodels/player';
import { ArquivoService } from '@radoccservices/base/arquivo-service';
import { EmpresaService } from '@radoccservices/base/empresa-service';
import { ConteudoService } from '@radoccservices/conteudo-services';
import { PlayerService } from '@radoccservices/player-services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-player-cadastro',
  templateUrl: './player-cadastro.component.html',
  styleUrls: ['./player-cadastro.component.scss'],
  providers:[
    ArquivoService,
    MessageService,PlayerService, EmpresaService
  ]
})
export class PlayerCadastroComponent implements OnInit {

  
  public form:FormGroup = new FormGroup({
    nome:new FormControl('', Validators.required),    
    localizacao:new FormControl(),
    dataImplantacao:new FormControl(),
    identificacao:new FormControl(),
    orientacao:new FormControl('1'),
    grupos:new FormControl()
  }) 
  
  public player:Player;
  public empresas:Empresa[] = [];

  constructor(public arquivoService:ArquivoService, private msgService:MessageService, private playerService:PlayerService,
    private empresaService:EmpresaService) {

  }

  ngOnInit(): void { 
  }

  public pesquisarEmpresa(nome){
    this.empresaService.buscarPorNome(nome).subscribe((lista)=>{
      this.empresas = lista;
    });
  }
  
  public salvar(){
    
  }

  public publicar(){

  }

  public preview(){

  }

  public importar(){

  }

}
