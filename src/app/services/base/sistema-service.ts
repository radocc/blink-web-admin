import { AbstractService } from './abstract-service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sistema } from '@radoccmodels/base/sistema';

@Injectable({
    providedIn:"root"
})
export class SistemaService extends AbstractService<Sistema> {
    
    private sistema:Sistema = null;

    constructor(router: Router, http: HttpClient) {
        super(router, http);
    }

    public getWebService(): string {
        return 'sistema';
    }

    public getSistema(): Observable<Sistema> {
        return new Observable((observer)=>{
            let url = this.urlWebBase ;
            if (this.sistema == null){
                this.http.get<Sistema>(url+'/config').subscribe((sistema)=>{
                    this.sistema = sistema;
                    observer.next(sistema);
                });
            }else {
                observer.next(this.sistema);                
            }
        });
    }

    public buscarLogo(): Observable<Sistema> {

        let url = this.urlWebBase + "/logo";
        return this.http.get<Sistema>(url);
    }

    public buscarParaAtualizar(): Observable<Sistema> {
        let url = this.urlWebBase + "/";
        return this.http.get<Sistema>(url);
    }
}
