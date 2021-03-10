import { SelectionModel } from '@angular/cdk/collections';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { NgZone, ViewChild, Input, Directive } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core'; 
import { Coluna } from '@radoccmodels/base/coluna';
import { Filter } from '@radoccmodels/base/filter';
import { Filtro } from '@radoccmodels/base/filtro';
import { Sort } from '@radoccmodels/base/sort';
import { FiltroService } from '@radoccservices/base/filtro-service';
import { fromEvent } from 'rxjs';

@Directive()
export abstract class FiltroPanel {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild('page', { static: true }) page;
    @ViewChild('table', { static: true }) table: MatTable<any>;

    public form: FormGroup; 
    public filter: Filter = new Filter();
    public filtro: Filtro;
    private lastPage: number = -1;
    public defaultEmptyMessages = "NENHUM_REGISTRO_RETORNADO";
    public emptyMessages = "NENHUM_REGISTRO_RETORNADO";
    public messages = { emptyMessage: "NENHUM_REGISTRO_RETORNADO" }
    public nomeTela: string = "Pesquisa";
    public campo1 = 'CONTEUDO'
    public campo2 = 'ATE';
    public valor1 = '';
    public valor2 = '';
    public posColunaPadrao: any = null;
    public contextmenuRow: any;
    public contextmenuColumn: any;
    public contextMenuButtons = [];
    // public contextMenu: ContextMenu;
    public rawEvent: any;
    public clausula: any = '';
    public operacao: any = '';
    public colunas: any[] = [];
    public linhas: any[] = [];
    public clausulas: any[] = [];
    public condicoes: any[] = [];
    // public selected: any[] = [];
    public operadores: any = [];
    public variaveis: any[] = [];
    selection = new SelectionModel<any>(true, []);
    public selectedIndex: number = null;
    public tableheader;
    private startMousePosition;
    private selectedCol;
    @Input() public selectMultiple;
    public dataSource: any[];
    public limit = 25;
    public buscandoFiltro: boolean = false;
    public buscandoDados: boolean = false; 
    public widthTable:number = 600;
    public modoColuna: String = 'flex';
    public listaDeTipoOperadores: any[] = [
        {
            type: "string",
            operadores: [
                {
                    label: 'CONTENDO',
                    operador: 'like'
                },
                {
                    label: 'IGUAL',
                    operador: "="
                }
            ]
        },
        {
            type: "Long",
            operadores: [
                {
                    label: 'IGUAL',
                    operador: "="
                },
                {
                    label: 'MAIOR_QUE',
                    operador: '>'
                },
                {
                    label: 'MAIOR_OU_IGUAL',
                    operador: '>='
                },
                {
                    label: 'MENOR_QUE',
                    operador: '<'
                },
                {
                    label: 'MENOR_OU_IGUAL',
                    operador: '<='
                }, {
                    label: 'ENTRE',
                    operador: 'between'
                }
            ]
        },
        {
            type: "Double",
            operadores: [
                {
                    label: 'IGUAL',
                    operador: "="
                },
                {
                    label: 'MAIOR_QUE',
                    operador: '>'
                },
                {
                    label: 'MAIOR_OU_IGUAL',
                    operador: '>='
                },
                {
                    label: 'MENOR_QUE',
                    operador: '<'
                },
                {
                    label: 'MENOR_OU_IGUAL',
                    operador: '<='
                }, {
                    label: 'ENTRE',
                    operador: 'between'
                }
            ]
        },
        {
            type: "BigDecimal",
            operadores: [
                {
                    label: 'IGUAL',
                    operador: "="
                },
                {
                    label: 'MAIOR_QUE',
                    operador: '>'
                },
                {
                    label: 'MAIOR_OU_IGUAL',
                    operador: '>='
                },
                {
                    label: 'MENOR_QUE',
                    operador: '<'
                },
                {
                    label: 'MENOR_OU_IGUAL',
                    operador: '<='
                }, {
                    label: 'ENTRE',
                    operador: 'between'
                }
            ]
        },
        {
            type: "Date",
            operadores: [
                {
                    label: 'IGUAL',
                    operador: "="
                },
                {
                    label: 'MAIOR_QUE',
                    operador: '>'
                },
                {
                    label: 'MAIOR_OU_IGUAL',
                    operador: '>='
                },
                {
                    label: 'MENOR_QUE',
                    operador: '<'
                },
                {
                    label: 'MENOR_OU_IGUAL',
                    operador: '<='
                }, {
                    label: 'ENTRE',
                    operador: 'between'
                }
            ]
        },
        {
            type: "Timestamp",
            operadores: [
                {
                    label: 'IGUAL',
                    operador: "="
                },
                {
                    label: 'MAIOR_QUE',
                    operador: '>'
                },
                {
                    label: 'MAIOR_OU_IGUAL',
                    operador: '>='
                },
                {
                    label: 'MENOR_QUE',
                    operador: '<'
                },
                {
                    label: 'MENOR_OU_IGUAL',
                    operador: '<='
                }, {
                    label: 'ENTRE',
                    operador: 'between'
                }
            ]
        }
    ];
    public websocket: WebSocket;
    public datatable: any;
    public displayedColumns: Array<string> = new Array<string>();
    public webSocketOn = true;

