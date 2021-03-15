import { Usuario } from './../../../models/base/usuario';
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
  public itensConfiguracao: MenuItem[] = [];
  public usuario:Usuario;
  public itemsMenuUsuario:MenuItem[] = [    
      
  ];

  constructor(private telaService: TelaService, private router: Router) { }

  ngOnInit(): void {
    let jsonUser = localStorage.getItem('usuario');
    this.usuario = JSON.parse(jsonUser);

    this.telaService.findTelasPorAcessoIdMenu(10001).subscribe((lista)=>{
      for (let i = 0; i < lista.length; i++) {
        this.itensConfiguracao.push({
          label: lista[i].nome,
          command: () => {
            this.router.navigateByUrl(lista[i].url);
          }
        });
      }
    });
    this.itemsMenuUsuario = [
      {
        label: 'PERFIL',
        routerLink: ['/perfil-usuario']
      },
      {
        label: 'EMPRESA',
        items:[
          {
            label:'Empresa 1'
          },
          {
            label:'Empresa 2'
          }
        ]
      },
      {
        label: 'SAIR',
        routerLink:['/login']        
      }
    ]
  }

  public navegar(rota:string, url?:string){
    this.rotaSelecionada = rota;
    if (url != null){
      this.router.navigateByUrl(url);
    }
  }

}
