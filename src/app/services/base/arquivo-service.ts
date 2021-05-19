import { AbstractService } from './abstract-service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Arquivo } from '@radoccmodels/base/arquivo';

@Injectable()
export class ArquivoService extends AbstractService<Arquivo> {


    constructor(router: Router, http: HttpClient) {
        super(router, http);

    }

    public getWebService(): string {
        return 'arquivo';
    }

    public getUrlUpload() {
        return this.urlWebBase + '/upload';
    }
  
    public postFile(fileToUpload: File, fnProgress?:Function): Promise<any> {
        return new Promise((resolve, reject) => {
            const endpoint = this.getUrlUpload();
            const formData: FormData = new FormData();
            if (fileToUpload) {
                formData.append('file1', fileToUpload);
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = (state) => {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            resolve(JSON.parse(xhr.response));
                        } else {
                            reject(JSON.parse(xhr.response));
                        }
                    }
                };
                xhr.upload.onprogress = function (evnt) {
                    if (evnt.lengthComputable) {
                        let progres = Math.round((evnt.loaded / evnt.total) * 100);
                        console.log('Progress', evnt.lengthComputable, progres);
                        if (fnProgress != null){
                            fnProgress(progres);
                        }
                    }
                };
                xhr.onload = function (evnt) {
                    console.log('Resultado do Envio', evnt);
                }
                xhr.onerror = function (evnt) {
                    reject(evnt);
                };
                xhr.open("POST", endpoint, true);
                // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.send(formData);
            }else{
                resolve(false);
            }
        });
    }

    // public salvarImagem(obj: ImagemReq) {
    //     return this.http.post<ImagemReq>(this.urlWebBase + '/salvarimagem', obj)
    // }

    public getUrl(id: number): Observable<string> {
        return this.http.get<string>(this.urlWebBase + `url/${id}`).pipe();
    }
}