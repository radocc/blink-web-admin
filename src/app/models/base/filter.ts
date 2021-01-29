import { Sort } from "./sort";

export class Filter {

    public page: number;
    public start: number;
    public limit: number = 100;
    public idFiltro: number;
    public clausulas: any[] = [];
    public variaveis: any[] = [];
    public data: any;
    public ultimaBusca: Date;
    public intervalo: number;
    public totalRegistros: number = 0;
    public sorts: Sort[] = [];
}
