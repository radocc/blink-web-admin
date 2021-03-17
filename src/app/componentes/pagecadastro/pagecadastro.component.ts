import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pagecadastro',
  templateUrl: './pagecadastro.component.html',
  styleUrls: ['./pagecadastro.component.scss'],
  providers: [MessageService,TranslateService]
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
  @Input('form') public form : FormGroup;
  @Input() translateParams: any[];
  @Input() mostraVoltar: boolean = true;
  @Output("save") onSave:EventEmitter<any> = new EventEmitter();
  public _disabledSalvar:boolean = false;

  constructor(private location:Location, private msgService: MessageService,
    private translateService:TranslateService) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    // console.log(window.innerHeight);
    // let appCadastro = document.getElementById('app-page-cadastro');
    // appCadastro.style.height = ((window.innerHeight - appCadastro.offsetTop) * 0.98) + 'px';
    // let cardBody: any = appCadastro.querySelector('.p-card-body');
    // cardBody.style.height =  '100%';

  }

  public validarForm():boolean{

    return true;
  }

  public salvar(){
    this.onSave.emit(this.form);
  }

  public cancelar(){
    this.novo(); 
  }

  public voltar() {
    this.location.back();
  }

  public disableSalvar(){
    this._disabledSalvar = true;
  }

  public enableSalvar(){
    this._disabledSalvar = false;
  }

  public novo() {
    if (this.form != null)
      this.form.reset();
  }

  public showSuccessMsg(msg: string) {
    this.translateService.get(msg).subscribe((mensagem)=>{
      this.msgService.add({
        severity: 'success',
        summary: 'Sucesso!',
        detail: mensagem
      });
      this.timerClose();
    });
    
  }

  public showErrorMsg(msg: string) {
    this.translateService.get(msg).subscribe((mensagem)=>{
      this.msgService.add({
        severity: 'error',
        summary: 'Ops!',
        detail: mensagem
      });
      this.timerClose();
    });
  }

  public showInfoMsg(msg: string) {
    this.translateService.get(msg).subscribe((mensagem)=>{
      this.msgService.add({
        severity: 'info',
        summary: 'Informação!',
        detail: mensagem
      });
      this.timerClose();
    });
  }

  public showWarnMsg(msg: string) {
    this.translateService.get(msg).subscribe((mensagem)=>{
      this.msgService.add({
        severity: 'warn',
        summary: 'Atenção!',
        detail: mensagem
      });
      this.timerClose();
    });
  }

  public timerClose() {
    setTimeout(() => {
      this.msgService.clear();
    }, 3000);
  }
}
