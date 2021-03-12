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
    MessageService,EquipamentoService
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
  @ViewChild("pageCadastro") public pageCadastro:PageCadastroComponent;
  public form:FormGroup = new FormGroup({
    nome:new FormControl('', Validators.required),
    identificador:new FormControl('', Validators.required),
    uuid:new FormControl('', Validators.required),
    fornecedor:new FormControl(''),
    dataCompra:new FormControl()
  }) 
  
  public equipamento:Equipamento;

  constructor(private equipamentoService:EquipamentoService,
    public eventService:EventBrokerService) {
      super(eventService)
  }

  ngOnInit(): void { 
  } 

  public buscar(id:number, editavel:boolean){
    this.equipamentoService.findById(id).subscribe((fonte)=>{
      this.montarForm(fonte,editavel);
    })
  }

  public montarForm(equipamento:Equipamento, editavel){
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
      this.pageCadastro.showWarnMsg('EXISTEM_CAMPOS_INVALIDOS');
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
      this.pageCadastro.showSuccessMsg('SALVO_COM_SUCESSO');
      this.eventService.publishEvent(Events.atualizarLista);
    }, error=>{
      console.log(error);
      this.pageCadastro.showErrorMsg('FALHA_AO_SALVAR');
    })
  }
 

}
