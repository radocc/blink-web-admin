import { Component, Input, OnInit } from '@angular/core';
import { Arquivo } from '@radoccmodels/base/arquivo';
import { Conteudo } from '@radoccmodels/conteudo';
import { ConteudoResult } from '@radoccmodels/result/conteudoresult';
import { Template } from '@radoccmodels/template';
import { ConteudoService } from '@radoccservices/conteudo-services';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-conteudo-display-dialog',
  templateUrl: './conteudo-display-dialog.component.html',
  styleUrls: ['./conteudo-display-dialog.component.scss'],
  providers:[
    MessageService,ConteudoService
  ]
})
export class ConteudoDisplayDialogComponent implements OnInit {

  @Input("conteudo") public conteudoResult:ConteudoResult;
  // public urlVideo:string;
  // public conteudo:Conteudo;
  // public arquivo:Arquivo;
  // public template:Template;

  constructor(public config: DynamicDialogConfig,public ref: DynamicDialogRef, private msgService:MessageService,private conteudoService:ConteudoService) {
    this.conteudoResult = config.data;
  }

  ngOnInit(): void {
    
     
  }

}