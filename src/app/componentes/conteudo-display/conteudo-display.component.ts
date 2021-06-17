import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Arquivo } from '@radoccmodels/base/arquivo';
import { Conteudo } from '@radoccmodels/conteudo';
import { ConteudoLoteria } from '@radoccmodels/conteudoloteria';
import { Noticia } from '@radoccmodels/noticia';
import { PrevisaoTempo } from '@radoccmodels/previsaotempo';
import { ConteudoResult } from '@radoccmodels/result/conteudoresult';
import { Template } from '@radoccmodels/template';
import { TemplateCampo } from '@radoccmodels/templatecampo';
import { ConteudoService } from '@radoccservices/conteudo-services';
import { TemplateCampoService } from '@radoccservices/templatecampo-services';
import { MessageService } from 'primeng/api';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-conteudo-display',
  templateUrl: './conteudo-display.component.html',
  styleUrls: ['./conteudo-display.component.scss'],
  providers:[
    MessageService,ConteudoService,TemplateCampoService, DatePipe,CurrencyPipe, DecimalPipe
  ]
})
export class ConteudoDisplayComponent implements OnInit {

  @Input("conteudo") public conteudoResult:ConteudoResult;
  @ViewChild('imageContainer', {static: false}) imageContainer: ElementRef;
  @ViewChild('videoContainer', {static: false}) videoContainer: ElementRef;
  public urlVideo:string;
  public conteudo:Conteudo;
  public arquivo:Arquivo;
  public template:Template;
  public campos:TemplateCampo[] = [];
  public imageHeight = 337;
  public proportion: number = 1;
  public previsaoTempo:PrevisaoTempo;
  public conteudoLoteria:ConteudoLoteria;
  public noticia:Noticia;
  constructor( private msgService:MessageService,private conteudoService:ConteudoService, private templateCampoService:TemplateCampoService,
    private currencyPipe:CurrencyPipe, private datePipe:DatePipe, private decimalPipe:DecimalPipe) {
    
  }

  ngOnInit(): void {
    if (this.conteudoResult.tipo == 4){
      if (this.conteudoResult.noticia != null){
        this.noticia = this.conteudoResult.noticia;
      } 
      let idNoticia = 0;
      if (this.noticia != null){
        idNoticia = this.noticia.id;
      } 
      this.conteudoService.findPreviewNoticia(this.conteudoResult.id,idNoticia).subscribe((conteudo)=>{
        this.conteudo = conteudo;
        this.arquivo = conteudo.arquivo;
        this.noticia = conteudo.noticia;
        if (this.arquivo != null){
          this.conteudoResult.url = this.arquivo.url;
        }        
        this.template = conteudo.template;
        if (this.template != null){
          this.templateCampoService.getPreenchimentoManualByTemplate(this.template.id).subscribe((lista)=>{
            this.campos = lista;
            this.montarCampos();
          })
        }
      })
    }else {
      this.conteudoService.findPreview(this.conteudoResult.id).subscribe((conteudo)=>{
        this.conteudo = conteudo;
        this.arquivo = conteudo.arquivo;
        this.template = conteudo.template;
        this.previsaoTempo = conteudo.previsaoTempo;
        this.conteudoLoteria = conteudo.conteudoLoteria;
        if (this.arquivo != null){
          this.conteudoResult.url = this.arquivo.url;
        }
        if (this.noticia == null){
          this.noticia = conteudo.noticia;
        }
        this.buscarCampos();
      })
    }
    
    
  }

  public buscarCampos(){
    if (this.template == null){
      return;
    }
    this.templateCampoService.getPreviewByConteudoTemplate(this.conteudo.id,this.template.id).subscribe((lista)=>{
      this.campos = lista;      
      this.montarCampos();      
    })
  }

