import { TranslateService } from '@ngx-translate/core';
import { CadConteudoComponent } from '../cad-conteudo/cad-conteudo.component';
import { ETipoConteudo } from '@radoccmodels/enum/etipoConteudo';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Arquivo } from '@radoccmodels/base/arquivo';
import { Conteudo } from '@radoccmodels/conteudo';
import { ArquivoService } from '@radoccservices/base/arquivo-service';
import { ConteudoService } from '@radoccservices/conteudo-services';
import { MessageService } from 'primeng/api';
import { PanelAgendamentoComponent } from '../panel-agendamento/panel-agendamento.component';
import { Events } from '@radoccmodels/enum/events';
import { EventBrokerService } from 'ng-event-broker';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-template-video-conteudo',
  templateUrl: './template-video.component.html',
  styleUrls: ['./template-video.component.scss'],
  providers:[
    ArquivoService,
    MessageService,ConteudoService
  ]
})
export class TemplateVideoComponent extends CadConteudoComponent implements OnInit {

  @ViewChild("panelAgendamento") public panelAgendamento:PanelAgendamentoComponent;
  @ViewChild("fileUpload") public fileUpload:FileUpload;
  public form:FormGroup = new FormGroup({
    titulo:new FormControl(null, Validators.required),
    audio:new FormControl('1', Validators.required)
  }) 
  
  public arquivo:Arquivo;
  public conteudo:Conteudo;

  constructor(public arquivoService:ArquivoService, public msgService:MessageService, private conteudoService:ConteudoService,private router:Router,
    private eventService:EventBrokerService, private route:ActivatedRoute, public translateService:TranslateService) {
      super(msgService, translateService);
  }

  ngOnInit(): void { 
    this.route.params.subscribe((param)=>{
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
        this.form.controls['audio'].setValue(conteudo.audio);
        this.arquivo = conteudo.arquivo;
        let file = new File([], this.arquivo.nome);
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
        console.log(res);
      })
    }    
  }  
  
  public salvar(){    
    if (this.form.invalid || this.panelAgendamento.validar()==false && this.arquivo != null){
      this.showWarnMsg('EXISTEM_CAMPOS_INVALIDOS');
      return ;
    }
    if (this.conteudo == null){
      this.conteudo = new Conteudo();
    }
    this.conteudo.titulo = this.form.controls['titulo'].value;
    this.conteudo.idTipoConteudo = ETipoConteudo.Video;
    this.conteudo.tempoExibicao = this.arquivo.tempoDuracao;
    this.conteudo.idTemplate = null;
    this.conteudo.tipo = 2;
    this.conteudo.audio = this.form.controls['audio'].value;
    this.conteudo.idArquivo = this.arquivo.id;
    this.conteudo.agendamento = this.panelAgendamento.getAgendamento();
    this.conteudoService.save(this.conteudo).subscribe((conteudo)=>{
      this.conteudo = conteudo;
      this.panelAgendamento.setAgendamento(conteudo.agendamento);
      this.showSuccessMsg('SALVO_COM_SUCESSO');
      this.eventService.publishEvent(Events.atualizarLista);
      this.novo();
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
    this.form.reset();
    this.arquivo = null;
    this.panelAgendamento.reset();
    this.fileUpload.clear();
    // this.router.navigate(['admin/conteudo/panel/video']);
  }

  public baixarArquivo(){
    window.open(this.arquivo.url, 'Download');
  }
}
