import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ImagemService {

    constructor(){

    }

    public covertToArrayByte(file): Promise<any>{
        return new Promise((resolve, reject) => {
            try{
                this.toArrayBuffer(file, function(array){
                    let bytes = new Uint8Array(array);
                    let conteudoArquivo = [];
                    for (var i = 0; i < bytes.length; i++) {
                        conteudoArquivo.push(bytes[i]);
                    }
                    resolve(conteudoArquivo);
                });
            }catch(e){
                reject(e);
            }
        })
    }

    public convertToBase64(file):Promise<string>{
        return new Promise((resolve, reject) => {
            try{
                this.toBase64(file, function(image){
                    resolve(image);
                })
            }catch (e){
                reject(e)
            }
        })
    }

    private toArrayBuffer(file, retorno) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = function () {
            retorno(reader.result);
        };
    }

    private toBase64(file, retorno) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            retorno(reader.result);
        };
    }

}
