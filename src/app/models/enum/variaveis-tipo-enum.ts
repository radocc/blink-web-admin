export class VariaveisTipo {
    static map = {
        'noticia': [
            {nome: 'TITULO', campo: 'titulo'},
            {nome: 'DESCRICAO', campo: 'descricao'},
            {nome: 'LINK', campo: 'link'},
            {nome: 'DATA_PUBLICACAO', campo: 'datapublicacao'}
        ],
        'previsao': [
            {nome: 'DATA', campo: 'data'},
            {nome: 'TEMPO', campo: 'tempo'},
            {nome: 'MAXIMA', campo: 'maxima'},
            {nome: 'MINIMA', campo: 'minima'},
            {nome: 'IUV', campo: 'iuv'},
        ]
    }

    static getNome(tipo: string, campo: string): string {
        let result: string;
        this.map[tipo].forEach(variavel => {
            if (variavel.campo == campo) {
                result = variavel.nome;
            }
        });
        return result;
    }
}