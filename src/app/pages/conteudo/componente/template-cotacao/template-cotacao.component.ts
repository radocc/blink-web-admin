import { EventBrokerService } from 'ng-event-broker';
import { Events } from './../../../../models/enum/events';
import { TranslateService } from '@ngx-translate/core';
import { CadConteudoComponent } from '../cad-conteudo/cad-conteudo.component';
import { ETipoConteudo } from '@radoccmodels/enum/etipoConteudo';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Arquivo } from '@radoccmodels/base/arquivo';
import { Conteudo } from '@radoccmodels/conteudo';
import { ArquivoService } from '@radoccservices/base/arquivo-service';
import { ConteudoService } from '@radoccservices/conteudo-services';
import { MessageService } from 'primeng/api';
import { PanelAgendamentoComponent } from '../panel-agendamento/panel-agendamento.component';
import { Template } from '@radoccmodels/template';
import { TemplateService } from '@radoccservices/template-services';
import { TemplateCampoService } from '@radoccservices/templatecampo-services';
import { ConteudoCampo } from '@radoccmodels/conteudocampo';
import { ConteudoCampoService } from '@radoccservices/conteudocampo-services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-template-cotacao-conteudo',
  templateUrl: './template-cotacao.component.html',
  styleUrls: ['./template-cotacao.component.scss'],
  providers:[
    ArquivoService,
    MessageService,ConteudoService, TemplateService, TemplateCampoService, ConteudoCampoService
  ]
})
export class TemplateCotacaoComponent extends CadConteudoComponent implements OnInit {

  @ViewChild("panelAgendamento") public panelAgendamento:PanelAgendamentoComponent;

  public form:FormGroup = new FormGroup({
    titulo:new FormControl('', Validators.required),    
    minutos:new FormControl(),
    segundos:new FormControl(),
    template:new FormControl()
  }) 
  
  public arquivo:Arquivo;
  public conteudo:Conteudo;
  public templates:Template[] = [];
  public campos:ConteudoCampo[] = [];
  constructor(public arquivoService:ArquivoService, public msgService:MessageService, private conteudoService:ConteudoService,
    public translateService:TranslateService, private eventService:EventBrokerService,private templateService:TemplateService,
    private route:ActivatedRoute,private conteudoCampoService:ConteudoCampoService, private templateCampoService:TemplateCampoService) {
    super(msgService, translateService);
  }

  ngOnInit(): void { 
    this.form.controls['template'].valueChanges.subscribe((template)=>{
      if (template != null){
        this.buscarCampos(template)
      }      
    })
    this.route.params.subscribe((param)=>{
      if (param['id']){
          this.buscar(param['id']);
      }
    })
  }

  public buscar(id:number){
    this.conteudoService.findConteudoCotacao(id).subscribe((conteudo)=>{
      this.conteudo = conteudo;
      if (conteudo != null){
        this.form.controls['titulo'].setValue(conteudo.titulo);
        let min = (conteudo.tempoExibicao / 60).toFixed(0);
        let segundos = (conteudo.tempoExibicao % 60);
        this.form.controls['minutos'].setValue(min);
        this.form.controls['segundos'].setValue(segundos);
        this.form.controls['template'].setValue(conteudo.template);
        this.campos = conteudo.campos;
        this.panelAgendamento.setAgendamento(conteudo.agendamento);
      }
    });
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
    // this.templateCampoService.getPreenchimentoManualByTemplate(template.id).subscribe((lista)=>{
    //   this.campos = [];
    //   if (lista.length > 0){
    //     for (let w = 0; w < lista.length;w++){
    //       let camp = new ConteudoCampo();
    //       camp.nome = lista[w].nome;
    //       camp.tipo = lista[w].tipo;
    //       camp.idTemplateCampo = lista[w].id;
    //       camp.valor = '';
    //       this.campos.push(camp);
    //     }
    //   }      
    // })
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
    this.conteudo.idTemplate = this.form.controls['template'].value.id;
    this.conteudo.template = this.form.controls['template'].value;
    this.conteudo.agendamento = this.panelAgendamento.getAgendamento();
    this.conteudo.campos = this.campos;
    this.conteudoService.save(this.conteudo).subscribe((conteudo)=>{
      this.conteudo = conteudo;
      this.campos = conteudo.campos;
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

  public pesquisarTemplate(nome:string){
    this.templateService.findNomeETipo(nome,ETipoConteudo.Cotacao).subscribe((lista)=>{
      this.templates = lista;
    })
  }

}
