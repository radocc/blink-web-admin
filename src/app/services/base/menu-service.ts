
import { AbstractService } from './abstract-service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '@radoccmodels/base/menu';

@Injectable()
export class MenuService extends AbstractService<Menu> {

    constructor(router: Router, http: HttpClient) {
        super(router, http);
    }

    public getWebService(): string {
        return 'menu';
    }

    public findMenusPorAcesso(): Observable<any> {
        let url = this.urlWebBase + "/findmenusporacesso";
        return this.http.get(url);
    }

    public buscarMenus(): Observable<Array<Menu>> {
        return this.http.get<Array<Menu>>(this.urlWebBase + '/buscaracessomenus');
    }

    public buscarMenusParaDireitoAcesso(): Observable<Menu[]>{
        return this.http.get<Menu[]>(this.urlWebBase + '/buscarmenusparadireitoacesso');
    }
}
