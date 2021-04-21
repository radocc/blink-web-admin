import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Arquivo } from '@radoccmodels/base/arquivo';
import { Conteudo } from '@radoccmodels/conteudo';
import { ConteudoLoteria } from '@radoccmodels/conteudoloteria';
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
    MessageService,ConteudoService,TemplateCampoService
  ]
})
export class ConteudoDisplayComponent implements OnInit {

  @Input("conteudo") public conteudoResult:ConteudoResult;
  @ViewChild('imageContainer', {static: false}) imageContainer: ElementRef;
  public urlVideo:string;
  public conteudo:Conteudo;
  public arquivo:Arquivo;
  public template:Template;
  public campos:TemplateCampo[] = [];
  public imageHeight = 500;
  public proportion: number = 1;
  public previsaoTempo:PrevisaoTempo;
  public conteudoLoteria:ConteudoLoteria;

  constructor( private msgService:MessageService,private conteudoService:ConteudoService, private templateCampoService:TemplateCampoService) {
    
  }

  ngOnInit(): void {
    
    this.conteudoService.findPreview(this.conteudoResult.id).subscribe((conteudo)=>{
      this.conteudo = conteudo;
      this.arquivo = conteudo.arquivo;
      this.template = conteudo.template;
      this.previsaoTempo = conteudo.previsaoTempo;
      this.conteudoLoteria = conteudo.conteudoLoteria;
      this.montar();
    })
  }

  public montar(){
    this.templateCampoService.getPreviewByConteudoTemplate(this.conteudo.id,this.template.id).subscribe((lista)=>{
      this.campos = lista;      
      
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
              campo.valor = this.previsaoTempo.dataPrevisao;
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
              campo.valor = this.conteudoLoteria.resultado.dataSorteio;
              break;
            case 'codigoSorteio':
              campo.valor = this.conteudoLoteria.resultado.codigoSorteio;
              break;
            case 'numeros':
              campo.valor = this.conteudoLoteria.resultado.numeros;
              break;
            case 'dataProximoSorteio':
              campo.valor = this.conteudoLoteria.resultado.dataProximoSorteio;
              break;
            case 'valorProximoSorteio':
              campo.valor = this.conteudoLoteria.resultado.valorProximoSorteio;
              break;
          }
        }
      });
      setTimeout(() => {
        this.setContainerImageHeight(this.imageContainer.nativeElement);        
        this.campos.forEach((campo) => {          
          console.log('Positicionar', campo.nome, campo.positionTop, campo.positionLeft);
            const drag = document.getElementById(campo.hash);
            const dragContent: any = drag.getElementsByClassName('drag-content').item(0);
            
            // 
            let left = (Math.round(this.imageContainer.nativeElement.clientWidth) * campo.positionLeft) / 100;
            let top = (Math.round(this.imageContainer.nativeElement.clientHeight) * campo.positionTop) / 100;

            dragContent.style.width = campo.width + 'px';
            dragContent.style.height = campo.height + 'px';
            dragContent.style.top = top + 'px';
            dragContent.style.left = left + 'px';
        });
      }, 100);
    })
  }

  //** Seta a altura para manter a proporção 16:9 */
  private setContainerImageHeight(div: HTMLDivElement) {
    // this.imageHeight = div.offsetWidth * 0.5625;
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
