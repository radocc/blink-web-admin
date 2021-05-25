import { Events } from './../../../../models/enum/events';
import { EventBrokerService } from 'ng-event-broker';
import { TranslateService } from '@ngx-translate/core';
import { CadConteudoComponent } from '../cad-conteudo/cad-conteudo.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Arquivo } from '@radoccmodels/base/arquivo';
import { Conteudo } from '@radoccmodels/conteudo';
import { ConteudoFiltro } from '@radoccmodels/conteudofiltro';
import { ConteudoFonteNoticia } from '@radoccmodels/conteudofontenoticia';
import { ETipoConteudo } from '@radoccmodels/enum/etipoConteudo';
import { FonteNoticia } from '@radoccmodels/fontenoticia';
import { NoticiaEditoria } from '@radoccmodels/noticiaeditoria';
import { ArquivoService } from '@radoccservices/base/arquivo-service';
import { ConteudoService } from '@radoccservices/conteudo-services';
import { ConteudoFonteNoticiaService } from '@radoccservices/conteudofontenoticia-services';
import { FonteNoticiaService } from '@radoccservices/fontenoticia-services';
import { NoticiaEditoriaService } from '@radoccservices/noticiaeditoria-services';
import { MessageService, TreeNode } from 'primeng/api';
import { PanelAgendamentoComponent } from '../panel-agendamento/panel-agendamento.component';
import { eventNames } from 'process';
import { Tree } from 'primeng/tree';

@Component({
  selector: 'app-template-noticia-conteudo',
  templateUrl: './template-noticia.component.html',
  styleUrls: ['./template-noticia.component.scss'],
  providers:[
    ArquivoService,
    MessageService,ConteudoService,FonteNoticiaService, NoticiaEditoriaService,
    ConteudoFonteNoticiaService
  ]
})
export class TemplateNoticiaComponent extends CadConteudoComponent implements OnInit {

  public form:FormGroup = new FormGroup({
    filtroAssuntos:new FormControl(''),
    minutos:new FormControl(0),
    segundos:new FormControl(30)
  }) 
  public fontes: TreeNode[];
  public selectedFontes:TreeNode[];
  public conteudoNoticias:ConteudoFonteNoticia[] = [];
  public editorias:ConteudoFonteNoticia[] = [];
  public filtro:ConteudoFiltro;
  public conteudo:Conteudo;
  public idTipoConteudo:number;
  public clonar:boolean = false;

  constructor(public msgService:MessageService, private conteudoService:ConteudoService, private fonteService:FonteNoticiaService,
    private editoriaService:NoticiaEditoriaService, private conteudoFonteService:ConteudoFonteNoticiaService, public translateService:TranslateService,
    private route:ActivatedRoute, private router:Router, private eventService:EventBrokerService) {
      super(msgService, translateService);
  }

  ngOnInit(): void { 
    this.route.params.subscribe((param)=>{
      this.idTipoConteudo = param['idTipoConteudo'];
      this.clonar = param['clonar'] == 'true';
      if (param['id']){
          this.conteudoService.findConteudoNoticia(param['id']).subscribe((conteudo)=>{
            this.conteudo = conteudo;
            if (conteudo.filtro != null){
              this.filtro = conteudo.filtro;
              this.form.controls['filtroAssuntos'].setValue(conteudo.filtro.assuntos);
            }
            let min = (conteudo.tempoExibicao / 60).toFixed(0);
            let segundos = (conteudo.tempoExibicao % 60);
            this.form.controls['minutos'].setValue(min);
            this.form.controls['segundos'].setValue(segundos);
            if (conteudo.fontes != null){
              this.conteudoNoticias = conteudo.fontes;
              this.montarTree();
            }
          }) 
      }else {
        this.conteudoFonteService.prepare(0).subscribe((lista)=>{
          this.conteudoNoticias = lista;
          this.montarTree(); 
        });
      }
    })
    
  }

