import { EventBrokerService } from 'ng-event-broker';
import { Events } from './../../../../models/enum/events';
import { TranslateService } from '@ngx-translate/core';
import { CadConteudoComponent } from '../cad-conteudo/cad-conteudo.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Arquivo } from '@radoccmodels/base/arquivo';
import { Conteudo } from '@radoccmodels/conteudo';
import { ETipoConteudo } from '@radoccmodels/enum/etipoConteudo';
import { ArquivoService } from '@radoccservices/base/arquivo-service';
import { ConteudoService } from '@radoccservices/conteudo-services';
import { MessageService } from 'primeng/api';
import { PanelAgendamentoComponent } from '../panel-agendamento/panel-agendamento.component';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-template-imagem-conteudo',
  templateUrl: './template-imagem.component.html',
  styleUrls: ['./template-imagem.component.scss'],
  providers:[
    ArquivoService,
    MessageService,ConteudoService
  ]
})
export class TemplateImagemComponent extends CadConteudoComponent implements OnInit {

  @ViewChild("panelAgendamento") public panelAgendamento:PanelAgendamentoComponent;
  @ViewChild("fileUpload") public fileUpload:FileUpload;
  public form:FormGroup = new FormGroup({
    titulo:new FormControl('', Validators.required),    
    segundos:new FormControl(10),
  }) 
  
  public arquivo:Arquivo;
  public files:File[] = [];
  public conteudo:Conteudo;
  public idTipoConteudo:number;
  public clonar:boolean = false;

  constructor(public arquivoService:ArquivoService, public msgService:MessageService, private conteudoService:ConteudoService,private router:Router,
    private route:ActivatedRoute, public translateService:TranslateService, private eventService:EventBrokerService) {
      super(msgService, translateService);
  }

  ngOnInit(): void { 
    this.route.params.subscribe((param)=>{
      this.idTipoConteudo = param['idTipoConteudo'];
      this.clonar = param['clonar'] == 'true';
      if (param['id']){
          this.buscar(param['id']);
      }
    })
  }

  public buscar(id:number){
    this.conteudoService.findConteudoImagem(id).subscribe((conteudo)=>{
      this.conteudo = conteudo;
      if (conteudo != null){
        this.form.controls['titulo'].setValue(conteudo.titulo);
        this.form.controls['segundos'].setValue(conteudo.tempoExibicao);
        this.arquivo = conteudo.arquivo;
        let file = new File([], this.arquivo.nome);
        this.files = [file ];
        this.panelAgendamento.setAgendamento(conteudo.agendamento);
      }
    });
  }

  public uploadFile(event){
    if (event.files.length > 0){
      event.progress = 10;
      this.arquivoService.postFile(event.files[0]).then((res)=>{
        event.progress = 100;
        this.arquivo = res;
        this.fileUpload.clear();
      })
    }    
  }  
  
  public salvar(){    
    if (this.form.invalid || this.panelAgendamento.validar()==false && this.arquivo != null){
      this.showWarnMsg('EXISTEM_CAMPOS_INVALIDOS');
      return ;
    }
    if (this.conteudo == null || this.clonar){
      this.conteudo = new Conteudo();
    }
    this.conteudo.titulo = this.form.controls['titulo'].value;
    this.conteudo.idTipoConteudo = this.idTipoConteudo; 
    let segundos = this.form.controls['segundos'].value;
    this.conteudo.tempoExibicao = segundos;
    this.conteudo.idTemplate = null;
    this.conteudo.tipo = ETipoConteudo.Imagens;
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

  public novo(){
    this.form.reset({segundos:10});
    this.arquivo = null;
    this.conteudo = null;
    this.panelAgendamento.reset();
    this.fileUpload.clear();
    this.router.navigate(['admin/conteudo/panel/imagem']);
  }

  public baixarArquivo(){
    window.open(this.arquivo.url, 'Download');
  }
}
