import { ActivatedRoute } from '@angular/router';
import { EventBrokerService } from 'ng-event-broker'; 
import { Events } from './../../../../models/enum/events';
import { TranslateService } from '@ngx-translate/core';
import { CadConteudoComponent } from '../cad-conteudo/cad-conteudo.component';
import { Loteria } from './../../../../models/loteria';
import { LoteriaService } from './../../../../services/loteria-services'; 
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
import { ConteudoLoteria } from '@radoccmodels/conteudoloteria'; 

@Component({
  selector: 'app-template-loteria-conteudo',
  templateUrl: './template-loteria.component.html',
  styleUrls: ['./template-loteria.component.scss'],
  providers:[
    ArquivoService,
    MessageService,ConteudoService,LoteriaService, TemplateService
  ]
})
export class TemplateLoteriaComponent extends CadConteudoComponent implements OnInit {

  @ViewChild("panelAgendamento") public panelAgendamento:PanelAgendamentoComponent;

  public form:FormGroup = new FormGroup({
    titulo:new FormControl('', Validators.required),    
    loteria:new FormControl(null, [Validators.required]),
    template:new FormControl(null, [Validators.required]),
    segundos:new FormControl(10),
  }) 
  
  public arquivo:Arquivo;
  public conteudo:Conteudo;
  public conteudoLoteria:ConteudoLoteria;
  public loterias:Loteria[] = [];  
  public templates:Template[] = [];
  public idTipoConteudo:number;
  public clonar:boolean = false;

  constructor(public arquivoService:ArquivoService, public msgService:MessageService, private conteudoService:ConteudoService,
    private loteriaService:LoteriaService, private templateService:TemplateService, public translateService:TranslateService,
    private eventService:EventBrokerService, private route:ActivatedRoute) {
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
    this.conteudoService.findConteudoLoteria(id).subscribe((conteudo)=>{
      this.conteudo = conteudo;
      if (conteudo != null){
        this.form.controls['titulo'].setValue(conteudo.titulo);
        this.form.controls['segundos'].setValue(conteudo.tempoExibicao);
        this.conteudoLoteria = conteudo.conteudoLoteria;
        this.form.controls['template'].setValue(conteudo.template);
        this.form.controls['loteria'].setValue(this.conteudoLoteria.loteria);

        
        this.panelAgendamento.setAgendamento(conteudo.agendamento);
      }
    });
  }
   
  public salvar(){    
    if (this.form.invalid || this.panelAgendamento.validar()==false && this.arquivo != null){
      this.showWarnMsg('EXISTEM_CAMPOS_OBRIGATORIOS');
      return ;
    }
    if (this.conteudo == null || this.clonar){
      this.conteudo = new Conteudo();
      this.conteudoLoteria = new ConteudoLoteria();
    }
    this.conteudo.titulo = this.form.controls['titulo'].value;
    this.conteudo.idTipoConteudo = this.idTipoConteudo;
    let segundos = this.form.controls['segundos'].value;
    this.conteudo.tempoExibicao = segundos;
    this.conteudo.tipo = ETipoConteudo.Loteria;
    this.conteudo.idTemplate = this.form.controls['template'].value.id;
    this.conteudo.template = this.form.controls['template'].value;
    this.conteudoLoteria.idLoteria = this.form.controls['loteria'].value.id;
    this.conteudo.conteudoLoteria = this.conteudoLoteria;
    this.conteudo.idArquivo = null;
    this.conteudo.agendamento = this.panelAgendamento.getAgendamento();
    this.conteudoService.save(this.conteudo).subscribe((conteudo)=>{
      this.conteudo = conteudo;
      this.conteudoLoteria = conteudo.conteudoLoteria;
      this.showSuccessMsg('SALVO_COM_SUCESSO');
      this.eventService.publishEvent(Events.atualizarLista);
      this.panelAgendamento.setAgendamento(conteudo.agendamento);
    }, error=>{
      this.showErrorMsg('FALHA_AO_SALVAR');
      console.log(error);
    })
  }

  public novo(){
    this.form.reset({segundos:10});
    this.conteudo = null;
    this.panelAgendamento.reset();
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
    this.templateService.findNomeETipoConteudoTipo(nome,ETipoConteudo.Loteria).subscribe((lista)=>{
      this.templates = lista;
    })
  }

}
