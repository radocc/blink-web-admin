import { EmpresaService } from './../../../../../services/base/empresa-service';
import { Empresa } from './../../../../../models/base/empresa';
import { PlayerEquipamento } from '@radoccmodels/playerequipamento';
import { CadForm } from '@radocccomponentes/pagecadastro/cadform';
import { Events } from './../../../../../models/enum/events';
import { EventBrokerService } from 'ng-event-broker';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { PageCadastroComponent } from '@radocccomponentes/pagecadastro/pagecadastro.component';
import { Equipamento } from '@radoccmodels/equipamento';
import { EquipamentoService } from '@radoccservices/equipamento-services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-equipamento-cadastro',
  templateUrl: './equipamento-cadastro.component.html',
  styleUrls: ['./equipamento-cadastro.component.scss'],
  providers:[ 
    MessageService,EquipamentoService, EmpresaService
  ]
})
export class EquipamentoCadastroComponent extends CadForm implements OnInit {
  public config:{
    titulo:string,
    subTitle:string,
    btnSalvar:string;
  }={
    titulo:'EQUIPAMENTO',
    subTitle:'',
    btnSalvar:'SALVAR'
  } 
  public form:FormGroup = new FormGroup({
    nome:new FormControl('', Validators.required),
    identificador:new FormControl('', Validators.required),
    uuid:new FormControl('', Validators.required),
    fornecedor:new FormControl(''),
    dataCompra:new FormControl()
  }) 
  public formPlayer:FormGroup = new FormGroup({
    player:new FormControl(null, Validators.required),
    empresa:new FormControl(null, Validators.required),
    dataImplantacao:new FormControl(null, Validators.required),
    dataRemocao:new FormControl()
  }) 
  
  public equipamento:Equipamento;
  public players:PlayerEquipamento[] = [];
  public playerEquipamento:PlayerEquipamento = null;
  public empresas:Empresa[] = [];

  constructor(private equipamentoService:EquipamentoService,
    public eventService:EventBrokerService, private empresaService:EmpresaService) {
      super(eventService);
  }

  ngOnInit(): void { 
    super.ngOnInit();
  } 

  public buscar(id:number, editavel:boolean){
    this.equipamentoService.findById(id).subscribe((fonte)=>{
      this.montarForm(fonte,editavel);
    })
  }

  public montarForm(equipamento:Equipamento, editavel:boolean){
    this.equipamento = equipamento;
    this.form.controls['nome'].setValue(equipamento.nome, {emitEvent:false});
    this.form.controls['identificador'].setValue(equipamento.identificador, {emitEvent:false});
    this.form.controls['uuid'].setValue(equipamento.uuid, {emitEvent:false});
    this.form.controls['dataCompra'].setValue(equipamento.dataCompra, {emitEvent:false});
    this.form.controls['fornecedor'].setValue(equipamento.fornecedor, {emitEvent:false});
    if (editavel == false){
      this.form.disable();
    }    
  }
  
  public salvar(event){    
    if (this.form.invalid){
      this.page.showWarnMsg('EXISTEM_CAMPOS_INVALIDOS');
      return ;
    }
    if (this.equipamento == null){
      this.equipamento = new Equipamento();
    }
    this.equipamento.nome = this.form.controls['nome'].value;
    this.equipamento.identificador = this.form.controls['identificador'].value;
    this.equipamento.uuid = this.form.controls['uuid'].value;
    this.equipamento.fornecedor = this.form.controls['fornecedor'].value;
    this.equipamento.dataCompra = this.form.controls['dataCompra'].value;
    
    this.equipamentoService.save(this.equipamento).subscribe((equipamento)=>{
      this.equipamento = equipamento;
      this.page.showSuccessMsg('SALVO_COM_SUCESSO');
      this.eventService.publishEvent(Events.atualizarLista);
    }, error=>{
      console.log(error);
      this.page.showErrorMsg('FALHA_AO_SALVAR');
    })
  }
 
  public pesquisarEmpresa(nome:string){
    this.empresaService.buscarPorNome(nome).subscribe((lista)=>{
      this.empresas = lista;
    });
  }

  public adicionar(event){
    if (this.formPlayer.invalid){

      return;
    }
    let editando = true;
    if (this.playerEquipamento == null){
      this.playerEquipamento = new PlayerEquipamento();
      editando = false;
    }
    this.playerEquipamento.empresa = this.formPlayer.controls['empresa'].value;
    this.playerEquipamento.dataImplantacao = this.formPlayer.controls['dataImplantacao'].value;
    this.playerEquipamento.dataRemocao = this.formPlayer.controls['dataRemocao'].value;
    this.playerEquipamento.player = this.formPlayer.controls['player'].value;
    if (editando){
      let index = this.players.indexOf(this.playerEquipamento);
      this.players.splice(index,1,this.playerEquipamento);
    }else{
      this.players.push(this.playerEquipamento);
    }
    this.playerEquipamento = null;
    this.formPlayer.reset();
  }

  public alterarPlayerEquipamento(obj:PlayerEquipamento){
    this.playerEquipamento = obj;
    this.formPlayer.controls['empresa'].setValue(obj.empresa);
    this.formPlayer.controls['player'].setValue(obj.player);
    this.formPlayer.controls['dataImplantacao'].setValue(obj.dataImplantacao);
    this.formPlayer.controls['dataRemocao'].setValue(obj.dataRemocao);
  }

  public excluirPlayerEquipamento(obj){
    let index = this.players.indexOf(obj);
    this.players.splice(index,1);
  }

}
