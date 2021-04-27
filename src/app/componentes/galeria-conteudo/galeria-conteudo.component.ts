import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  public modoVisualizacao:number = 1;
  public form:FormGroup= new FormGroup({
    modoVisualizacao:new FormControl(1)
  })
  public tipoVisualizacao:{id:number,nome:string}[] = [
    {
      id:1,
      nome:'Grade'
    },{
      id:2,
      nome:'Individual'
    }
  ]

  constructor(public config: DynamicDialogConfig,public ref: DynamicDialogRef, private msgService:MessageService) {
    this.conteudos = config.data;
    
  }

  ngOnInit(): void { 
      this.form.controls['modoVisualizacao'].valueChanges.subscribe((tipo)=>{
        if (tipo == 1){
          this.modoVisualizacao = 1;
        }else {
          this.modoVisualizacao = 2;
          this.play();
        }        
      })
  } 

  public play(){
    this.modoVisualizacao = 2;
    if (this.conteudos.length > 0){
      this.criarTemporizador();      
    }
  }

  public criarTemporizador(){
    if (this.activeIndex+1 >= this.conteudos.length && this.modoVisualizacao == 1){
      this.activeIndex = -1;
      this.modoVisualizacao = 1;
      return ;
    }
    this.activeIndex++;
    this.conteudo = this.conteudos[this.activeIndex].conteudo;
    if (this.conteudo.tempoExibicao == null){
      this.conteudo.tempoExibicao = 3;
    }
    let tempo = this.conteudo.tempoExibicao * 1000;
    // let tempo = 4000;
    let me = this;
    setTimeout(()=>{
      me.criarTemporizador();
    },tempo);
  }
  
}
