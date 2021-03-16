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
import { GrupoPlayerService } from '@radoccservices/grupoplayer-services';
import { GrupoPlayer } from '@radoccmodels/grupoplayer';
import { GrupoPlayerItem } from '@radoccmodels/grupoplayeritem';
import { GrupoPlayerItemService } from '@radoccservices/grupoplayeritem-services';

@Component({
  selector: 'app-grupoplayer-cadastro',
  templateUrl: './grupoplayer-cadastro.component.html',
  styleUrls: ['./grupoplayer-cadastro.component.scss'],
  providers:[
    GrupoPlayerService, GrupoPlayerItemService
  ]
})
export class GrupoPlayerCadastroComponent extends CadForm implements OnInit {

  public config:{
    titulo:string,
    subTitle:string,
    btnSalvar:string;
  }={
    titulo:'GRUPO_DE_PLAYER',
    subTitle:'',
    btnSalvar:'SALVAR'
  }
  public form:FormGroup = new FormGroup({
    nome:new FormControl('', Validators.required),
    observacao:new FormControl()
  }) 
  
  public grupoPlayer:GrupoPlayer;
  public grupoItem:GrupoPlayerItem;
  public selectedPlayers:Player[] = [];
  public itens:Player[] = [];

  constructor(public eventService:EventBrokerService, private grupoPlayerService:GrupoPlayerService,
    public grupoItemService:GrupoPlayerItemService) {
      super(eventService);
  }

  ngOnInit(): void { 
    super.ngOnInit();
    this.grupoItemService.getParaEditar(0).subscribe((lista)=>{
      this.itens = lista;
    })
  } 

  public buscar(id:number, editavel:boolean){
      this.grupoPlayerService.findById(id).subscribe((player)=>{
        this.montarForm(player,editavel);
      })
  };

  public montarForm(grupoPlayer:GrupoPlayer, editavel:boolean){
    this.grupoPlayer = grupoPlayer;
    this.form.controls['nome'].setValue(grupoPlayer.nome,{emitEvent:false});
    this.form.controls['observacao'].setValue(grupoPlayer.observacao,{emitEvent:false});
    this.selectedPlayers = [];
    this.grupoItemService.getParaEditar(grupoPlayer.id).subscribe((lista)=>{
      this.itens = lista;
      for (let w = 0; w < lista.length;w++){
        if (lista[w].idItem != null){
          this.selectedPlayers.push(lista[w]);
        }
      }
    })
    if (editavel == false){
      this.form.disable();
    }    
  }
  
  public salvar(event:any){
    if (this.form.invalid){
      this.page.showWarnMsg('EXISTEM_CAMPOS_INVALIDOS');
      return ;
    }
    if (this.grupoPlayer == null){
      this.grupoPlayer = new GrupoPlayer();
    }
    
    this.grupoPlayer.nome = this.form.controls['nome'].value;
    this.grupoPlayer.observacao = this.form.controls['observacao'].value;
    this.grupoPlayer.players = this.selectedPlayers;
    this.grupoPlayerService.save(this.grupoPlayer).subscribe((grupoPlayer)=>{
      this.grupoPlayer = grupoPlayer;
      this.page.showSuccessMsg('SALVO_COM_SUCESSO');
      this.eventService.publishEvent(Events.atualizarLista);
    }, error=>{
      this.page.showErrorMsg('FALHA_AO_SALVAR');
      console.log(error);
    })
  } 
}
