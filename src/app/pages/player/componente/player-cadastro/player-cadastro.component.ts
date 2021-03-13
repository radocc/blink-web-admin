import { EventBrokerService } from 'ng-event-broker';
import { TranslateService } from '@ngx-translate/core';
import { CadForm } from '@radocccomponentes/pagecadastro/cadform';
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
export class PlayerCadastroComponent extends CadForm implements OnInit {

  public config:{
    titulo:string,
    subTitle:string,
    btnSalvar:string;
  }={
    titulo:'PLAYER',
    subTitle:'',
    btnSalvar:'SALVAR'
  }
  public form:FormGroup = new FormGroup({
    nome:new FormControl('', Validators.required),    
    empresa:new FormControl(),
    dataImplantacao:new FormControl(),
    identificacao:new FormControl(),
    orientacao:new FormControl('1'),
    dataRemovido:new FormControl(),
    horaInicio:new FormControl(),
    horaFim:new FormControl()
  }) 
  
  public player:Player;
  public empresas:Empresa[] = [];

  constructor(public arquivoService:ArquivoService, public msgService:MessageService, private playerService:PlayerService,
    private empresaService:EmpresaService, public eventService:EventBrokerService) {
      super(eventService);
  }

  ngOnInit(): void { 
    super.ngOnInit();
  } 

  public buscar(id:number, editavel:boolean){
      this.playerService.findById(id).subscribe((player)=>{
        this.montarForm(player,editavel);
      })
  };

  public montarForm(player:Player, editavel:boolean){
    this.player = player;
    this.form.controls['nome'].setValue(player.nome,{emitEvent:false});
    this.form.controls['orientacao'].setValue(player.orientacao,{emitEvent:false});
    this.form.controls['empresa'].setValue(player.empresa, {emitEvent:false});
    
    if (editavel == false){
      this.form.disable();
    }    
  }

  public pesquisarEmpresa(nome:string){
    this.empresaService.buscarPorNome(nome).subscribe((lista)=>{
      this.empresas = lista;
    });
  }
  
  public salvar(event:any){
    
  } 
}
