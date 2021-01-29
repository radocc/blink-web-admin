import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'tv-blink';

  constructor(private router: Router,
    public translate: TranslateService) {
      
  }

  ngOnInit(): void {        
    this.translate.setDefaultLang('pt');
    this.translate.use('pt');
    sessionStorage.setItem('lang', 'pt')
    
}
}
