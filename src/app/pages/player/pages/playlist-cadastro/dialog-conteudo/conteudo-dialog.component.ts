import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'; 
import { PlaylistConteudo } from '@radoccmodels/playlistconteudo';
import { PlaylistService } from '@radoccservices/playlist-services';
import { PlaylistConteudoService } from '@radoccservices/playlistconteudo-services';
import { ConteudoService } from '@radoccservices/conteudo-services';
import { ConteudoResult } from '@radoccmodels/result/conteudoresult';
import { TipoConteudo } from '@radoccmodels/tipoconteudo';
import { TipoConteudoService } from '@radoccservices/tipoconteudo-services';

@Component({
  selector: 'app-conteudo-dialog-playlist',
  templateUrl: './conteudo-dialog.component.html',
  styleUrls: ['./conteudo-dialog.component.scss'],
  providers:[
    PlaylistService, PlaylistConteudoService, ConteudoService, TipoConteudoService
  ]
})
export class ConteudoDialogComponent implements OnInit {

   
  public form:FormGroup = new FormGroup({
    nome:new FormControl('') 
  }) 
  public nomeBusca:string = "";
  public listaConteudo:PlaylistConteudo[] = [];
  public conteudos:ConteudoResult[] = [];
  public tipoConteudos:TipoConteudo[] = [];
  public display:boolean = false; 
  public tipoConteudo:TipoConteudo;

  constructor(private playlistConteudoService:PlaylistConteudoService,
     public conteudoService:ConteudoService, private tipoConteudoService:TipoConteudoService) {
      
  }

  ngOnInit(): void { 

  } 

  public montarAmbiente(listaConteudo:PlaylistConteudo[]){
    this.tipoConteudoService.findAll().subscribe((lista)=>{
      this.tipoConteudos = lista;
    });
    this.listaConteudo = listaConteudo;
    
  }

  public showDialog(){
    this.display = true;
  }

  public closeDialog(){
    this.display = false;
  }
 
  public filtrarTipo(tipo:TipoConteudo){
    this.tipoConteudo = tipo;
    this.conteudoService.filtrarTipo(tipo.id,this.nomeBusca).subscribe((lista)=>{
      this.conteudos = lista;
    })
  }

}
