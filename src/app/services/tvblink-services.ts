
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';  
import { AbstractService } from './abstract-service'; 
import { environment } from 'environments/environment';

@Injectable()
export abstract class TVBlinkService<T> extends AbstractService<T> {

    constructor(router: Router, http: HttpClient,contextBase:string) {
        super(router, http);
        this.protocolo = environment.protocol;
        this.ip = environment.serverHost;  
        this.porta = environment.serverPort;
        this.contextBase = contextBase + '/rest/';
        this.urlBase = this.protocolo + '://' + this.ip + ':' + this.porta + '/' + this.contextBase;
        this.urlWebBase = this.urlBase + this.getWebService();

    }
  
    
}