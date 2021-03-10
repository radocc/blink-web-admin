import { Loteria } from './../../../../models/loteria';
import { LoteriaService } from './../../../../services/loteria-services';
import { CidadeService } from './../../../../services/base/cidade-service';
import { TemplateService } from './../../../../services/template-services';
import { Template } from './../../../../models/template';
import { Cidade } from './../../../../models/base/cidade';
import { ETipoConteudo } from '@radoccmodels/enum/etipoConteudo';
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
    MessageService,ConteudoService,LoteriaService, TemplateService
  ]
})
export class TemplateLoteriaComponent implements OnInit {

  @ViewChild("panelAgendamento") public panelAgendamento:PanelAgendamentoComponent;

  public form:FormGroup = new FormGroup({
    titulo:new FormControl('', Validators.required),    
    loteria:new FormControl(null, [Validators.required]),
    template:new FormControl(null, [Validators.required]),
    minutos:new FormControl(),
    segundos:new FormControl(),
  }) 
  
  public arquivo:Arquivo;
  public conteudo:Conteudo;
  public loterias:Loteria[] = [];  
  public templates:Template[] = [];

  constructor(public arquivoService:ArquivoService, private msgService:MessageService, private conteudoService:ConteudoService,
    private loteriaService:LoteriaService, private templateService:TemplateService) {

  }

  ngOnInit(): void { 
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
    this.conteudo.idTipoConteudo = ETipoConteudo.Loteria
    let segundos = this.form.controls['segundos'].value;
    segundos += (this.form.controls['minutos'].value * 60);
    this.conteudo.tempoExibicao = segundos;
    this.conteudo.idTemplate = null;
    this.conteudo.idArquivo = this.arquivo.id;
    this.conteudo.agendamento = this.panelAgendamento.getAgendamento();
    this.conteudoService.save(this.conteudo).subscribe((conteudo)=>{
      this.conteudo = conteudo;
      this.msgService.add({
        severity: 'success',
        summary: 'Sucesso!',
        detail: 'Salvo com Sucesso!'
      })
      this.panelAgendamento.setAgendamento(conteudo.agendamento);
    }, error=>{
      this.msgService.add({
        severity:'error', summary:'Falha ao salvar!', detail:'Entre em contato com o suporte!'
      })
      console.log(error);
    })
  }

  public publicar(){

  }

  public preview(){

  }

  public importar(){

  }

  public pesquisarLoteria(nome:string){
    this.loteriaService.findNome(nome).subscribe((lista)=>{
      this.loterias = lista;
    })
  }

  public pesquisarTemplate(nome:string){
    this.templateService.findNomeETipo(nome,ETipoConteudo.Loteria).subscribe((lista)=>{
      this.templates = lista;
    })
  }

}
