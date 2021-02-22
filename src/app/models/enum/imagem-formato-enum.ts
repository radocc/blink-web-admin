class EImagemFormato {
    
    static readonly QUADRADA = new EImagemFormato('Quadrada', 1);
    static readonly REDONDA = new EImagemFormato('Redonda', 2);

    static get values(): EImagemFormato[] {
      return [
        this.QUADRADA,
        this.REDONDA,
      ];
    }

    static fromString(string: string): EImagemFormato {
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
  
  export default EImagemFormato;