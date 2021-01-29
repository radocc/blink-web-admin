import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-register-action',
  templateUrl: './register-action.component.html',
  styleUrls: ['./register-action.component.scss']
})
export class RegisterActionComponent implements OnInit {

  @Output('onSalvar') public onSalvar: EventEmitter<any> = new EventEmitter();
  @Output('onPublicar') public onPublicar: EventEmitter<any> = new EventEmitter();
  @Output('onPreview') public onPreview: EventEmitter<any> = new EventEmitter();
  @Output('onImportar') public onImportar: EventEmitter<any> = new EventEmitter();
  @Input("permiteSalvar") public permiteSalvar:boolean = true;
  @Input("permitePublicar") public permitePublicar:boolean = true;
  @Input("permitePreview") public permitePreview:boolean = true;
  @Input("permiteImportar") public permiteImportar:boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  public salvar(){
    if (this.onSalvar){
      this.onSalvar.emit();
    }
  }

  public publicar(){
    if (this.onPublicar){
      this.onPublicar.emit();
    }
  }

  public preview(){
    if (this.onPreview){
      this.onPreview.emit();
    }
  }

  public importar(){
    if (this.onImportar){
      this.onImportar.emit();
    }
  }
}
