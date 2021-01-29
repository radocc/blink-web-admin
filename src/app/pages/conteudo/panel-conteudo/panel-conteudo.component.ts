import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Conteudo } from '@radoccmodels/conteudo';
import { ConteudoResult } from '@radoccmodels/result/conteudoresult';
import { TipoConteudo } from '@radoccmodels/tipoconteudo';
import { ConteudoService } from '@radoccservices/conteudo-services';
import { TipoConteudoService } from '@radoccservices/tipoconteudo-services';

@Component({
  selector: 'app-panel-conteudo',
  templateUrl: './panel-conteudo.component.html',
  styleUrls: ['./panel-conteudo.component.scss'],
  providers:[
    TipoConteudoService, ConteudoService
  ]
})
export class PanelConteudoComponent implements OnInit {

  public nomeBusca:string = "";
  public tiposConteudos: TipoConteudo[] = [ ]
  public conteudos:ConteudoResult[] = [];
  public tipoConteudo:TipoConteudo= null;

  constructor(private router:Router, private tipoConteudoService:TipoConteudoService, private conteudoService:ConteudoService) { }

  ngOnInit(): void {
    this.buscarTipos();
  }

  public buscarTipos(){
    this.tipoConteudoService.findAll().subscribe( (lista) =>{
      this.tiposConteudos = lista;
    })
  }

  public filtrarTipo(tipo:TipoConteudo){
    this.tipoConteudo = tipo;
    let url = this.getUrl(tipo);
    // this.conteudoService.
    this.router.navigate([url]);
    this.conteudoService.filtrarTipo(tipo.id,this.nomeBusca).subscribe((lista)=>{
      this.conteudos = lista;
    })
  }

  public getUrl(tipo:TipoConteudo){
    let url = 'admin/conteudo/panel/';
    switch (tipo.id){
      case 1:
        url += 'video';
        break;
      case 2:
        url += 'imagem';
        break;
      case 3:
        url += 'noticia';
        break;
      case 4:
        url += 'cotacao';
        break;
      case 5:
        url += 'previsaotempo';
        break;
      case 6:
        url += 'template-corporativo';
        break;
      case 7:
        url += 'curiosidade';
        break;
      case 8:
        url += 'saude';
        break;
      case 9:
        url += 'receita';
        break;
      case 10:
        url += 'agenda';
        break;
      case 11:
        url += 'turismo';
        break;
    }
    return url;
  }

  public alterarConteudo(conteudo){
    let url = this.getUrl(this.tipoConteudo)+"/"+conteudo.id;
    this.router.navigate([url]);
  }

  public excluirConteudo(conteudo){
    this.conteudoService.remove(conteudo.id).subscribe((res)=>{
      let index = this.conteudos.indexOf(conteudo);
      if (index > -1){
        this.conteudos.splice(index,1);
      }
    })
  }

  public visualizarConteudo(conteudo){
    
  }

  public arquivoConteudo(conteudo){
    
  }

}
