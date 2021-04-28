import { Empresa } from './../../../models/base/empresa';
import { EmpresaService } from './../../../services/base/empresa-service';
import { Usuario } from './../../../models/base/usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TelaService } from '@radoccservices/base/tela-service';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { DispositivoService } from '@radoccservices/base/dispositivo-service';

@Component({
  selector: 'app-painel-site',
  templateUrl: './painel-site.component.html',
  styleUrls: ['./painel-site.component.scss'],
  providers: [ TelaService, EmpresaService, DispositivoService ]
})
export class PainelSiteComponent implements OnInit {

  public rotaSelecionada:string = 'conteudo';
  public itensConfiguracao: MenuItem[] = [];
  public empresas: Empresa[] = [];
  public empresaSelecionada: any;

  public usuario:Usuario;
  public itemsMenuUsuario:MenuItem[] = [    
      
  ];

  constructor(private telaService: TelaService, private router: Router, private translateService:TranslateService,
   private empresaService: EmpresaService,private dispositivoService: DispositivoService) { }

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
      this.aplicarTranslateMenu(this.itensConfiguracao);
    });
    this.itemsMenuUsuario = [
      // {
      //   label: 'PERFIL',
      //   routerLink: ['/perfil-usuario']
      // },
      {
        label: 'SAIR',
        routerLink:['/login']        
      }
    ]
    this.aplicarTranslateMenu(this.itemsMenuUsuario);
    this.pesquisarEmpresa();
    this.rotaSelecionada = this.router.url.split('/')[2];
    console.log(this.router.url.split('/')[2])
  }

  public aplicarTranslateMenu(menus:MenuItem[]){
    menus.map((menu)=>{
      this.translateService.get(menu.label).subscribe((label)=>{
        menu.label = label;
      });
    })
  }

  public pesquisarEmpresa(){ 
     this.empresaService.buscarPorUsuario().subscribe((lista)=>{
        this.empresas = lista;
        this.empresaPadrao();
     })
   }
   public empresaPadrao(){
     this.empresaService.findPorUsuario().subscribe((empresa: Empresa)=>{
       this.empresaSelecionada = empresa;
     })
   }
   public alterarEmpresa() {
    this.dispositivoService.alterarEmpresa(this.empresaSelecionada.id).subscribe(()=>{
      window.location.reload();
    })
   }

  public navegar(rota:string, url?:string){
    this.rotaSelecionada = rota;
    if (url != null){
      this.router.navigateByUrl(url);
    }
  }

}
