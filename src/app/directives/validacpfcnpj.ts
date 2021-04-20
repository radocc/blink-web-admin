import { Validator, FormControl, ValidatorFn, NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
    selector: '[validaCpfCnpj][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: ValidaCpfCnpj, multi: true }
      ]
})
export class ValidaCpfCnpj implements Validator {

    validate(c: FormControl): {[key: string]: any} {
        return this.validar(c.value);
    }

    private validar(cnpj) {
        if (cnpj == null) {
            return null;
        }

        let invalido = {'invalido': true};
        
        let valida = this.verificaCpfCnpj( cnpj );
        cnpj = cnpj.toString();
        cnpj = cnpj.replace(/[^0-9]/g, '');
    
        if ( valida === 'CPF' ) {
            return this.validaCpf( cnpj );
        } 
        
        else if ( valida === 'CNPJ' ) {
            return this.validaCnpj( cnpj );
        } 
        
        else {
            return invalido;
        }
    }

    verificaCpfCnpj ( valor ) {
        valor = valor.toString();
        valor = valor.replace(/[^0-9]/g, '');
    
        if ( valor.length === 11 ) {
            return 'CPF';
        } else if ( valor.length === 14 ) {
            return 'CNPJ';
        } else {
            return false;
        }
        
    } 
        
    calcDigitosPosicoes( digitos, posicoes = 10, soma_digitos = 0 ) {
        digitos = digitos.toString();

        for ( let i = 0; i < digitos.length; i++  ) {
            soma_digitos = soma_digitos + ( digitos[i] * posicoes );
            posicoes--;
            if ( posicoes < 2 ) {
                posicoes = 9;
            }
        }
        soma_digitos = soma_digitos % 11;
        if ( soma_digitos < 2 ) {
            soma_digitos = 0;
        } else {
            soma_digitos = 11 - soma_digitos;
        }
        let cpf = digitos + soma_digitos;
        return cpf;
    }

    validaCpf( valor ) {
        let invalido = {'cpf': true};

        if (valor == '00000000000' || 
            valor == '11111111111' || 
            valor == '22222222222' || 
            valor == '33333333333' || 
            valor == '44444444444' || 
            valor == '55555555555' || 
            valor == '66666666666' || 
            valor == '77777777777' || 
            valor == '88888888888' || 
            valor == '99999999999') {
            return invalido;
        }
            
        valor = valor.toString();
        valor = valor.replace(/[^0-9]/g, '');
        let digitos = valor.substr(0, 9);
        let novo_cpf = this.calcDigitosPosicoes( digitos );
        novo_cpf = this.calcDigitosPosicoes( novo_cpf, 11 );
        if ( novo_cpf === valor ) {
            return null;
        } else {
            return invalido;
        }
        
    }

    validaCnpj ( valor ) {
        let invalido = {'cnpj': true};

        if (valor == '00000000000000' || 
            valor == '11111111111111' || 
            valor == '22222222222222' || 
            valor == '33333333333333' || 
            valor == '44444444444444' || 
            valor == '55555555555555' || 
            valor == '66666666666666' || 
            valor == '77777777777777' || 
            valor == '88888888888888' || 
            valor == '99999999999999') {
            return invalido;
        }

        valor = valor.toString();
        valor = valor.replace(/[^0-9]/g, '');
        let cnpj_original = valor;
        let primeiros_numeros_cnpj = valor.substr( 0, 12 );
        let primeiro_calculo = this.calcDigitosPosicoes( primeiros_numeros_cnpj, 5 );
        let segundo_calculo = this.calcDigitosPosicoes( primeiro_calculo, 6 );
        let cnpj = segundo_calculo;
        if ( cnpj === cnpj_original ) {
            return null;
        }
        return invalido;
    } 

}
