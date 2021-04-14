import { Licenca } from './licenca';
import { AbstractEntity } from './abstract-entity';

export class LicencaFatura extends AbstractEntity {

    public idLicenca: number;
    public licenca: Licenca;
    public dataVencimento: Date;
    public status: number;
    public valor: number;
    public dataPagamento: Date;
    public idArquivo: number;
    public plano: string;
    public dataInicio: Date;
    public dataFim: Date;
    public statusFatura: string;



}