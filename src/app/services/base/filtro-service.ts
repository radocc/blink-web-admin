;
import { Observable } from 'rxjs';
import { AbstractService } from './abstract-service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Filtro } from '@radoccmodels/base/filtro';
import { Filter } from '@radoccmodels/base/filter';
import { environment } from 'environments/environment';

@Injectable()
export class FiltroService extends AbstractService<Filtro> {

    public websockets: WebSocket[] = [];

    constructor(router: Router, http: HttpClient) {
        super(router, http);
    }

    public getWebService(): string {
        return 'filtro';
    }

    // public gerarColunas(filtro: Filtro): Observable<any> {
    //     let url = this.urlWebBase + "/gerarcolunas";
    //     return this.http.post(url, filtro).map(res => {
    //         return res.json();
    //     });
    // }

    public gerarColunas(filtro: Filtro): Observable<any> {
        let url = this.urlWebBase + "/gerarcolunas";
        return this.http.post(url, filtro);
    }

    public iniciarAtualizacao(filter: Filter): Observable<any[]> {
        return new Observable<any[]>(observer => {
            let token = localStorage.getItem('token');
            if (this.websockets[filter.idFiltro] != null) {
                this.websockets[filter.idFiltro].close();
            }
            let ws = new WebSocket(environment.ws + '://' + this.ip + ':' + this.porta + '/BaseWeb/' + 'filtrosocket/' + token);
            ws.onopen = function (msg) {
                ws.send(JSON.stringify(filter));
            }
            ws.onmessage = function (msg: any) {
                let obj = JSON.parse(msg.data);
                if (obj !== null) {
                    observer.next(obj);
                } else {
                    observer.next([]);
                }
            }
            ws.onerror = function (err) {
                observer.error(err);
            }
            ws.onclose = function () {
                observer.complete();
            }
            this.websockets[filter.idFiltro] = ws;
        });
    }

    public sendSocket(filter: Filter, id: number) {
        let ws: WebSocket = this.websockets[id];
        ws.send(JSON.stringify(filter));
    }

    public pararAtualizacao(id: number) {
        if (this.websockets[id] != null) {
            this.websockets[id].close();
        }
    }
}
