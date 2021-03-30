import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { Playlist } from '@radoccmodels/playlist';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-playlist-dialog',
  templateUrl: './playlist-dialog.component.html',
  styleUrls: ['./playlist-dialog.component.scss'],
  providers:[
    MessageService
  ]
})
export class PlaylistDialogComponent implements OnInit {
    
  public playlist:Playlist;
  public form:FormGroup = new FormGroup({
    nome:new FormControl(null, Validators.required),
    dataInicio:new FormControl(new Date(), Validators.required),
    dataFim:new FormControl(null, Validators.required),
    status:new FormControl(2)
  }); 
  public listaStatus:{ id:number, nome:string }[] = [{
    id:1,
    nome:'SALVO'
  },
  {
    id:2,
    nome:'AGUARDANDO_APROVACAO'
  },{
    id:3,
    nome:'APROVADO'
  },{
    id:4,
    nome:'PUBLICADO'
  },{
    id:5,
    nome:'REPROVADO'
  }];
  
  constructor(public config: DynamicDialogConfig,public ref: DynamicDialogRef, private msgService:MessageService) {
    this.playlist = config.data;
  }

  ngOnInit(): void { 
    if (this.playlist != null){
      this.montarForm();
    }
    
  } 

  public montarForm(){
    this.form.controls['nome'].setValue(this.playlist.nome);
    this.form.controls['dataInicio'].setValue(this.playlist.dataInicio);
    this.form.controls['dataFim'].setValue(this.playlist.dataFim);
    this.form.controls['status'].setValue(this.playlist.status);
  }

  public montarObj(){
    if (this.playlist == null){
      this.playlist = new Playlist();
    }
    this.playlist.nome = this.form.controls['nome'].value;
    this.playlist.dataInicio = this.form.controls['dataInicio'].value ; 
    this.playlist.dataFim = this.form.controls['dataFim'].value ; 
    this.playlist.status = this.form.controls['status'].value ; 
  }

 
  public salvar(){
    if (this.form.invalid){
      this.msgService.add({
        severity:'warn', summary:'Campos inválidos', detail:'Verifique os campos com asterisco vermelho'
      })
    }
    this.montarObj();
    this.ref.close(this.playlist);
  }
}