    public abstract buscarDados():Promise<void>;

    constructor(public filtroService: FiltroService, public zone: NgZone, public fb: FormBuilder, public translateService: TranslateService) {
        this.filtroService = filtroService;
        this.fb = fb;
    }

    ngOnInit() {
        this.form = this.fb.group({
            valor1: [null],
            valor2: [null]
        });        
    }

    public buscarFiltro(idFiltro: number, onSuccess) {
        this.buscandoFiltro = true;
        this.filtroService.findById(idFiltro).subscribe((filtro: Filtro) => {
            this.montarTable(filtro);
            this.buscandoFiltro = false;
            onSuccess();
        });
    }



    public aposFiltrar() {
        // this.dataSource.updateTable(this.linhas);
        this.createTablePaginator();
        for (let i = 0; i < this.colunas.length; i++) {
            if (this.colunas[i].tipo == "Action") {
                for (let j = 0; j < this.linhas.length; j++) {
                    if (this.colunas[i].width < (this.linhas[j].acoes.value.length * 40)) {
                        this.colunas[i].width = this.linhas[j].acoes.value.length * 40;
                    }
                }

                break;
            }
        }
        this.aposCarregar();
        this.recalcularTamanhos();
    }

    public aposCarregar(){}

    public getIndex(property: string, id, lista: any[]) {
        for (let w = 0; w < lista.length; w++) {
            if (lista[w][property] == id) {
                return w;
            }
        }
        return -1;
    }

