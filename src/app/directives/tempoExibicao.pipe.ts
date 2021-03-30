import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tempoExibicao'
})
export class TempoExibicaoPipe implements PipeTransform {

    transform(value: number, ...args: any[]): any {
        let texto = '';
        value = value * 1000;
        let horaSegundo = 1 * 60 * 60 * 1000;
        let hora = horaSegundo;
        hora = parseInt( ((value / hora)+"").split('.')[0]);
        if (hora > 0){
            value = value - (horaSegundo * hora );
        }
        let minutoDefault = 60*1000;
        let minutos = parseInt(((value / minutoDefault)+"").split('.')[0]);
        if (minutos > 0){
            value = value - (minutoDefault * minutos);
        }
        let segundos = parseInt( ((value / 1000)+"").split('.')[0]);
        if (hora > 0){
            texto = hora+ 'hrs ';
        }
        if (minutos > 0){
            texto += minutos+ 'min ';
        }
        if (segundos > 0){
            texto += segundos+"seg ";
        }
        return texto;
    }

}
