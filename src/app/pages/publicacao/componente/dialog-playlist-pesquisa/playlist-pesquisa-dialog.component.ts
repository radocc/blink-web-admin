import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { FiltroPanel } from '@radocccomponentes/gridpesquisa/filtropanel';
import { Playlist } from '@radoccmodels/playlist';
import { FiltroService } from '@radoccservices/base/filtro-service';
import { PlaylistService } from '@radoccservices/playlist-services';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-playlist-pesquisa-dialog',
  templateUrl: './playlist-pesquisa-dialog.component.html',
  styleUrls: ['./playlist-pesquisa-dialog.component.scss'],
  providers:[
    MessageService,PlaylistService, FiltroService
  ]
})
export class PlaylistPesquisaDialogComponent implements OnInit {
    
  public playlist:Playlist;
  public lista:Playlist[]; 
  constructor(public config: DynamicDialogConfig,public ref: DynamicDialogRef, private msgService:MessageService,
    public playlistService:PlaylistService,private filtroService:FiltroService) {
    this.playlist = config.data;
  }

  ngOnInit(): void {  
    this.playlistService.findNome("",false).subscribe((lista)=>{
      this.lista = lista;
    })
  }  

 
  public selecionar(){
    this.ref.close(this.playlist);
  }
}
