import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { Playlist } from '@radoccmodels/playlist';
import { PlaylistConteudo } from '@radoccmodels/playlistconteudo';
import { ConteudoResult } from '@radoccmodels/result/conteudoresult';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-galeria-conteudo',
  templateUrl: './galeria-conteudo.component.html',
  styleUrls: ['./galeria-conteudo.component.scss'],
  providers:[
    MessageService
  ]
})
export class GaleriaConteudoComponent implements OnInit {
    
  public conteudos:PlaylistConteudo[];
  public activeIndex:number = -1;
  public conteudo:ConteudoResult;
  
  constructor(public config: DynamicDialogConfig,public ref: DynamicDialogRef, private msgService:MessageService) {
    this.conteudos = config.data;
  }

  ngOnInit(): void { 
    if (this.conteudos.length > 0){
      this.criarTemporizador();      
    }
    
  } 

  public criarTemporizador(){
    if (this.activeIndex+1 >= this.conteudos.length){
      this.activeIndex = -1;
    }
    this.activeIndex++;
    this.conteudo = this.conteudos[this.activeIndex].conteudo;
    // let tempo = this.conteudo.tempoExibicao * 1000;
    let tempo = 4000;
    let me = this;
    setTimeout(()=>{
      me.criarTemporizador();
    },tempo);
  }
  
}
