import { CadForm } from '@radocccomponentes/pagecadastro/cadform';
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
export class TipoConteudoCadastroComponent extends CadForm implements OnInit {
  public config:{
    titulo:string,
    subTitle:string,
    btnSalvar:string;
  }={
    titulo:'TIPO_DE_CONTEUDO',
    subTitle:'',
    btnSalvar:'SALVAR'
  }
  
  public form:FormGroup = new FormGroup({
    nome:new FormControl('', Validators.required),
    sequencia:new FormControl(1, Validators.required),
    tipo:new FormControl(1, Validators.required)
  }) 
  
  public tipoConteudo:TipoConteudo;
  public tipos:{id:number,nome:string}[] = [
    {
      id:1,
      nome:'Vídeo'
    },
    {
      id:2,
      nome:'Imagem'
    },
    {
      id:3,
      nome:'Previsão do Tempo'
    },
    {
      id:4,
      nome:'Notícias'
    },
    {
      id:5,
      nome:'Loteria'
    },
    {
      id:6,
      nome:'Padrão'
    }
  ];

  constructor(public eventService:EventBrokerService, private tipoConteudoService:TipoConteudoService) {
    super(eventService)
  }

  ngOnInit(): void { 
    super.ngOnInit();
  } 

  public novo() {
    this.tipoConteudo = new TipoConteudo();
    super.novo();
  }

  public buscar(id:number, editavel:boolean){
    this.tipoConteudoService.findById(id).subscribe((tipo)=>{
      this.montarForm(tipo,editavel);
    })
  }

  public montarForm(tipo:TipoConteudo, editavel:boolean){
    this.tipoConteudo = tipo;
    this.form.controls['nome'].setValue(tipo.nome, {emitEvent:false});
    this.form.controls['sequencia'].setValue(tipo.sequencia, {emitEvent:false});
    this.form.controls['tipo'].setValue(tipo.tipo, {emitEvent:false});
    if (editavel == false){
      this.form.disable();
    }    
  }
  
  public salvar(event){    
    if (this.form.invalid){
      this.page.showWarnMsg('EXISTEM_CAMPOS_INVALIDOS');
      return ;
    }
    if (this.tipoConteudo == null){
      this.tipoConteudo = new TipoConteudo();
    }
    this.tipoConteudo.nome = this.form.controls['nome'].value;
    this.tipoConteudo.sequencia = this.form.controls['sequencia'].value;
    this.tipoConteudo.tipo = this.form.controls['tipo'].value;
    
    this.tipoConteudoService.save(this.tipoConteudo).subscribe((equipamento)=>{
      this.tipoConteudo = equipamento;
      this.page.showSuccessMsg('SALVO_COM_SUCESSO');
      this.eventService.publishEvent(Events.atualizarLista);
    }, error=>{
      this.page.showErrorMsg('FALHA_AO_SALVAR');
      console.log(error);
    })
  }
 

}
