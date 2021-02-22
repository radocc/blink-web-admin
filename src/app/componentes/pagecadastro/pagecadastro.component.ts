import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pagecadastro',
  templateUrl: './pagecadastro.component.html',
  styleUrls: ['./pagecadastro.component.scss'],
  providers: [MessageService]
})
export class PageCadastroComponent implements OnInit {

  @Input("config") public config:{
    titulo:string,
    subTitle:string,
    btnSalvar:string;
  }={
    titulo:'Unidade',
    subTitle:'',
    btnSalvar:'SALVAR'
  }
  @Input('form') public form:FormBuilder;
  @Input() translateParams: any[];
  @Input() mostraVoltar: boolean = true;
  @Output("save") onSave:EventEmitter<any> = new EventEmitter();

  constructor(private location:Location, private msgService: MessageService) { }

  ngOnInit(): void {
  }

  public validarForm():boolean{

    return true;
  }

  

  public salvar(){
    this.onSave.emit(this.form);
  }

  public cancelar(){
    this.location.back();    
  }

  public voltar() {
    this.location.back();
  }

  public showSuccessMsg(msg: string) {
    this.msgService.add({
      severity: 'success',
      summary: 'Sucesso!',
      detail: msg
    });
    this.timerClose();
  }

  public showErrorMsg(msg: string) {
    this.msgService.add({
      severity: 'error',
      summary: 'Ops!',
      detail: msg
    });
    this.timerClose();
  }

  public showInfoMsg(msg: string) {
    this.msgService.add({
      severity: 'info',
      summary: 'Informação!',
      detail: msg
    });
    this.timerClose();
  }

  public showWarnMsg(msg: string) {
    this.msgService.add({
      severity: 'warn',
      summary: 'Atenção!',
      detail: msg
    });
    this.timerClose();
  }

  public timerClose() {
    setTimeout(() => {
      this.msgService.clear();
    }, 3000);
  }
}
