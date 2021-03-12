import { Events } from './../../../../../models/enum/events';
import { EventBrokerService } from 'ng-event-broker';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { PageCadastroComponent } from '@radocccomponentes/pagecadastro/pagecadastro.component';
import { TipoConteudo } from '@radoccmodels/tipoconteudo';
import { TipoConteudoService } from '@radoccservices/tipoconteudo-services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tipoconteudo-cadastro',
  templateUrl: './tipoconteudo-cadastro.component.html',
  styleUrls: ['./tipoconteudo-cadastro.component.scss'],
  providers:[ 
    MessageService,TipoConteudoService
  ]
})
export class TipoConteudoCadastroComponent implements OnInit {
  public config:{
    titulo:string,
    subTitle:string,
    btnSalvar:string;
  }={
    titulo:'TIPO_DE_CONTEUDO',
    subTitle:'',
    btnSalvar:'SALVAR'
  }
  @ViewChild("pageCadastro") public pageCadastro:PageCadastroComponent;
  
  public form:FormGroup = new FormGroup({
    nome:new FormControl('', Validators.required),
    sequencia:new FormControl('', Validators.required)
  }) 
  
  public tipo:TipoConteudo;

  constructor(private eventService:EventBrokerService, private tipoConteudoService:TipoConteudoService) {

  }

  ngOnInit(): void { 
  } 
  
  public salvar(event){    
    if (this.form.invalid){
      this.pageCadastro.showWarnMsg('EXISTEM_CAMPOS_INVALIDOS');
      return ;
    }
    if (this.tipo == null){
      this.tipo = new TipoConteudo();
    }
    this.tipo.nome = this.form.controls['nome'].value;
    this.tipo.sequencia = this.form.controls['sequencia'].value;
    
    this.tipoConteudoService.save(this.tipo).subscribe((equipamento)=>{
      this.tipo = equipamento;
      this.pageCadastro.showSuccessMsg('SALVO_COM_SUCESSO');
      this.eventService.publishEvent(Events.atualizarLista);
    }, error=>{
      this.pageCadastro.showErrorMsg('FALHA_AO_SALVAR');
      console.log(error);
    })
  }
 

}
