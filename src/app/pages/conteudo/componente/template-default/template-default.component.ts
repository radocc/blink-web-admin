import { ActivatedRoute } from '@angular/router';
import { ConteudoLoteria } from '../../../../models/conteudoloteria';
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

@Component({
  selector: 'app-template-default-conteudo',
  templateUrl: './template-default.component.html',
  styleUrls: ['./template-default.component.scss'],
  providers:[
    ArquivoService,
    MessageService,ConteudoService,LoteriaService, TemplateService
  ]
})
export class TemplateDefaultComponent extends CadConteudoComponent implements OnInit {

  @ViewChild("panelAgendamento") public panelAgendamento:PanelAgendamentoComponent;

  public form:FormGroup = new FormGroup({
    titulo:new FormControl('', Validators.required),    
    template:new FormControl(null, [Validators.required]),
    minutos:new FormControl(1),
    segundos:new FormControl(30),
  }) 
  public conteudo:Conteudo;
  public templates:Template[] = [];
  public tipoConteudo:ETipoConteudo = ETipoConteudo.Receitas;
  public titulo:string= 'CADASTRO';
  constructor(public arquivoService:ArquivoService, public msgService:MessageService, private conteudoService:ConteudoService,
    private templateService:TemplateService, public translateService:TranslateService,
    private eventService:EventBrokerService, private route:ActivatedRoute) {
      super(msgService, translateService);
  }

  ngOnInit(): void { 
    this.route.params.subscribe((param)=>{
      if (param['id']){
          this.buscar(param['id']);
      }
      if (param['tipo']){
        this.tipoConteudo = parseInt(param['tipo']);
        switch(this.tipoConteudo){
          case ETipoConteudo.TemplatesCorporativos:
            this.titulo = 'CADASTRO_TEMPLATES_CORPORATIVOS'
            break;
          case ETipoConteudo.Curiosidades:
            this.titulo = 'CADASTRO_DE_CURIOSIDADES'
            break;
          case ETipoConteudo.Saude:
            this.titulo = 'CADASTRO_DE_SAUDE'
            break;
          case ETipoConteudo.Receitas:
            this.titulo = 'CADASTRO_DE_RECEITAS'
            break;
          case ETipoConteudo.Agenda:
            this.titulo = 'CADASTRO_DE_AGENDA'
            break;
          case ETipoConteudo.Turismo:
            this.titulo = 'CADASTRO_DE_TURISMO'
            break;
        }
      }
    })
  }

  public buscar(id:number){
    this.conteudoService.findById(id).subscribe((conteudo)=>{
      this.conteudo = conteudo;
      if (conteudo != null){
        this.form.controls['titulo'].setValue(conteudo.titulo);
        let min = (conteudo.tempoExibicao / 60).toFixed(0);
        let segundos = (conteudo.tempoExibicao % 60);
        this.form.controls['minutos'].setValue(min);
        this.form.controls['segundos'].setValue(segundos);
        this.form.controls['template'].setValue(conteudo.template);
        this.panelAgendamento.setAgendamento(conteudo.agendamento);
      }
    });
  }
   
  public salvar(){    
    if (this.form.invalid || this.panelAgendamento.validar()==false){
      this.showWarnMsg('EXISTEM_CAMPOS_OBRIGATORIOS');
      return ;
    }
    if (this.conteudo == null){
      this.conteudo = new Conteudo();
    }
    this.conteudo.titulo = this.form.controls['titulo'].value;
    this.conteudo.idTipoConteudo = this.tipoConteudo;
    let segundos = this.form.controls['segundos'].value;
    segundos += (this.form.controls['minutos'].value * 60);
    this.conteudo.tempoExibicao = segundos;
    this.conteudo.idTemplate = this.form.controls['template'].value.id;
    this.conteudo.template = this.form.controls['template'].value;

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
  }

  public publicar(){

  }

  public preview(){

  }

  public importar(){

  } 

  public pesquisarTemplate(nome:string){
    this.templateService.findNomeETipo(nome,this.tipoConteudo).subscribe((lista)=>{
      this.templates = lista;
    })
  }

}
