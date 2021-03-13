import { EventBrokerService } from 'ng-event-broker';
import { Events } from './../../../../models/enum/events';
import { TranslateService } from '@ngx-translate/core';
import { CadConteudoComponent } from './../cad-conteuo/cad-conteudo.component';
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
  selector: 'app-template-cotacao-conteudo',
  templateUrl: './template-cotacao.component.html',
  styleUrls: ['./template-cotacao.component.scss'],
  providers:[
    ArquivoService,
    MessageService,ConteudoService
  ]
})
export class TemplateCotacaoComponent extends CadConteudoComponent implements OnInit {

  @ViewChild("panelAgendamento") public panelAgendamento:PanelAgendamentoComponent;

  public form:FormGroup = new FormGroup({
    titulo:new FormControl('', Validators.required),    
    minutos:new FormControl(),
    segundos:new FormControl(),
  }) 
  
  public arquivo:Arquivo;
  public conteudo:Conteudo;

  constructor(public arquivoService:ArquivoService, public msgService:MessageService, private conteudoService:ConteudoService,
    public translateService:TranslateService, private eventService:EventBrokerService) {
    super(msgService, translateService);
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
  
  public novo(){
    this.form.reset();
    this.conteudo = null;
  }

  public salvar(){    
    if (this.form.invalid || this.panelAgendamento.validar()==false && this.arquivo != null){
      this.showWarnMsg('EXISTE_CAMPOS_INVALIDOS');
      return ;
    }
    if (this.conteudo == null){
      this.conteudo = new Conteudo();
    }
    this.conteudo.titulo = this.form.controls['titulo'].value;
    this.conteudo.idTipoConteudo = ETipoConteudo.Cotacao;//Cotações
    let segundos = this.form.controls['segundos'].value;
    segundos += (this.form.controls['minutos'].value * 60);
    this.conteudo.tempoExibicao = segundos;
    this.conteudo.idTemplate = null;
    this.conteudo.idArquivo = this.arquivo.id;
    this.conteudo.agendamento = this.panelAgendamento.getAgendamento();
    this.conteudoService.save(this.conteudo).subscribe((conteudo)=>{
      this.conteudo = conteudo;
      this.panelAgendamento.setAgendamento(conteudo.agendamento);
      this.eventService.publishEvent(Events.atualizarLista);
      this.showSuccessMsg('SALVO_COM_SUCESSO');
    }, error=>{
      this.showErrorMsg('FALHA_AO_SALVAR');
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
