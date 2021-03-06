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
import { MessageService } from 'primeng/api';
import { PanelAgendamentoComponent } from '../panel-agendamento/panel-agendamento.component';

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
export class TemplateNoticiaComponent implements OnInit {

  public form:FormGroup = new FormGroup({
    filtroAssuntos:new FormControl('')
  }) 
  
  public conteudoNoticias:ConteudoFonteNoticia[] = [];
  public editorias:ConteudoFonteNoticia[] = [];
  public filtro:ConteudoFiltro;
  public conteudo:Conteudo;

  constructor(private msgService:MessageService, private conteudoService:ConteudoService, private fonteService:FonteNoticiaService,
    private editoriaService:NoticiaEditoriaService, private conteudoFonteService:ConteudoFonteNoticiaService,
    private route:ActivatedRoute, private router:Router) {

  }

  ngOnInit(): void { 
    this.route.params.subscribe((param)=>{
      if (param['id']){
          this.conteudoService.findConteudoNoticia(param['id']).subscribe((conteudo)=>{
            this.conteudo = conteudo;
            if (conteudo.filtro != null){
              this.filtro = conteudo.filtro;
              this.form.controls['filtroAssuntos'].setValue(conteudo.filtro.assuntos);
            }
            if (conteudo.fontes != null){
              this.conteudoNoticias = conteudo.fontes;
            }
          })
          // this.conteudoFonteService.prepare(param['id']).subscribe((lista)=>{
          //   this.conteudoNoticias = lista;
          // });
      }else {
        this.conteudoFonteService.prepare(0).subscribe((lista)=>{
          this.conteudoNoticias = lista;
        });
      }
    })
    
  }

  
  
  public salvar(){    
    if (this.form.invalid ){
      this.msgService.add({
        severity:'error', summary:'Campos inválidos', detail:'Verifique os campos com asterisco vermelho'
      })
      return ;
    }
    if (this.conteudo == null){
      this.conteudo = new Conteudo();
    }
    let titulos = [];
    let fontes = [];
    for (let w = 0; w < this.conteudoNoticias.length;w++){
      if (this.conteudoNoticias[w].editoriasSelecionado != null && this.conteudoNoticias[w].editoriasSelecionado.length > 0){
        titulos.push(this.conteudoNoticias[w].fonte.nome);
        let ids = [];
        for (let x = 0; x < this.conteudoNoticias[w].editoriasSelecionado.length;x++){
            ids.push(this.conteudoNoticias[w].editoriasSelecionado[x].id);
        }
        this.conteudoNoticias[w].idsEditorias = ids.join(',');
        this.conteudoNoticias[w].idFonteNoticia = this.conteudoNoticias[w].fonte.id;
        fontes.push(this.conteudoNoticias[w]);
      }      
    }
    this.conteudo.titulo = titulos.join(',');
    this.conteudo.idTipoConteudo = ETipoConteudo.Noticias;
    this.conteudo.tempoExibicao = 0;
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
      // this.panelAgendamento.setAgendamento(conteudo.agendamento);
    }, error=>{
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