  public montarCampos(){
    this.campos.forEach(campo => {
      campo.hash = uuidv4();
      campo.preenchimento = !campo.cadastro;
      if (this.previsaoTempo != null){
        let vetorPrevisao = JSON.parse(this.previsaoTempo.jsonDatas);
        switch (campo.variavel){
          case 'cidade':
            campo.valor = this.previsaoTempo.cidade.nome;
            break;
          case 'data':
            let data = new Date(vetorPrevisao[campo.indice].data);
            if (campo.valorFormato != null && campo.valorFormato != ''){              
              campo.valor = this.datePipe.transform(data,campo.valorFormato);
            }else{
              campo.valor = this.datePipe.transform(data,'dd/MM/yyyy');
            }
            break;
          case 'descricao':
              campo.valor = vetorPrevisao[campo.indice].descricao;
              break;
          case 'tempo':
            campo.valor = vetorPrevisao[campo.indice].tempo;
              break;
          case 'maxima':
            campo.valor = vetorPrevisao[campo.indice].maxima;
            break;
          case 'minima':
            campo.valor = vetorPrevisao[campo.indice].minima;
            break;
          case 'iuv':
            campo.valor = vetorPrevisao[campo.indice].iuv;
            break;
          case 'url':
            campo.valor = vetorPrevisao[campo.indice].url;
            break;
        }
      }else if (this.conteudoLoteria != null){
        switch (campo.variavel){
          case 'dataSorteio':
            if (campo.valorFormato !=  null && campo.valorFormato != ''){
              campo.valor = this.datePipe.transform(this.conteudoLoteria.resultado.dataSorteio,campo.valorFormato);
            }else {
              campo.valor = this.datePipe.transform(this.conteudoLoteria.resultado.dataSorteio,'dd/MM/yyyy');
            }
            break;
          case 'codigoSorteio':
            campo.valor = this.conteudoLoteria.resultado.codigoSorteio;
            break;
          case 'numeros':
            campo.valor = this.conteudoLoteria.resultado.numeros;
            break;
          case 'numeros2':
              campo.valor = this.conteudoLoteria.resultado.numeros2;
              break;
          case 'dataProximoSorteio':
            if (campo.valorFormato != null){
              campo.valor = this.datePipe.transform(this.conteudoLoteria.resultado.dataProximoSorteio,campo.valorFormato);
            }else{
              campo.valor = this.datePipe.transform(this.conteudoLoteria.resultado.dataProximoSorteio,'dd/MM/yyyy');
            }
            break;
          case 'valorProximoSorteio':
            campo.valor = this.currencyPipe.transform(this.conteudoLoteria.resultado.valorProximoSorteio,'BRL');
            break;
        }
      }else if (this.noticia != null){
          switch (campo.variavel){
            case 'titulo':
              campo.valor = this.noticia.titulo;
              break;  
            case 'descricao':
              campo.valor = this.noticia.descricao;
              break;
            case 'link':
              campo.valor = this.noticia.link;
            case 'url':
              campo.valor = this.noticia.url;
              break;
            case 'datapublicacao':
              if (campo.valorFormato != null && campo.valorFormato != ''){
                campo.valor = this.datePipe.transform(this.noticia.dataPublicado,campo.valorFormato);
              }else{
                campo.valor = this.datePipe.transform(this.noticia.dataPublicado,'dd/MM/yyyy');
              }
              break;
        }
      }else if (campo.tipo == 3){        
        campo.valor = this.decimalPipe.transform(campo.valor);
      }else if (campo.tipo == 5){
        if (campo.valorFormato != null && campo.valorFormato != ''){
          campo.valor = this.datePipe.transform(campo.valor,campo.valorFormato);
        }else{
          campo.valor = this.datePipe.transform(campo.valor,'dd/MM/yyyy');
        }
      }else if (campo.tipo == 8){
        campo.valor = this.currencyPipe.transform(campo.valor,'BRL');
      }
    });
    setTimeout(() => {
      this.setContainerImageHeight(this.imageContainer.nativeElement);        
      if (this.videoContainer){
        this.videoContainer.nativeElement.clientHeight = this.imageContainer.nativeElement.clientHeight;
      }
      this.campos.forEach((campo) => {          
        console.log('Positicionar', campo.nome, campo.positionTop, campo.positionLeft);
          const drag = document.getElementById(campo.hash);
          const dragContent: any = drag.getElementsByClassName('drag-content').item(0);
          
          // 
          let left = (Math.round(this.imageContainer.nativeElement.clientWidth) * campo.positionLeft) / 100;
          let top = (Math.round(this.imageContainer.nativeElement.clientHeight) * campo.positionTop) / 100;
          campo.width = (Math.round(this.imageContainer.nativeElement.clientWidth) * campo.width) / 100;
          campo.height = (Math.round(this.imageContainer.nativeElement.clientHeight) * campo.height) / 100;

          dragContent.style.width = campo.width + 'px';
          dragContent.style.height = campo.height + 'px';
          dragContent.style.top = top + 'px';
          dragContent.style.left = left + 'px';
      });
    }, 100);
  }

  //** Seta a altura para manter a proporção 16:9 */
  private setContainerImageHeight(div: HTMLDivElement) {
    this.imageHeight = div.offsetWidth * 0.5625;
    // div.style.setProperty('height', this.imageHeight + 'px');
    if (this.arquivo != null) {
      this.proportion = this.arquivo.height / this.imageHeight;  
      for (let i = 0; i < this.campos.length; i++) {
        this.setDistancia(this.campos[i]);
      }
    }    
  }

  public setDistancia(campo: TemplateCampo) {
    campo.drag = {x: (campo.positionLeft * (this.arquivo.width / this.proportion)) / 100, y: (campo.positionTop * this.imageHeight) / 100};
  }

}
