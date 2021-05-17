class ETextAlinhamento {
    
    static readonly LEFT = new ETextAlinhamento('Left');
    static readonly RIGHT = new ETextAlinhamento('Right');
    static readonly CENTER = new ETextAlinhamento('Center');
    

    static get values(): ETextAlinhamento[] {
      return [
        this.LEFT,
        this.RIGHT,
        this.CENTER
      ];
    }

    static fromString(string: string): ETextAlinhamento {
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
  
  export default ETextAlinhamento;