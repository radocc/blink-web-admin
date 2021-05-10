import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConteudoDisplayDialogComponent } from '@radocccomponentes/conteudo-display-dialog/conteudo-display-dialog.component';
import { ConteudoResult } from '@radoccmodels/result/conteudoresult';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-conteudo-row',
  templateUrl: './conteudo-row.component.html',
  styleUrls: ['./conteudo-row.component.scss'],
  providers:[
    DialogService
  ]
})
export class ConteudoRowComponent implements OnInit {

  @Input("conteudo") public conteudo:ConteudoResult;
  @Input("exibiBtnAlterar") public exibiBtnAlterar:boolean = true;
  @Input("exibiBtnExcluir") public exibiBtnExcluir:boolean = true;
  @Input("exibiBtnVisualizar") public exibiBtnVisualizar:boolean = true;
  @Input("exibiBtnClonar") public exibiBtnClonar:boolean = true;
  @Output("onAlterar") public btnAlterar: EventEmitter<any> = new EventEmitter();
  @Output("onExcluir") public btnExcluir: EventEmitter<any> = new EventEmitter();
  @Output("onVisualizar") public btnVisualizar: EventEmitter<any> = new EventEmitter();
  @Output("onClonar") public btnClonar: EventEmitter<any> = new EventEmitter();
  
  constructor(public dialogService:DialogService) { }

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
    // if (this.btnVisualizar){
    //   this.btnVisualizar.emit(conteudo);
    // }
    const dialog = this.dialogService.open(ConteudoDisplayDialogComponent, {
      // width: '60%',
      // height:'80%',
      data:this.conteudo,
      modal:true,
      showHeader:true,
      closable:true,
      header:this.conteudo.titulo,
      closeOnEscape:true
    });
    dialog.onClose.subscribe((playlist)=>{
      
    }); 
  }

  public clonarConteudo(conteudo){
    if (this.btnClonar){
      this.btnClonar.emit(conteudo);
    }
  }

  public vincularConteudo(){

  }

}
