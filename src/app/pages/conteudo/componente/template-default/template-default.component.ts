import { ActivatedRoute } from '@angular/router'; 
import { EventBrokerService } from 'ng-event-broker'; 
import { Events } from '../../../../models/enum/events';
import { TranslateService } from '@ngx-translate/core';
import { CadConteudoComponent } from '../cad-conteudo/cad-conteudo.component';
import { Loteria } from '../../../../models/loteria';
import { LoteriaService } from '../../../../services/loteria-services'; 
import { TemplateService } from '../../../../services/template-services';
import { Template } from '../../../../models/template';
import { Cidade } from '../../../../models/base/cidade';
import { ETipoConteudo } from '@radoccmodels/enum/etipoConteudo';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Arquivo } from '@radoccmodels/base/arquivo';
import { Conteudo } from '@radoccmodels/conteudo';
import { ArquivoService } from '@radoccservices/base/arquivo-service';
import { ConteudoService } from '@radoccservices/conteudo-services';
import { MessageService } from 'primeng/api';
import { PanelAgendamentoComponent } from '../panel-agendamento/panel-agendamento.component';
import { ConteudoCampo } from '@radoccmodels/conteudocampo';
import { ConteudoCampoService } from '@radoccservices/conteudocampo-services';
import { TemplateCampoService } from '@radoccservices/templatecampo-services';
import { FileUpload } from 'primeng/fileupload';
import { TipoConteudoService } from '@radoccservices/tipoconteudo-services';

@Component({
  selector: 'app-template-default-conteudo',
  templateUrl: './template-default.component.html',
  styleUrls: ['./template-default.component.scss'],
  providers:[
    ArquivoService,
    MessageService,ConteudoService,LoteriaService, TemplateService, TemplateCampoService, ConteudoCampoService,
    TipoConteudoService
  ]
})
export class TemplateDefaultComponent extends CadConteudoComponent implements OnInit {

  @ViewChild("panelAgendamento") public panelAgendamento:PanelAgendamentoComponent;
  @ViewChild("fileUploadVideo") public fileUploadVideo:FileUpload;
  @ViewChild("fileUploadImagem") public fileUploadImagem:FileUpload;
  public form:FormGroup = new FormGroup({
    titulo:new FormControl('', Validators.required),    
    template:new FormControl(),
    minutos:new FormControl(1),
    audio:new FormControl(1),
    tipo:new FormControl(1),
    segundos:new FormControl(30),
  }) 
  public conteudo:Conteudo;
  public templates:Template[] = [];
  public tipoConteudo:ETipoConteudo = ETipoConteudo.Receitas;
  public campos:ConteudoCampo[] = [];
  public titulo:string= 'CADASTRO';
  public mostrarPreview:boolean = false;
  public arquivo:Arquivo;
  public files:File[] = [];
  public idTipoConteudo:number;
  public clonar:boolean = false;
  public tipo:number=3;
  public tipos:{id:number,nome:string}[] = [
    {
      id:1,
      nome:'Template'
    },
    {
      id:2,
      nome:'Vídeo'
    },
    {
      id:3,
      nome:'Imagem'
    },
    
  ];
  constructor(public arquivoService:ArquivoService, public msgService:MessageService, private conteudoService:ConteudoService,
    private templateService:TemplateService, public translateService:TranslateService,
    private eventService:EventBrokerService, private route:ActivatedRoute,private tipoConteudoService:TipoConteudoService,
    private conteudoCampoService:ConteudoCampoService, private templateCampoService:TemplateCampoService) {
      super(msgService, translateService);
  }

  ngOnInit(): void { 
    this.form.controls['template'].valueChanges.subscribe((template)=>{
      if (template != null){
        this.buscarCampos(template)
      }      
    })
    this.form.controls['tipo'].valueChanges.subscribe((tipo)=>{
      if (tipo != 1){
        this.campos = []
        this.form.controls['template'].setValue(null);
      }else if (tipo == 1){
        this.arquivo = null;
        this.form.controls['template'].setValidators(Validators.required);
      }     
    })
    this.route.params.subscribe((param)=>{

      this.idTipoConteudo = param['idTipoConteudo'];
      this.clonar = param['clonar'] == 'true';
      if (param['id']){
          this.buscar(param['id']);
      }
      if (this.idTipoConteudo != null){
        this.tipoConteudoService.findById(this.idTipoConteudo).subscribe((tipoConteudo)=>{
          this.titulo = tipoConteudo.nome;
        })
      }
    })
  }

