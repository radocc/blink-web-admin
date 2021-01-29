import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Arquivo } from '@radoccmodels/base/arquivo';
import { Conteudo } from '@radoccmodels/conteudo';
import { ArquivoService } from '@radoccservices/base/arquivo-service';
import { ConteudoService } from '@radoccservices/conteudo-services';
import { MessageService } from 'primeng/api';
import { PanelAgendamentoComponent } from '../panel-agendamento/panel-agendamento.component';

@Component({
  selector: 'app-template-loteria-conteudo',
  templateUrl: './template-loteria.component.html',
  styleUrls: ['./template-loteria.component.scss'],
  providers:[
    ArquivoService,
    MessageService,ConteudoService
  ]
})
export class TemplateLoteriaComponent implements OnInit {

  @ViewChild("panelAgendamento") public panelAgendamento:PanelAgendamentoComponent;

  public form:FormGroup = new FormGroup({
    titulo:new FormControl('', Validators.required),    
    minutos:new FormControl(),
    segundos:new FormControl(),
  }) 
  
  public arquivo:Arquivo;
  public conteudo:Conteudo;

  constructor(public arquivoService:ArquivoService, private msgService:MessageService, private conteudoService:ConteudoService) {

  }

  ngOnInit(): void { 
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
  
  public salvar(){    
    if (this.form.invalid || this.panelAgendamento.validar()==false && this.arquivo != null){
      this.msgService.add({
        severity:'error', summary:'Campos inválidos', detail:'Verifique os campos com asterisco vermelho'
      })
      return ;
    }
    if (this.conteudo == null){
      this.conteudo = new Conteudo();
    }
    this.conteudo.titulo = this.form.controls['titulo'].value;
    this.conteudo.idTipoConteudo = 1//Imagens
    let segundos = this.form.controls['segundos'].value;
    segundos += (this.form.controls['minutos'].value * 60);
    this.conteudo.tempoExibicao = segundos;
    this.conteudo.idTemplate = null;
    this.conteudo.idArquivo = this.arquivo.id;
    this.conteudo.agendamento = this.panelAgendamento.getAgendamento();
    this.conteudoService.save(this.conteudo).subscribe((conteudo)=>{
      this.conteudo = conteudo;
      this.panelAgendamento.setAgendamento(conteudo.agendamento);
    }, error=>{
      console.log(error);
    })
  }

  public publicar(){

  }

  public preview(){

  }

  public importar(){

  }

}
