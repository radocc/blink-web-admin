import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { PlaylistService } from '@radoccservices/playlist-services';

@Component({
  selector: 'app-panel-playlist',
  templateUrl: './panel-playlist.component.html',
  styleUrls: ['./panel-playlist.component.scss'],
  providers:[
    PlaylistService
  ]
})
export class PanelPlaylistComponent implements OnInit {

  
  constructor(private router:Router, private playerService:PlaylistService) { }

  ngOnInit(): void {
    
  }
 

}
