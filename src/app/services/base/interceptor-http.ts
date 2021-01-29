import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AdminRoutes } from './rotas';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {

    private currentRequests: Array<string> = new Array();
    private mainLoadingBar: HTMLElement;
    private ambienteloadingbar: HTMLElement;

    constructor(private router: Router){
        
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem('token');
        let idioma = localStorage.getItem('lang')
        if (token == null) {
            token = '';
        }
        if (idioma == null){
            idioma = 'en';
        }
        let newReq;
        if (!req.headers.get('Content-Type')  && req.url.indexOf(environment.serverHost) > 0 ) {
            newReq = req.clone({setHeaders: { Authorization: token, 'Content-Type': 'application/json', 'idioma': idioma}});
        } else {
            newReq = req;
        }
        
        return next.handle(newReq).pipe(tap(event => {
            
        }, (respError) => {
            console.log('ERROR de Requisicao', respError);
            if(respError.status === 401){
                //this.abrirLogin();
                const token = localStorage.getItem('token');
                if (token == null || token == '') {
                    this.router.navigate(['login']);
                } else {
                    AdminRoutes.rotas.push(...['sempermissao']);
                    this.router.navigateByUrl('sempermissao');
                }
            }else if(respError.status === 404){
                if(navigator.onLine){
                    AdminRoutes.rotas.push(...['404']);
                    this.router.navigateByUrl('404');
                }
            }else if (respError.status == 500 && respError.error != null && respError.error.codErro == 18){                
                this.router.navigateByUrl('licenca-bloqueada');
            }
        }));
        
    }

    public abrirLogin(){
        localStorage.clear();
        this.router.navigate(['/login']);
    }
    
}