import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConteudoResult } from '@radoccmodels/result/conteudoresult';

@Component({
  selector: 'app-conteudo-display',
  templateUrl: './conteudo-display.component.html',
  styleUrls: ['./conteudo-display.component.scss']
})
export class ConteudoDisplayComponent implements OnInit {

  @Input("conteudo") public conteudo:ConteudoResult;
  
  constructor() { }

  ngOnInit(): void {
  }

  

}