    public createTablePaginator() {
        let me = this;
        this.translateService.get('ITENS_POR_PAGINA').subscribe(ITENS_POR_PAGINA => {
            me.translateService.get('PROXIMA_PAGINA').subscribe(PROXIMA_PAGINA => {
                me.translateService.get('PAGINA_ANTERIOR').subscribe(PAGINA_ANTERIOR => {
                    me.paginator._intl.itemsPerPageLabel = ITENS_POR_PAGINA + ":";
                    me.paginator._intl.nextPageLabel = PROXIMA_PAGINA;
                    me.paginator._intl.previousPageLabel = PAGINA_ANTERIOR;
                    me.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
                        if (length == 0) {
                            return `${0 * 1} - ${0} de ${0}`;
                        }
                        length = Math.max(length, 0);
                        const startIndex = page * pageSize;
                        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
                        return `${startIndex + 1} - ${endIndex} de ${length}`;
                    }
                })
            })
        })
    }

    public recalcularTamanhos() {
        let me = this;
        setTimeout(() => {
            let dataWidth = 0;
            me.colunas.forEach(coluna => {
                dataWidth += coluna.width;
            });
            me.tableheader = (<HTMLElement>me.page.nativeElement).querySelector('#tableheader');
            if (me.tableheader) {
                // 20 e o tamanho do padding da celular de 10px
                if (dataWidth < (me.tableheader.clientWidth - 48 - (me.colunas.length * 20))) {
                    // let avaliableGridSpace = (me.tableheader.clientWidth - 48) - (me.colunas.length * 20) - dataWidth;
                    // let avaliableSpacePerColumn = avaliableGridSpace / me.colunas.length;

                    // me.colunas.forEach(coluna => {
                    //     coluna.width += avaliableSpacePerColumn;
                    // });
                } else {
                    me.tableheader.setAttribute('style', 'min-width: ' + me.tableheader.scrollWidth + 'px');
                    let tablerows = me.page.nativeElement.getElementsByTagName('mat-row');

                    for (let i = 0; i < tablerows.length; i++) {
                        tablerows.item(i).setAttribute('style', 'min-width: ' + me.tableheader.scrollWidth + 'px');
                    }
                }

                fromEvent(me.tableheader, 'mousemove').subscribe((e: any) => {
                    me.trackMouse({ x: e.pageX, y: e.pageY });
                })
            }
        }, 500);
    }

    public getRowClass(row) {
        if (row.corLinha != undefined) {
            return row.corLinha;
        }
        return '';
    }

    public montarTable(filtro: Filtro) {
        this.filtro = filtro;
        this.colunas = [];
        this.widthTable = 0;
        if (this.selectMultiple){
            this.displayedColumns = this.selectMultiple != undefined ? ["select"] : [];
            this.selection = new SelectionModel(true,[])
        }else {
            this.displayedColumns = [];
            this.selection = new SelectionModel(false,[])
        }
        
        if (filtro != null) {
            for (let count = 0; count < filtro.colunas.length; count++) {
                let coluna = filtro.colunas[count];
                let cellClass = 'datatable-body-cell-align-left';
                if (coluna.alinhamento == 'DIREITA') {
                    cellClass = 'datatable-body-cell-align-right';
                } else if (coluna.alinhamento == 'CENTRO') {
                    cellClass = 'datatable-body-cell-align-center';
                }

                let col = {
                    prop: coluna.propriedade,
                    name: coluna.titulo,
                    width: parseInt((coluna.largura/10).toString()),
                    tipo: coluna.tipo,
                    mascara: coluna.mascara,
                    headerClass: '',
                    cellClass: cellClass,
                    pipeType: null,
                    pipeValue: null,
                    tipoColuna: coluna.tipoColuna,
                    alinhamento: coluna.alinhamento,
                    corTexto: coluna.corTexto,
                }

                let obj = this.formatarColuna(col);
                col.pipeType = obj.pipeType;
                col.pipeValue = obj.pipeValue;

                if (coluna.filtroPadrao == true) {
                    this.posColunaPadrao = count;
                }

                if (coluna.visivel == true) {
                    this.colunas.push(col);
                    this.widthTable += coluna.largura;
                    this.displayedColumns.push(col.prop);
                }

            }


            this.clausulas = filtro.colunas;
            this.nomeTela = filtro.tela.nome;
            this.modoColuna = filtro.modoColuna;
            if (this.clausulas.length > 0) {
                if (this.posColunaPadrao != null) {
                    this.clausula = this.clausulas[this.posColunaPadrao];
                } else {
                    this.clausula = this.clausulas[0];
                }
                this.onChangeClausula(this.clausula);
            }
            this.pesquisar();
        }
    }

    public onTableContextMenu(contextMenuEvent, item) {
        this.rawEvent = contextMenuEvent;
        // if (contextMenuEvent.type === 'body') {
        this.contextmenuRow = item;
        this.contextmenuColumn = undefined;
        // } else {
        //     this.contextmenuColumn = item;
        //     this.contextmenuRow = undefined;
        // }

        this.onSelect(null, null);

        contextMenuEvent.preventDefault();
        contextMenuEvent.stopPropagation();

        this.selection.selected[0] = item;

        if (this.contextMenuButtons && this.contextMenuButtons[0]) {
            let position = {
                top: contextMenuEvent.clientY + 'px',
                left: contextMenuEvent.clientX + 10 + 'px'
            }
            // this.contextMenu.open(position, this.contextMenuButtons, item);
        }
    }

    public onChangeClausula(clausula) {
        for (let w = 0; w < this.listaDeTipoOperadores.length; w++) {
            let op = this.listaDeTipoOperadores[w];
            if (clausula.tipo.toUpperCase() == op.type.toUpperCase()) {
                this.operadores = op.operadores;
                if (this.operadores.length > 0) {
                    this.operacao = this.operadores[0];
                }
            }
        }
    }

    public onChangeOperacao(operacao) {
        this.valor2 = '';
        if (operacao.operador.toUpperCase() == 'BETWEEN') {
            this.campo1 = 'DE';
        } else {
            this.campo1 = 'CONTEUDO';
        }
    }

    public filtrar(clausulas: any[]) {
        this.filter.page = 0;
        this.filter.start = 0;
        this.filter.clausulas = clausulas;
        this.filter.variaveis = this.variaveis;
        this.filter.idFiltro = this.filtro.id;
        let novaBusca = true;
        this.buscandoDados = true;
        this.selection.clear(); //selected = [];
        if (this.filtro.atualiza && this.webSocketOn) {
            this.filter.intervalo = this.filtro.intervaloAtualizacao;
            this.aposFiltrar();
            // this.zone.run(() => {
                this.filter.page = this.paginator.pageIndex;
                this.filter.start = this.paginator.pageIndex  * this.paginator.pageSize;
                this.filter.limit = this.paginator.pageSize;

                const me = this;
                let timeout = setTimeout(() => {
                    me.webSocketOn = false;
                    me.buscarDados();
                }, 30000);

                this.filtroService.iniciarAtualizacao(this.filter).subscribe(
                    (data: any, ) => {
                        clearTimeout(timeout);
                        this.webSocketOn = true;
                        this.buscandoDados = false;
                        let novos = []
                        this.filter.totalRegistros = data.totalRegistros == 0 ? this.filter.totalRegistros : data.totalRegistros;
                        // if(this.dataSource.tamanho == 0)this.dataSource.tamanho = this.filter.totalRegistros;
                        this.filter.variaveis = data.variaveis;
                        if (data.buscaComUltimaBusca == true && data.page === this.filter.page && novaBusca == false) {
                            let adeletar = [];
                            for (let cont =0; cont < data.data.length; cont++){
                                let achou = false;
                                let item = data.data[cont];
                                for (let i = 0; i < this.linhas.length; i++){
                                    
                                    if (item.id === this.linhas[i].id){
                                        if (item.deletado == true){
                                            adeletar.push(i);
                                        }
                                        this.linhas[i] = item;
                                        achou = true;
                                        break;
                                    }
                                }
                                
                                if (!achou) {
                                    if (item.deletado != true){
                                        novos.unshift(item);
                                    }
                                } 
                            }
                            novos.forEach(novo => {
                                this.linhas.unshift(novo);
                            });

                            if (adeletar.length > 0) {
                                for (let i = 0; i < adeletar.length; i++) {
                                    this.linhas.splice(adeletar[i], 1);
                                }
                            }
                        } else {
                            novaBusca = false;
                            this.linhas = data.data;
                        }
                        this.filter = data;
                        this.aposFiltrar();
                    }, err => {
                        this.webSocketOn = false;
                        // this.buscarDados().then(()=>{
                        //     this.buscandoDados = false;
                        // }).catch(()=>{
                        //     this.buscandoDados = false;
                        // });
                        throw err;
                    }, () => {
                        
                    }
                );
            // });
        } else {
            this.buscarDados().then(()=>{
                this.buscandoDados = false;
            }).catch(()=>{
                this.buscandoDados = false;
            });
        };

    }

    public getAcoes(linhas: any) {
        let returnAcoes: any[] = [];
        let x = 0;
        linhas.forEach(linha => {
            if (linha.acoes) {
                let acoesLinha = JSON.parse(linha.acoes.value);
                // this.acoesRegistro.push(acoesLinha);
                linha.acoes.value = acoesLinha;
            }
            // x++;
        });
    }

    public pesquisar() {
        if (this.valor1 != null && this.valor1 != '') {
            let condicao = null;
            if (this.valor1.trim().length > 0) {
                let value: any = this.valor1;

                if (this.operacao.operador == 'between') {
                    if (this.valor2 == null || this.valor2 == '') {
                        this.form.controls['valor2'].setErrors({ campoVazio: true });
                        return;
                    } else {
                        value = this.valor1 + ' - ' + this.valor2;
                    }
                }
                
                switch(this.clausula.tipo) {
                    case 'Long': value = parseInt(value); break;
                    case 'Integer': value = parseInt(value); break;
                    case 'Double': value = parseFloat(value); break;
                    case 'Float': value = parseFloat(value); break;                   
                }


                condicao = {
                    propriedade: this.clausula.variavel,
                    operador: this.operacao.operador,
                    titulo: this.clausula.titulo,
                    labelOperador: this.operacao.label,
                    tipo: this.clausula.tipo,
                    value:  value,
                    value1: this.valor1.trim().toUpperCase(),
                    value2: this.valor2.trim().toUpperCase()
                }

                if (this.condicoes.length > 0) {
                    let array = this.condicoes.slice();
                    array.push(condicao);
                    this.filtrar(array);
                } else {
                    this.filtrar([condicao]);
                }
            }
        } else {
            if (this.operacao.operador == 'between' && (this.valor2 != null && this.valor2 != '')) {
                this.form.controls['valor1'].setErrors({ campoVazio: true });
                return;
            } else {
                this.filtrar(this.condicoes);
            }
        }

    }    
    public validaCampos() {
        this.form.controls['valor1'].setErrors(null);
        this.form.controls['valor2'].setErrors(null);

        if (this.operacao.operador == 'between') {
            if (this.valor1 == null || this.valor1 == '') this.form.controls['valor1'].setErrors({ campoVazio: true });
            if (this.valor2 == null || this.valor2 == '') this.form.controls['valor2'].setErrors({ campoVazio: true });
            if (this.form.invalid) return false;
        } else {
            if (this.valor1 == null || this.valor1 == '') {
                this.form.controls['valor1'].setErrors({ campoVazio: true });
                return false;
            }
        }

        return true;
    }

    public adicionarClausula() {
        if (!this.validaCampos()) return;
        if (this.valor1.trim().length > 0) {
            let value = this.valor1;
            if (this.operacao.operador == 'between') {
                value = this.valor1 + ' - ' + this.valor2;
            }
            let condicao = {
                propriedade: this.clausula.variavel,
                operador: this.operacao.operador,
                titulo: this.clausula.titulo,
                labelOperador: this.operacao.label,
                value: value,
                value1: this.valor1,
                value2: this.valor2
            }
            let achou = false;
            for (let w = 0; w < this.condicoes.length; w++) {
                if (this.condicoes[w].propriedade === condicao.propriedade) {
                    this.condicoes[w] = condicao;
                    achou = true;
                    break;
                }
            }
            if (achou === false) {
                this.condicoes.push(condicao);
            }

            this.ajustarContainerFiltros();
        }
    }

    public ajustarContainerFiltros() {

    }

    public onSelect(event, index) {
        this.selectedIndex = index;

        if (this.selectMultiple != undefined) {
            if (this.selection.isSelected(event)) {
                this.selection.selected.splice(this.selection.selected.indexOf(event), 1);
                event.selected = false;
            } else {
                this.selection.selected.push(event);
                event.selected = true;
            }

            this.selection.toggle(event);
        } else {
            if (event.selected != true){
                event.selected = true;
                this.selection.select(event);
            }else {
                event.selected = false;
                this.selection.deselect(event);
            } 
        } 
    }

    public removerCondicao(condicao) {
        for (let w = 0; w < this.condicoes.length; w++) {
            if (this.condicoes[w].propriedade === condicao.propriedade) {
                this.condicoes.splice(w, 1);
                break;
            }
        }
    }

    public pararDeteccaoMudanca() {
        this.filtroService.pararAtualizacao(this.filtro.id);
    }

    public formatarColuna(coluna): {pipeType: string, pipeValue: any}{
        let obj = {
            pipeType: "normal",
            pipeValue: null
        }

        if(coluna.mascara == null || coluna.mascara == ''){
            return obj;
        }

        switch(coluna.tipo){
            case 'Date': case 'DateTime': case 'Timestamp': case 'Time': {
                obj.pipeType = 'date';
                obj.pipeValue = coluna.mascara;
                return obj;
            }
            case 'BigDecimal': case 'Double': case 'Long': {
                let mask = '';
                if (coluna.mascara.indexOf(',') > 0) {
                    mask = '1.';
                    let fracao = coluna.mascara.substr(coluna.mascara.indexOf(',') + 1);
                    let casas = fracao.length;
                    mask = mask + casas + '-' + casas;
                    if (coluna.mascara.indexOf('R$') >= 0) {
                        obj.pipeType = 'currency';
                        obj.pipeValue = mask;
                        return obj;
                    } else {
                        obj.pipeType = 'decimal';
                        obj.pipeValue = mask;
                        return obj;
                    }
                } else {
                    obj.pipeType = 'currency';
                    obj.pipeValue = '1.2-3';
                    return obj;
                }
            }
            case 'String': {
                return obj;
            }
            default: {
                return obj;
            }
        }
    }

    public formataCelula(value, coluna, linha) {
        if (!linha[coluna.prop + '_formattedvalue']) {
            if (coluna.mascara != null && coluna.mascara != undefined && coluna.mascara.length > 0) {
                switch (coluna.tipo) {
                    case 'Date': case 'DateTime': case 'Timestamp': case 'Time': {
                        return linha[coluna.prop + '_formattedvalue'] = new DatePipe('pt-BR').transform(value, coluna.mascara);
                    }
                    case 'BigDecimal': case 'Double': case 'Long': {
                        let mask = '';
                        if (value == '' || value == null) {
                            return value;
                        }
                        if (coluna.mascara.indexOf(',') > 0) {
                            mask = '1.';
                            let fracao = coluna.mascara.substr(coluna.mascara.indexOf(',') + 1);
                            let casas = fracao.length;
                            mask = mask + casas + '-' + casas;
                            if (coluna.mascara.indexOf('R$') > 0) {
                                return linha[coluna.prop + '_formattedvalue'] = new CurrencyPipe('pt-BR').transform(value, 'BRL', true, mask);
                            } else {
                                return linha[coluna.prop + '_formattedvalue'] = new DecimalPipe('pt-BR').transform(value, mask);
                            }
                        } else {
                            return linha[coluna.prop + '_formattedvalue'] = new CurrencyPipe('pt-BR').transform(value, 'BRL', true, '1.2-3');
                        }
                    }
                    case 'String': {
                        linha[coluna.prop + '_formattedvalue'] = value;
                        return value;
                    }
                    default: {
                        linha[coluna.prop + '_formattedvalue'] = value;
                        return value;
                    }
                }
            } else {
                linha[coluna.prop + '_formattedvalue'] = value;
                return value;
            }
        } else {
            return linha[coluna.prop + '_formattedvalue'];
        }
    }

    public buscarProximaPagina(paginator) {
        let qtdFilter = this.filter.limit * (this.filter.page + 1);
        let qtdPagina = (paginator.offset * paginator.pageSize);
        let percPagina = (qtdPagina * 100) / qtdFilter;
        if (percPagina >= 80 && this.filter.totalRegistros > qtdFilter && this.lastPage < paginator.offset) {
            this.lastPage = paginator.offset;
            this.filter.page++;
            this.filter.start += this.filter.limit;
            this.getListagem(paginator);
        }
    }

    public getListagem(paginator) {
        this.filtroService.filter(this.filter).subscribe((filter: any) => {
            this.linhas.push(...filter.data);
        });
    }

    public onChangeSort(event:any) {
        let coluna: Coluna = null;

        this.filtro.colunas.map((value) => {
            if (value.propriedade == event.active) {
                coluna = value
            }
        })

        if (coluna != null) {
            let index = null;
            this.filter.sorts.map((value, i) => {
                if (value.colunm == coluna.variavel) {
                    index = i;
                }
            })
            if (index != null) {
                if (event.direction == '') {
                    this.filter.sorts.splice(index, 1);
                } else {
                    this.filter.sorts[index].direction = event.direction;
                }
            } else {
                let sort = new Sort();
                sort.colunm = coluna.variavel
                sort.direction = event.direction
                this.filter.sorts.push(sort)
            }
            this.buscarDados();
        }
    }

    // MANIPULAÇÃO DE AJUSTE DE TAMANHO DAS COLUNAS
    private trackMouse(position: { x: number, y: number }) {
        if (this.selectedCol) {
            let width = this.selectedCol.width + (position.x - this.startMousePosition);

            if (width > 30) {
                this.selectedCol.width = width;
                this.startMousePosition = position.x;
            }
        }
    }

    public onColResizeStart(event, coluna) {
        this.startMousePosition = event.x;
        this.selectedCol = coluna;
        event.stopPropagation();
    }

    public onColResizeStop(event) {
        this.startMousePosition = null;
        this.selectedCol = null;
        event.stopPropagation();
        this.recalcularTamanhos();
    }
    //*************** */

    // /** Whether the number of selected elements matches the total number of rows. */
    // isAllSelected() {
    //     const numSelected = this.selection.selected.length;
    //     const numRows = this.dataSource.getLinhas().length;
    //     return numSelected === numRows;
    // }

    // /** Selects all rows if they are not all selected; otherwise clear selection. */
    // masterToggle() {
    //     if (this.isAllSelected()) {
    //         this.dataSource.getLinhas().forEach( row => {
    //             row.selected = false;
    //         })
    //         this.selection.clear();
    //     } else {
    //         this.dataSource.getLinhas().forEach(row => this.selection.select(row));
            
    //         // this.selection.selected = this.dataSource.getLinhas();
    //     }
    // }

    public isMobile() {
        let userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.search(/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i) != -1)
            return true;
        return false;
    }
}
