import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
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
export class EquipamentoCadastroComponent implements OnInit {
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
  
  public equipamento:Equipamento;

  constructor(private msgService:MessageService, private equipamentoService:EquipamentoService) {

  }

  ngOnInit(): void { 
  } 
  
  public salvar(event){    
    if (this.form.invalid){
      this.msgService.add({
        severity:'error', summary:'Campos inválidos', detail:'Verifique os campos com asterisco vermelho'
      })
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
    }, error=>{
      console.log(error);
    })
  }
 

}