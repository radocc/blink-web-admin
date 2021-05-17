export class VariaveisTipo {
    static map = {
        'noticia': [
            {nome: 'TITULO', campo: 'titulo'},
            {nome: 'DESCRICAO', campo: 'descricao'},
            {nome: 'LINK', campo: 'link'},
            {nome: 'DATA_PUBLICACAO', campo: 'datapublicacao'}
        ],
        'previsao': [
            {nome: 'CIDADE', campo: 'cidade'},
            {nome: 'DATA', campo: 'data'},
            {nome: 'TEMPO', campo: 'tempo'},
            {nome: 'MAXIMA', campo: 'maxima'},
            {nome: 'MINIMA', campo: 'minima'},            
            {nome: 'IUV', campo: 'iuv'},
            {nome: 'URL', campo: 'url'},
            {nome: 'DESCRICAO', campo: 'descricao'},
            {nome: 'CUSTOMIZADO', campo: 'variavelCustomizado'}
        ],
        'loteria': [
            {nome: 'DATA_SORTEIO', campo: 'dataSorteio'},
            {nome: 'NUMEROS', campo: 'numeros'},
            {nome: 'NUMEROS2', campo: 'numeros2'},
            {nome: 'CODIGO_SORTEIO', campo: 'codigoSorteio'},
            {nome: 'DATA_PROXIMO_SORTEIO', campo: 'dataProximoSorteio'},            
            {nome: 'VALOR_PROXIMO_SORTEIO', campo: 'valorProximoSorteio'},
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