  public montarTree(){
    this.fontes = [];
    for (let w = 0; w < this.conteudoNoticias.length;w++){
      let fonte = this.conteudoNoticias[w].fonte;
      let treFonte:TreeNode = {
        label:fonte.nome,
        data:fonte.id,
        leaf:true,
        children:[]
      };
      for (let x = 0; x < fonte.editorias.length;x++){
        let editoria = fonte.editorias[x];
        treFonte.children.push({
          label:editoria.nome,
          data:editoria.id,
          leaf:true
        })
        // for (let x = 0; x < this.conteudoNoticias[w].editoriasSelecionado.length;x++){
        //   let editoria = this.conteudoNoticias[w].editoriasSelecionado[x];
        //   for (let y = 0; y < treFonte.children.length;y++){
        //     if (treFonte.children[y].data == editoria.id){

        //     }
        //   }
            
        // }
      }
      this.fontes.push(treFonte);
    }
    this.selectedFontes = [];
    for (let w = 0; w < this.conteudoNoticias.length;w++){
      let fonte = this.conteudoNoticias[w].fonte;
      for ( let i = 0;i < this.fontes.length;i++){
        if (fonte.id == this.fontes[i].data){
          let treFonte:TreeNode = this.fontes[i];

          for (let x = 0; x < this.conteudoNoticias[w].editoriasSelecionado.length;x++){
            let achou = false;
            
            for (let n = 0; n < treFonte.children.length;n++){
              if (treFonte.children[n].data == this.conteudoNoticias[w].editoriasSelecionado[x].id){
                treFonte.partialSelected = true;
                treFonte.selectable = true;
                treFonte.parent = treFonte;
                treFonte.expanded = true;
                // treFonte.children.push(treFonte.children[n]);
                this.selectedFontes.push(treFonte.children[n]);
              }
            }
          }
        }
        

      }      
    }
    // this.selectedFontes = this.fontes;
  }

  public novo(){
    this.form.reset({minutos:0,segundos:15});
    this.conteudo = null;
    for (let w = 0;w < this.conteudoNoticias.length;w++){
      this.conteudoNoticias[w].editoriasSelecionado = [];
    }
  }
  
  public salvar(){    
    if (this.form.invalid ){
      this.showWarnMsg('EXISTEM_CAMPOS_INVALIDOS');
      return ;
    }
    if (this.conteudo == null){
      this.conteudo = new Conteudo();
    }
    let titulos = [];
    let fontes = [];
    for (let i = 0; i < this.selectedFontes.length;i++){
      let fonte:TreeNode = this.selectedFontes[i];
      for (let w = 0; w < this.conteudoNoticias.length;w++){
        if (fonte.data == this.conteudoNoticias[w].fonte.id){
          
          let ids = [];
          for (let x = 0; x < fonte.children.length;x++){
              ids.push(fonte.children[x].data);
          }
          if (ids.length > 0){
            titulos.push(fonte.label);
            this.conteudoNoticias[w].idsEditorias =  ids.join(',');
            fontes.push(this.conteudoNoticias[w]);
          }
        }
      }  
    }
     
    this.conteudo.titulo = titulos.join(',');
    this.conteudo.idTipoConteudo = this.idTipoConteudo;
    let segundos = this.form.controls['segundos'].value;
    segundos += (this.form.controls['minutos'].value * 60);
    this.conteudo.tipo = ETipoConteudo.Noticias;    
    this.conteudo.tempoExibicao = segundos;
    this.conteudo.idTemplate = null;
    this.conteudo.idArquivo = null;
    this.conteudo.fontes = fontes;
    if (this.form.controls['filtroAssuntos'].value != null){
      if (this.filtro == null){
        this.filtro = new ConteudoFiltro();
      }
      this.filtro.assuntos = this.form.controls['filtroAssuntos'].value;
      this.conteudo.filtro = this.filtro;
    }else {
      this.conteudo.filtro = null;
    }
    
    this.conteudoService.salvarNoticia(this.conteudo).subscribe((conteudo)=>{
      this.conteudo = conteudo;
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

  nodeSelect(event) {
    //event.node = selected node
    console.log(event);
  }

  nodeUnselect(event) {
    //event.node = selected node
    console.log(event);
  }

}
