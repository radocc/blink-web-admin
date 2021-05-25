import { TranslateService } from '@ngx-translate/core';
import { CadConteudoComponent } from '../cad-conteudo/cad-conteudo.component';
import { Events } from './../../../../models/enum/events';
import { EventBrokerService } from 'ng-event-broker';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cidade } from '@radoccmodels/base/cidade';
import { Conteudo } from '@radoccmodels/conteudo';
import { ConteudoPrevisao } from '@radoccmodels/conteudoprevisao';
import { ETipoConteudo } from '@radoccmodels/enum/etipoConteudo';
import { Template } from '@radoccmodels/template';
import { ArquivoService } from '@radoccservices/base/arquivo-service';
import { CidadeService } from '@radoccservices/base/cidade-service';
import { ConteudoService } from '@radoccservices/conteudo-services';
import { ConteudoPrevisaoService } from '@radoccservices/conteudoprevisao-services';
import { TemplateService } from '@radoccservices/template-services';
import { MessageService } from 'primeng/api';
import { PanelAgendamentoComponent } from '../panel-agendamento/panel-agendamento.component';

@Component({
  selector: 'app-template-previsaotempo-conteudo',
  templateUrl: './template-previsaotempo.component.html',
  styleUrls: ['./template-previsaotempo.component.scss'],
  providers:[
    ArquivoService,
    MessageService,ConteudoService, ConteudoPrevisaoService,
    CidadeService, TemplateService
  ]
})
export class TemplatePrevisaoTempoComponent extends CadConteudoComponent implements OnInit {

  @ViewChild("panelAgendamento") public panelAgendamento:PanelAgendamentoComponent;

  public form:FormGroup = new FormGroup({
    cidade:new FormControl(null, [Validators.required]),
    template:new FormControl(null, [Validators.required]),
    minutos:new FormControl(null, [Validators.required]),
    segundos:new FormControl(null, [Validators.required]),
  }) 
  
  public cidades:Cidade[] = [];  
  public templates:Template[] = [];
  public previsao:ConteudoPrevisao;
  public conteudo:Conteudo;
  public idTipoConteudo:number;
  public clonar:boolean = false;
  constructor(public msgService:MessageService, private conteudoService:ConteudoService,private conteudoPrevisaoService:ConteudoPrevisaoService,
    private route:ActivatedRoute, private router:Router, private cidadeService:CidadeService, private templateService:TemplateService,
    private eventService:EventBrokerService, public translateService:TranslateService) {
      super(msgService, translateService);
  }

  ngOnInit(): void { 
    
    this.route.params.subscribe((param)=>{
      this.idTipoConteudo = param['idTipoConteudo'];
      this.clonar = param['clonar'] == 'true';
      if (param['id']){
          this.conteudoService.findConteudoPrevisao(param['id']).subscribe((conteudo)=>{
            this.conteudo = conteudo;
            this.previsao = conteudo.conteudoPrevisaoTempo;
            this.form.controls['cidade'].setValue(this.previsao.cidade)
            this.form.controls['template'].setValue(this.conteudo.template);
            let min = (conteudo.tempoExibicao / 60).toFixed(0);
            let segundos = (conteudo.tempoExibicao % 60);
            this.form.controls['minutos'].setValue(min);
            this.form.controls['segundos'].setValue(segundos);
            if (this.conteudo.agendamento != null){
              this.panelAgendamento.setAgendamento(this.conteudo.agendamento);
            }else{
              this.panelAgendamento.reset();
            }
            
          })
          // this.conteudoFonteService.prepare(param['id']).subscribe((lista)=>{
          //   this.conteudoNoticias = lista;
          // });
      }else {
        
      }
    })
    
  }

  public novo(){
    this.form.reset();
    this.conteudo = null;
    this.previsao = null;
  }
  
  
  public salvar(){    
    if (this.form.invalid && !this.panelAgendamento.validar()){
      this.showWarnMsg('EXISTEM_CAMPOS_INVALIDOS');
      return ;
    }
    if (this.conteudo == null || this.clonar){
      this.conteudo = new Conteudo();
      this.previsao = new ConteudoPrevisao();
    }  
    
    this.previsao.idCidade = this.form.controls['cidade'].value.id;
    this.conteudo.titulo = this.form.controls['cidade'].value.nome;
    this.conteudo.conteudoPrevisaoTempo = this.previsao;
    this.conteudo.idTipoConteudo = this.idTipoConteudo;
    let segundos = this.form.controls['segundos'].value;
    segundos += (this.form.controls['minutos'].value * 60);
    this.conteudo.tipo = ETipoConteudo.PrevisaoTempo;
    this.conteudo.tempoExibicao = segundos;
    this.conteudo.idTemplate = this.form.controls['template'].value.id;
    this.conteudo.template = this.form.controls['template'].value;
    this.conteudo.idArquivo = null;  
    this.conteudo.agendamento = this.panelAgendamento.getAgendamento();

    this.conteudoService.salvarPrevisao(this.conteudo).subscribe((conteudo)=>{
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

  public pesquisarCidade(nome:string){
    this.cidadeService.findNome(nome).subscribe((lista)=>{
      this.cidades = lista;
    })
  }

  public pesquisarTemplate(nome:string){
    this.templateService.findNomeETipoConteudo(nome,this.idTipoConteudo).subscribe((lista)=>{
      this.templates = lista;
    })
  }
}
