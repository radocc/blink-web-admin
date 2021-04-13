import { Component, Input, OnInit } from '@angular/core';
import { ConteudoResult } from '@radoccmodels/result/conteudoresult';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-conteudo-display',
  templateUrl: './conteudo-display.component.html',
  styleUrls: ['./conteudo-display.component.scss'],
  providers:[
    MessageService
  ]
})
export class ConteudoDisplayComponent implements OnInit {

  @Input("conteudo") public conteudo:ConteudoResult;
  
  constructor(public config: DynamicDialogConfig,public ref: DynamicDialogRef, private msgService:MessageService) {
    this.conteudo = config.data;
  }

  ngOnInit(): void {

  }

  

}
