import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-painel-site',
  templateUrl: './painel-site.component.html',
  styleUrls: ['./painel-site.component.scss']
})
export class PainelSiteComponent implements OnInit {

  public rotaSelecionada:string = 'conteudo';

  constructor() { }

  ngOnInit(): void {
  }

  public navegar(rota){
    this.rotaSelecionada = rota;
  }

}
