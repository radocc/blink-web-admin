import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConteudoResult } from '@radoccmodels/result/conteudoresult';
import { TipoConteudo } from '@radoccmodels/tipoconteudo';
import { FiltroService } from '@radoccservices/base/filtro-service';
import { ConteudoService } from '@radoccservices/conteudo-services';
import { TipoConteudoService } from '@radoccservices/tipoconteudo-services';
import { GridPesquisaComponent } from 'app/componentes/gridpesquisa/gridpesquisa.component';

@Component({
  selector: 'app-template-pesquisa',
  templateUrl: './template-pesquisa.component.html',
  styleUrls: ['./template-pesquisa.component.scss'],
  providers: [ FiltroService, TipoConteudoService, ConteudoService ]
})
export class TemplatePesquisaComponent implements OnInit {

  @ViewChild(GridPesquisaComponent) grid: GridPesquisaComponent;

  public form:FormGroup = new FormGroup({
    nome:new FormControl('', Validators.required)    
  }) 
  
  
  public gridpesquisa: GridPesquisaComponent;
  public nomeBusca:string = "";
  public tiposConteudos: TipoConteudo[] = [ ]
  public conteudos:ConteudoResult[] = [];
  public tipoConteudo:TipoConteudo= null;
 

  
  constructor(public filtroService: FiltroService, 
    private tipoConteudoService: TipoConteudoService,
    private router: Router,
    private conteudoService: ConteudoService) {

  }

  ngOnInit(): void { 
    this.buscarTipos();
  } 
  
  public gridPesquisa(grid) {
    this.gridpesquisa = grid;
  }

  public buscarTipos(){
    this.tipoConteudoService.findAll().subscribe( (lista) =>{
      this.tiposConteudos = lista;
    })
  }

  public filtrarTipo(tipo:TipoConteudo){
    this.tipoConteudo = tipo;
    this.grid.condicoes.pop();
    this.grid.condicoes.push({
      propriedade: 'idtipoconteudo',
      operador: '=',
      titulo: 'Tipo',
      labelOperador: 'Igual',
      tipo: 'Long',
      value:  tipo.id
    });
    this.grid.pesquisar();
    // let url = this.getUrl(tipo);
    // // this.conteudoService.
    // this.router.navigate([url]);
    // this.conteudoService.filtrarTipo(tipo.id,this.nomeBusca).subscribe((lista)=>{
    //   this.conteudos = lista;
    // })
  }

  public getUrl(tipo:TipoConteudo){
    let url = 'admin/configuracao/panel/';
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

}