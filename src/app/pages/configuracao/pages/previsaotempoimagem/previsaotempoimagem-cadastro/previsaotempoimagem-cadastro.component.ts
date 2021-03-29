import { CadForm } from '@radocccomponentes/pagecadastro/cadform';
import { Events } from '../../../../../models/enum/events';
import { EventBrokerService } from 'ng-event-broker';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';  
import { MessageService } from 'primeng/api';
import { PrevisaoTempoImagemService } from '@radoccservices/previsaotempoimagem-service';
import { PrevisaoTempoImagem } from '@radoccmodels/previsaotempoimagem';
import { ArquivoService } from '@radoccservices/base/arquivo-service';
import { Arquivo } from '@radoccmodels/base/arquivo';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-previsaotempoimagem-cadastro',
  templateUrl: './previsaotempoimagem-cadastro.component.html',
  styleUrls: ['./previsaotempoimagem-cadastro.component.scss'],
  providers:[ 
    MessageService,PrevisaoTempoImagemService, ArquivoService
  ]
})
export class PrevisaoTempoImagemCadastroComponent extends CadForm implements OnInit {
  public config:{
    titulo:string,
    subTitle:string,
    btnSalvar:string;
  }={
    titulo:'IMAGEM_DA_PREVISAO_DO_TEMPO',
    subTitle:'',
    btnSalvar:'SALVAR'
  }
  
  public form:FormGroup = new FormGroup({
    sigla:new FormControl('', Validators.required),
    descricao:new FormControl('', Validators.required),
    texto:new FormControl(''),
    url:new FormControl('')
  }) 
  @ViewChild("fileUpload") public fileUpload:FileUpload;
  public previsaoImagem:PrevisaoTempoImagem;
  public arquivo:Arquivo;
  public files:File[] = [];

  constructor(public eventService:EventBrokerService, private previsaoService:PrevisaoTempoImagemService,
      private arquivoService:ArquivoService) {
    super(eventService)
  }

  ngOnInit(): void { 
    super.ngOnInit();
  } 

  public novo() {
    this.previsaoImagem = new PrevisaoTempoImagem();
    super.novo();
    this.arquivo = null;
    this.fileUpload.clear();
  }

  public buscar(id:number, editavel:boolean){
    this.previsaoService.findById(id).subscribe((tipo)=>{
      this.montarForm(tipo,editavel);
    })
  }

  public uploadFile(event){
    if (event.files.length > 0){
      event.progress = 10;
      this.arquivoService.postFile(event.files[0]).then((res)=>{
        event.progress = 100;
        this.arquivo = res;
        console.log(res);
      })
    }    
  }

  public montarForm(tipo:PrevisaoTempoImagem, editavel:boolean){
    this.previsaoImagem = tipo;
    this.form.controls['sigla'].setValue(tipo.sigla, {emitEvent:false});
    this.form.controls['descricao'].setValue(tipo.descricao, {emitEvent:false});
    this.form.controls['texto'].setValue(tipo.texto, {emitEvent:false});
    this.arquivoService.findById(tipo.idArquivo).subscribe((arquivo)=>{
      this.arquivo = arquivo;
    })
    // this.form.controls['descricao'].setValue(tipo.descricao, {emitEvent:false});
    if (editavel == false){
      this.form.disable();
    }    
  }
  
  public salvar(event){    
    if (this.form.invalid){
      this.page.showWarnMsg('EXISTEM_CAMPOS_INVALIDOS');
      return ;
    }
    if (this.previsaoImagem == null){
      this.previsaoImagem = new PrevisaoTempoImagem();
    }
    this.previsaoImagem.sigla = this.form.controls['sigla'].value;
    this.previsaoImagem.descricao = this.form.controls['descricao'].value;
    this.previsaoImagem.texto = this.form.controls['texto'].value;
    this.previsaoImagem.idArquivo = this.arquivo.id;

    this.previsaoService.save(this.previsaoImagem).subscribe((equipamento)=>{
      this.previsaoImagem = equipamento;
      this.page.showSuccessMsg('SALVO_COM_SUCESSO');
      this.eventService.publishEvent(Events.atualizarLista);
    }, error=>{
      this.page.showErrorMsg('FALHA_AO_SALVAR');
      console.log(error);
    })
  }

}