  public buscarCampos(template){
    let idConteudo = 0;
    if (this.conteudo != null){
      idConteudo = this.conteudo.id;
    }
    this.conteudoCampoService.getPreenchimentoManualByConteudoETemplate(idConteudo, template.id).subscribe((lista)=>{
      this.campos = lista;
      if (lista.length > 0){
            for (let w = 0; w < lista.length;w++){
              let camp = lista[w];
              if (camp.valor == null){
                camp.valor = '';
              }
            }
          } 
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

  public buscar(id:number){
    this.conteudoService.findConteudoDefault(id).subscribe((conteudo)=>{
      this.conteudo = conteudo;
      if (conteudo != null){
        this.form.controls['titulo'].setValue(conteudo.titulo);
        let min = (conteudo.tempoExibicao / 60).toFixed(0);
        let segundos = (conteudo.tempoExibicao % 60);
        this.form.controls['minutos'].setValue(min);
        this.form.controls['segundos'].setValue(segundos);
        this.form.controls['template'].setValue(conteudo.template);
        this.form.controls['tipo'].setValue(conteudo.tipo);
        this.tipo = conteudo.tipo;
        this.arquivo = conteudo.arquivo;
        if (conteudo.arquivo == null && this.conteudo.idArquivo != null){
          this.arquivoService.findById(this.conteudo.idArquivo).subscribe((arq)=>{
            this.arquivo = arq;
          })
        }
        if (conteudo.idTemplate != null){
          this.conteudoCampoService.getPreenchimentoManualByConteudoETemplate(conteudo.id,conteudo.idTemplate).subscribe((lista)=>{
            this.campos = lista;
          })
        }
        if (conteudo.agendamento != null){
          this.panelAgendamento.setAgendamento(conteudo.agendamento);
        }
        
      }
    });
  }
   
  public salvar(){    
    if (this.form.invalid || this.panelAgendamento.validar()==false){
      this.showWarnMsg('EXISTEM_CAMPOS_OBRIGATORIOS');
      return ;
    }
    if (this.conteudo == null || this.clonar){
      this.conteudo = new Conteudo();
    }
    this.conteudo.titulo = this.form.controls['titulo'].value;
    this.conteudo.idTipoConteudo = this.idTipoConteudo;
    this.conteudo.tipo = this.form.controls['tipo'].value;
    if (this.tipo != 2){
      let segundos = this.form.controls['segundos'].value;
      segundos += (this.form.controls['minutos'].value * 60);
      this.conteudo.tempoExibicao = segundos;
    }else {
      this.conteudo.tempoExibicao = 0;
    }
    
    if (this.form.controls['template'].value != null){
      this.conteudo.idTemplate = this.form.controls['template'].value.id;
      this.conteudo.template = this.form.controls['template'].value;
    }else {
      this.conteudo.idTemplate = null;
      this.conteudo.template = null;
    }
    if (this.arquivo != null){
      this.conteudo.idArquivo = this.arquivo.id;
    }    
    if (this.tipo == 2){
      this.conteudo.tempoExibicao = this.arquivo.tempoDuracao;
    }
    this.conteudo.campos = this.campos;
    this.conteudo.agendamento = this.panelAgendamento.getAgendamento();
    this.conteudoService.save(this.conteudo).subscribe((conteudo)=>{
      this.conteudo = conteudo;
      this.showSuccessMsg('SALVO_COM_SUCESSO');
      this.eventService.publishEvent(Events.atualizarLista);
      this.panelAgendamento.setAgendamento(conteudo.agendamento);
    }, error=>{
      this.showErrorMsg('FALHA_AO_SALVAR');
      console.log(error);
    })
  }

  public novo(){
    this.form.reset({minutos:0,segundos:15});
    this.conteudo = null;
    this.panelAgendamento.reset();
    if (this.fileUploadVideo != null){
      this.fileUploadVideo.clear();
    }
    if (this.fileUploadImagem != null){
      this.fileUploadImagem.clear();
    }
  }

  public publicar(){

  }

  public preview(){

  }

  public importar(){

  } 

  public pesquisarTemplate(nome:string){
    this.templateService.findNomeETipo(nome,this.idTipoConteudo).subscribe((lista)=>{
      this.templates = lista;
    })
  }

  public baixarArquivo(){
    window.open(this.arquivo.url, 'Download');
  }

}
