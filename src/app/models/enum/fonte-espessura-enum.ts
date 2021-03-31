class EFonteEspessura {
    
    static readonly EXTRA_LIGHT = new EFonteEspessura('EXTRA_LIGHT', 1, 100);
    static readonly LIGHT = new EFonteEspessura('LIGHT', 2, 300);
    static readonly REGULAR = new EFonteEspessura('REGULAR', 3, 400);
    static readonly MEDIUM = new EFonteEspessura('MEDIUM', 4, 600);
    static readonly BOLD = new EFonteEspessura('BOLD', 5, 700);
    static readonly EXTRA_BOLD = new EFonteEspessura('EXTRA_BOLD', 6, 900);

    static get values(): EFonteEspessura[] {
      return [
        this.EXTRA_LIGHT,
        this.LIGHT,
        this.REGULAR,
        this.MEDIUM,
        this.BOLD,
        this.EXTRA_BOLD
      ];
    }

    static fromString(string: string): EFonteEspessura {
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
      public readonly value: number,
    ) {}
  
    public toJSON() {
      return this.name;
    }
  }
  
  export default EFonteEspessura;