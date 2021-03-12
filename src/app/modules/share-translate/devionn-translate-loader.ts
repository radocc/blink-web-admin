import { TranslateLoader } from "@ngx-translate/core";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from "rxjs/operators";
import { AbstractService } from "@radoccservices/base/abstract-service";

@Injectable()
export class DevionnTranslateLoader extends AbstractService<any> implements TranslateLoader {

    constructor(router: Router, public http: HttpClient) {
        super(router, http);
    }

    public getWebService(): string {
        return 'translate';
    }

    getTranslation(lang: string): Observable<any> {
        let translate = sessionStorage.getItem('translate');
        if (translate == null){
            return this.http.get<any>(this.urlWebBase + '/getbyidioma?idioma=' + lang).pipe( map( (values) =>{
                sessionStorage.setItem('translate', JSON.stringify(values));
                return values;
            }));
        }else {
            let obs = new Observable((observer)=>{
                observer.next(JSON.parse(translate));
            });
            return obs;
        }
    }

}


