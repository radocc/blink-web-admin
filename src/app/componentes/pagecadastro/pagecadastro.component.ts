import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-pagecadastro',
  templateUrl: './pagecadastro.component.html',
  styleUrls: ['./pagecadastro.component.scss']
})
export class PageCadastroComponent implements OnInit {

  @Input("config") public config:{
    titulo:string,
    subTitle:string,
    btnSalvar:string;
  }={
    titulo:'Unidade',
    subTitle:'',
    btnSalvar:'SALVAR'
  }
  @Input('form') public form:FormBuilder;
  @Input() translateParams: any[];
  @Input() mostraVoltar: boolean = true;
  @Output("save") onSave:EventEmitter<any> = new EventEmitter();

  constructor(private location:Location) { }

  ngOnInit(): void {
  }

  public validarForm():boolean{

    return true;
  }

  

  public salvar(){
    this.onSave.emit(this.form);
  }

  public cancelar(){
    this.location.back();    
  }

  public voltar() {
    this.location.back();
  }

}
