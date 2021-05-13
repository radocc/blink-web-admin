import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { PlayerService } from '@radoccservices/player-services';

@Component({
  selector: 'app-panel-grupoplayer',
  templateUrl: './panel-grupoplayer.component.html',
  styleUrls: ['./panel-grupoplayer.component.scss'],
  providers:[
    PlayerService
  ]
})
export class PanelGrupoPlayerComponent implements OnInit {

  
  constructor(private router:Router, private playerService:PlayerService) { }

  ngOnInit(): void {
    
  }
 

}
