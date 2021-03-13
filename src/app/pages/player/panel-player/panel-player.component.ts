import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Player } from '@radoccmodels/player';
import { PlayerService } from '@radoccservices/player-services';

@Component({
  selector: 'app-panel-player',
  templateUrl: './panel-player.component.html',
  styleUrls: ['./panel-player.component.scss'],
  providers:[
    PlayerService
  ]
})
export class PanelPlayerComponent implements OnInit {

  
  constructor(private router:Router, private playerService:PlayerService) { }

  ngOnInit(): void {
    
  }
 

}
