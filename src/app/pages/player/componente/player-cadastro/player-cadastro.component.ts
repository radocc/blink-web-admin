import { Events } from './../../../../models/enum/events';
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
    orientacao:new FormControl('1'),
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
    this.form.controls['observacao'].setValue(player.observacao,{emitEvent:false});

    this.form.controls['horaInicio'].setValue(new Date(player.horaInicio),{emitEvent:false});
    this.form.controls['horaFim'].setValue(new Date(player.horaFim),{emitEvent:false});

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
    if (this.form.invalid){
      this.page.showWarnMsg('EXISTEM_CAMPOS_INVALIDOS');
      return ;
    }
    if (this.player == null){
      this.player = new Player();
    }
    this.player.nome = this.form.controls['nome'].value;
    this.player.observacao = this.form.controls['observacao'].value;
    this.player.orientacao = this.form.controls['orientacao'].value;
    this.player.horaInicio = this.form.controls['horaInicio'].value;
    this.player.horaFim = this.form.controls['horaFim'].value;
    
    this.playerService.save(this.player).subscribe((player)=>{
      this.player = player;
      this.page.showSuccessMsg('SALVO_COM_SUCESSO');
      this.eventService.publishEvent(Events.atualizarLista);
    }, error=>{
      this.page.showErrorMsg('FALHA_AO_SALVAR');
      console.log(error);
    })
  } 
}
