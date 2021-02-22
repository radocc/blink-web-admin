class EFontFamily {
    
    static readonly ARIAL = new EFontFamily('Arial');
    static readonly CALIBRI = new EFontFamily('Calibri');
    static readonly HELVETICA = new EFontFamily('Helvetica');
    static readonly ROBOTO = new EFontFamily('Roboto');
    static readonly VERDANA = new EFontFamily('Verdana');
    

    static get values(): EFontFamily[] {
      return [
        this.ARIAL,
        this.CALIBRI,
        this.HELVETICA,
        this.ROBOTO,
        this.VERDANA,
      ];
    }

    static fromString(string: string): EFontFamily {
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
    ) {}
  
    public toJSON() {
      return this.name;
    }
  }
  
  export default EFontFamily;