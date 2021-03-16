import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { Loteria } from '@radoccmodels/loteria'; 
import { FiltroService } from '@radoccservices/base/filtro-service'; 
import { PlaylistService } from '@radoccservices/playlist-services';

@Component({
  selector: 'app-playlist-pesquisa',
  templateUrl: './playlist-pesquisa.component.html',
  styleUrls: ['./playlist-pesquisa.component.scss'],
  providers:[ 
    PlaylistService, FiltroService
  ]
})
export class PlaylistPesquisaComponent implements OnInit {

  public form:FormGroup = new FormGroup({
    nome:new FormControl('', Validators.required)    
  }) 
  
  public loteria:Loteria;
  public gridpesquisa;

  
  constructor(public playlistService:PlaylistService) {

  }

  ngOnInit(): void { 
  } 
  
  public gridPesquisa(grid) {
    this.gridpesquisa = grid;
  }

}
