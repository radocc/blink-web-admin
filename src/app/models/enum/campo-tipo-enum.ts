class ECampoTipo {
    
    static readonly TEXT = new ECampoTipo('Texto', 1);
    static readonly INTEGER = new ECampoTipo('Inteiro', 2);
    static readonly DOUBLE = new ECampoTipo('Decimal', 3);
    static readonly IMAGE = new ECampoTipo('Imagem', 4);
    static readonly DATE = new ECampoTipo('Data', 5);
    static readonly DATETIME = new ECampoTipo('Data e Hora', 6);
    static readonly COTACAO = new ECampoTipo('Cotacao', 7);

    static get values(): ECampoTipo[] {
      return [
        this.TEXT,
        this.INTEGER,
        this.DOUBLE,
        this.IMAGE,
        this.DATE,
        this.DATETIME,
        this.COTACAO
      ];
    }

    static fromString(string: string): ECampoTipo {
      const value = (this as any)[string];
      if (value) {
        return value;
      }
  
      throw new RangeError(
        `Illegal argument passed to fromString(): ${string} does not correspond to any instance of the enum ${
          (this as any).prototype.constructor.name
        }`
      );
    }

    private constructor(
      public readonly name: string,
      public readonly cod: number,
    ) {}
  
    public toJSON() {
      return this.name;
    }
  }
  
  export default ECampoTipo;