import { Events } from '../../../../models/enum/events';
import { EventBrokerService } from 'ng-event-broker';
import { CadForm } from '@radocccomponentes/pagecadastro/cadform';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Player } from '@radoccmodels/player';
import { ArquivoService } from '@radoccservices/base/arquivo-service';
import { PlayerService } from '@radoccservices/player-services';
import { MessageService } from 'primeng/api';
import { Equipamento } from '@radoccmodels/equipamento';
import { EquipamentoService } from '@radoccservices/equipamento-services';
import { PlayerEquipamento } from '@radoccmodels/playerequipamento';
import { PlayerEquipamentoService } from '@radoccservices/playerequipamento-services';

@Component({
  selector: 'app-player-cadastro',
  templateUrl: './player-cadastro.component.html',
  styleUrls: ['./player-cadastro.component.scss'],
  providers:[
    ArquivoService,
    MessageService,PlayerService, EquipamentoService, PlayerEquipamentoService
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
    observacao:new FormControl(),
    dataImplantacao:new FormControl(),
    dataRemocao:new FormControl(),
    equipamento:new FormControl(),
    horaInicio:new FormControl(),
    horaFim:new FormControl()
  }) 
  
  public player:Player;
  public playerEquipamento:PlayerEquipamento;
  public equipamentos:Equipamento[] = [];

  constructor(public arquivoService:ArquivoService, public msgService:MessageService, private playerService:PlayerService,
    private equipamentoService:EquipamentoService, public eventService:EventBrokerService, private playerEquipamentoService:PlayerEquipamentoService) {
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
    let horaInicio = new Date();
    let hr = (player.horaInicio+"").split(":")[0];
    let minutos = (player.horaInicio+"").split(":")[1];
    horaInicio.setHours(parseInt(hr));
    horaInicio.setMinutes(parseInt(minutos));
    this.form.controls['horaInicio'].setValue(horaInicio ,{emitEvent:false});

    let horaFim = new Date();
    hr = (player.horaFim+"").split(":")[0];
    minutos = (player.horaFim+"").split(":")[1];
    horaFim.setHours(parseInt(hr));
    horaFim.setMinutes(parseInt(minutos));
    this.form.controls['horaFim'].setValue(horaFim ,{emitEvent:false});

    if (player.playerEquipamento != null){
      this.playerEquipamento = player.playerEquipamento;
      this.form.controls['equipamento'].setValue(player.playerEquipamento.equipamento, {emitEvent:false});
      this.form.controls['dataImplantacao'].setValue(new Date(this.playerEquipamento.dataImplantacao), {emitEvent:false});
      // this.form.controls['dataRemocao'].setValue()
    }

    if (editavel == false){
      this.form.disable();
    }    
  }

  public pesquisarEquipamento(nome:string){
    this.equipamentoService.findNome(nome).subscribe((lista)=>{
      this.equipamentos = lista;
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

    if (this.playerEquipamento == null){
      this.playerEquipamento = new PlayerEquipamento();
    }
    this.playerEquipamento.equipamento = this.form.controls['equipamento'].value;
    this.playerEquipamento.dataImplantacao = this.form.controls['dataImplantacao'].value;
    this.playerEquipamento.dataRemocao = this.form.controls['dataRemocao'].value;

    this.player.playerEquipamento = this.playerEquipamento;

    this.playerService.save(this.player).subscribe((player)=>{
      this.player = player;
      this.playerEquipamento = player.playerEquipamento;
      this.page.showSuccessMsg('SALVO_COM_SUCESSO');
      this.eventService.publishEvent(Events.atualizarLista);
    }, error=>{
      this.page.showErrorMsg('FALHA_AO_SALVAR');
      console.log(error);
    })
  } 

  public trocarEquipamento(event){
    this.playerEquipamento.dataRemocao = this.form.controls['dataRemocao'].value;
    this.playerEquipamentoService.save(this.playerEquipamento).subscribe(()=>{
      this.playerEquipamento = null;
      this.form.controls['equipamento'].reset();
      this.form.controls['dataImplantacao'].reset();
      this.form.controls['dataRemocao'].reset();
      this.page.showSuccessMsg('INFORME_OS_DADOS_DO_NOVO_EQUIPAMENTO');
    },err =>{
      this.page.showErrorMsg('FALHA_NO_PROCESSO_DE_TROCA_DO_EQUIPAMENTO');
    });    
  }
}
