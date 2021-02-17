import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TelaService } from '@radoccservices/base/tela-service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-painel-site',
  templateUrl: './painel-site.component.html',
  styleUrls: ['./painel-site.component.scss'],
  providers: [ TelaService ]
})
export class PainelSiteComponent implements OnInit {

  public rotaSelecionada:string = 'conteudo';
  public itens: MenuItem[] = [];

  constructor(private telaService: TelaService, private router: Router) { }

  ngOnInit(): void {
    this.telaService.findTelasPorAcessoIdMenu(10001).subscribe((lista)=>{
      for (let i = 0; i < lista.length; i++) {
        this.itens.push({
          label: lista[i].nome,
          command: () => {
            this.router.navigateByUrl(lista[i].url);
          }
        });
      }
    });
  }

  public navegar(rota){
    this.rotaSelecionada = rota;
  }

}
