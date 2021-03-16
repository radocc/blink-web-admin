import { OnDestroy, EventEmitter } from '@angular/core';
import { Events } from './../../../models/enum/events';
import { EventBrokerService } from 'ng-event-broker';
import { Loteria } from './../../../models/loteria';
import { ETipoConteudo } from './../../../models/enum/etipoConteudo';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Conteudo } from '@radoccmodels/conteudo';
import { ConteudoResult } from '@radoccmodels/result/conteudoresult';
import { TipoConteudo } from '@radoccmodels/tipoconteudo';
import { ConteudoService } from '@radoccservices/conteudo-services';
import { TipoConteudoService } from '@radoccservices/tipoconteudo-services';

@Component({
  selector: 'app-panel-conteudo',
  templateUrl: './panel-conteudo.component.html',
  styleUrls: ['./panel-conteudo.component.scss'],
  providers:[
    TipoConteudoService, ConteudoService
  ]
})
export class PanelConteudoComponent implements OnInit, OnDestroy {

  public nomeBusca:string = "";
  public tiposConteudos: TipoConteudo[] = [ ]
  public conteudos:ConteudoResult[] = [];
  public tipoConteudo:TipoConteudo= null;
  public eventLista = null;

  constructor(private router:Router, private tipoConteudoService:TipoConteudoService, private conteudoService:ConteudoService,
    private eventService:EventBrokerService) { }

  ngOnInit(): void {
    this.buscarTipos();
    this.eventLista = this.eventService.subscribeEvent(Events.atualizarLista).subscribe((value)=>{
      this.filtrarTipo(this.tipoConteudo);
    })
  }

  public ngOnDestroy(){
    this.eventLista.unsubscribe();
  }

  public buscarTipos(){
    this.tipoConteudoService.findAll().subscribe( (lista) =>{
      this.tiposConteudos = lista;
    })
  }

  public filtrarTipo(tipo:TipoConteudo){
    this.tipoConteudo = tipo;
    let url = this.getUrl(tipo);
    // this.conteudoService.
    this.router.navigate([url]);
    this.conteudoService.filtrarTipo(tipo.id,this.nomeBusca).subscribe((lista)=>{
      this.conteudos = lista;
    })
  }

  public getUrl(tipo:TipoConteudo){
    let url = 'admin/conteudo/panel/';
    switch (tipo.id){
      case ETipoConteudo.Video:
        url += 'video';
        break;
      case ETipoConteudo.Imagens:
        url += 'imagem';
        break;
      case ETipoConteudo.Noticias:
        url += 'noticia';
        break;
      case ETipoConteudo.Cotacao:
        url += 'cotacao';
        break;
      case ETipoConteudo.PrevisaoTempo:
        url += 'previsaotempo';
        break;
      case ETipoConteudo.Loteria:
        url += 'loteria';
        break;
      case ETipoConteudo.TemplatesCorporativos:
        url += 'template-corporativo';
        break;
      case ETipoConteudo.Curiosidades:
        url += 'curiosidade';
        break;
      case ETipoConteudo.Saude:
        url += 'saude';
        break;
      case ETipoConteudo.Receitas:
        url += 'receita';
        break;
      case ETipoConteudo.Agenda:
        url += 'agenda';
        break;
      case ETipoConteudo.Turismo:
        url += 'turismo';
        break;
    }
    return url;
  }

  public alterarConteudo(conteudo){
    let url = this.getUrl(this.tipoConteudo)+"/"+conteudo.id;
    this.router.navigate([url]);
  }

  public excluirConteudo(conteudo){
    this.conteudoService.remove(conteudo.id).subscribe((res)=>{
      let index = this.conteudos.indexOf(conteudo);
      if (index > -1){
        this.conteudos.splice(index,1);
      }
    })
  }

  public visualizarConteudo(conteudo){
    
  }

  public arquivoConteudo(conteudo){
    
  }

}
