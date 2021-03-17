import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConteudoResult } from '@radoccmodels/result/conteudoresult';

@Component({
  selector: 'app-conteudo-row',
  templateUrl: './conteudo-row.component.html',
  styleUrls: ['./conteudo-row.component.scss']
})
export class ConteudoRowComponent implements OnInit {

  @Input("conteudo") public conteudo:ConteudoResult;
  @Input("exibiBtnAlterar") public exibiBtnAlterar:boolean = true;
  @Input("exibiBtnExcluir") public exibiBtnExcluir:boolean = true;
  @Input("exibiBtnVisualizar") public exibiBtnVisualizar:boolean = true;
  @Input("exibiBtnArquivo") public exibiBtnArquivo:boolean = true;
  @Output("onAlterar") public btnAlterar: EventEmitter<any> = new EventEmitter();
  @Output("onExcluir") public btnExcluir: EventEmitter<any> = new EventEmitter();
  @Output("onVisualizar") public btnVisualizar: EventEmitter<any> = new EventEmitter();
  @Output("onAbrirArquivo") public btnAbrirArquivo: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public alterarConteudo(conteudo){ 
    if (this.btnAlterar){
      this.btnAlterar.emit(conteudo);
    } 
  }

  public excluirConteudo(conteudo){
    if (this.btnExcluir){
      this.btnExcluir.emit(conteudo);
    } 
  }

  public visualizarConteudo(conteudo){
    if (this.btnVisualizar){
      this.btnVisualizar.emit(conteudo);
    }
  }

  public arquivoConteudo(conteudo){
    if (this.btnAbrirArquivo){
      this.btnAbrirArquivo.emit(conteudo);
    }
  }

}
