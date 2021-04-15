import { Component, Input, OnInit } from '@angular/core';
import { Arquivo } from '@radoccmodels/base/arquivo';
import { Conteudo } from '@radoccmodels/conteudo';
import { ConteudoResult } from '@radoccmodels/result/conteudoresult';
import { Template } from '@radoccmodels/template';
import { ConteudoService } from '@radoccservices/conteudo-services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-conteudo-display',
  templateUrl: './conteudo-display.component.html',
  styleUrls: ['./conteudo-display.component.scss'],
  providers:[
    MessageService,ConteudoService
  ]
})
export class ConteudoDisplayComponent implements OnInit {

  @Input("conteudo") public conteudoResult:ConteudoResult;
  public urlVideo:string;
  public conteudo:Conteudo;
  public arquivo:Arquivo;
  public template:Template;

  constructor( private msgService:MessageService,private conteudoService:ConteudoService) {
    
  }

  ngOnInit(): void {
    
    this.conteudoService.findPreview(this.conteudoResult.id).subscribe((conteudo)=>{
      this.conteudo = conteudo;
      this.arquivo = conteudo.arquivo;
      this.template = conteudo.template;
    })
  }

}
