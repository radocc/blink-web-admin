import { Events } from './../../../../../models/enum/events';
import { EventBrokerService } from 'ng-event-broker';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { PageCadastroComponent } from '@radocccomponentes/pagecadastro/pagecadastro.component';
import { ETipoConteudo } from '@radoccmodels/enum/etipoConteudo';
import { FonteNoticia } from '@radoccmodels/fontenoticia';
import { NoticiaEditoria } from '@radoccmodels/noticiaeditoria';
import { Template } from '@radoccmodels/template';
import { TipoConteudo } from '@radoccmodels/tipoconteudo';
import { FonteNoticiaService } from '@radoccservices/fontenoticia-services';
import { TemplateService } from '@radoccservices/template-services';
import { TipoConteudoService } from '@radoccservices/tipoconteudo-services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-fontenoticia-cadastro',
  templateUrl: './fontenoticia-cadastro.component.html',
  styleUrls: ['./fontenoticia-cadastro.component.scss'],
  providers:[ 
    MessageService,FonteNoticiaService, TemplateService
  ]
})
export class FonteNoticiaCadastroComponent implements OnInit {
  public config:{
    titulo:string,
    subTitle:string,
    btnSalvar:string;
  }={
    titulo:'FONTE_DE_NOTICIA',
    subTitle:'',
    btnSalvar:'SALVAR'
  }
  @ViewChild("pageCadastro") public pageCadastro:PageCadastroComponent
  public form:FormGroup = new FormGroup({
    nome:new FormControl('', Validators.required),
    url:new FormControl('', Validators.required),
    template:new FormControl('', Validators.required)
  }) 
  public formEditoria = new FormGroup({
    nome:new FormControl('', Validators.required),
    url:new FormControl('', Validators.required)
  }) 
  public templates:Template[] = []
  
  public fonteNoticia:FonteNoticia;
  public editorias:NoticiaEditoria[] = [];
  public editoria:NoticiaEditoria;

  constructor(private msgService:MessageService, private fonteNoticiaService:FonteNoticiaService, private templateService:TemplateService,
    private eventService:EventBrokerService) {

  }

  ngOnInit(): void { 

  } 

  public pesquisarTemplate(nome){
    this.templateService.findNomeETipo(nome,ETipoConteudo.Noticias).subscribe((lista)=>{
      this.templates = lista;
    })
  }
  
  public salvar(event){    
    if (this.form.invalid){
      this.pageCadastro.showWarnMsg('EXISTEM_CAMPOS_INVALIDOS');
      return ;
    }
    if (this.fonteNoticia == null){
      this.fonteNoticia = new FonteNoticia();
    }
    this.fonteNoticia.nome = this.form.controls['nome'].value;
    this.fonteNoticia.url = this.form.controls['url'].value;
    this.fonteNoticia.template = this.form.controls['template'].value;
    this.fonteNoticia.editorias = this.editorias;
    this.fonteNoticiaService.save(this.fonteNoticia).subscribe((fonteNoticia)=>{
      this.fonteNoticia = fonteNoticia;
      this.pageCadastro.showSuccessMsg('SALVO_COM_SUCESSO');
      this.eventService.publishEvent(Events.atualizarLista);
    }, error=>{
      this.pageCadastro.showErrorMsg('FALHA_AO_SALVAR');
      console.log(error);
    })
  }
 
  public adicionar(event){
    if (this.formEditoria.invalid){

      return;
    }
    let editando = true;
    if (this.editoria == null){
      this.editoria = new NoticiaEditoria();
      editando = false;
    }
    this.editoria.nome = this.formEditoria.controls['nome'].value;
    this.editoria.url = this.formEditoria.controls['url'].value;
    if (editando){
      let index = this.editorias.indexOf(this.editoria);
      this.editorias.splice(index,1,this.editoria);
    }else{
      this.editorias.push(this.editoria);
    }
    this.editoria = null;
    this.formEditoria.reset();
  }

  public alterarEditoria(editoria){
    this.editoria = editoria;
    this.formEditoria.controls['nome'].setValue(editoria.nome);
    this.formEditoria.controls['url'].setValue(editoria.url);

  }

  public excluirEditoria(editoria){
    let index = this.editorias.indexOf(editoria);
    this.editorias.splice(index,1);
  }

}
