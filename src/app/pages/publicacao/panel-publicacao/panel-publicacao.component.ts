import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Conteudo } from '@radoccmodels/conteudo';
import { TipoConteudo } from '@radoccmodels/tipoconteudo';
import { ConteudoService } from '@radoccservices/conteudo-services';
import { TipoConteudoService } from '@radoccservices/tipoconteudo-services';

@Component({
  selector: 'app-panel-publicacao',
  templateUrl: './panel-publicacao.component.html',
  styleUrls: ['./panel-publicacao.component.scss'],
  providers:[
    TipoConteudoService, ConteudoService
  ]
})
export class PanelPublicacaoComponent implements OnInit {

  public nomeBusca:string = "";
  public tiposConteudos: TipoConteudo[] = [ ]
  public conteudos:Conteudo[] = [];
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
    // this.conteudoService.
    this.router.navigate([url]);
    this.conteudoService.filtrarTipo(tipo.id,this.nomeBusca).subscribe((lista)=>{
      this.conteudos = lista;
    })
  }

  public alterarConteudo(conteudo){

  }

  public excluirConteudo(conteudo){
    
  }

  public visualizarConteudo(conteudo){
    
  }

  public arquivoConteudo(conteudo){
    
  }

}
