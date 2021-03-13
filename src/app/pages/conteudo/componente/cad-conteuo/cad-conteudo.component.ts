import { TranslateService } from '@ngx-translate/core';
import {  OnInit} from '@angular/core';
import { MessageService } from 'primeng/api';


export class CadConteudoComponent implements OnInit {

  
  constructor(public msgService:MessageService, public translateService:TranslateService) {

  }

  ngOnInit(): void { 
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
