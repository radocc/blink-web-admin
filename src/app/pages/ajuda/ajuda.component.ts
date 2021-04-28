import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ajuda',
  templateUrl: './ajuda.component.html',
  styleUrls: ['./ajuda.component.scss']
})
export class AjudaComponent implements OnInit {
  public config: {
    titulo: string,
    subTitle: string,
    btnSalvar: string;
  } = {
      titulo: 'AJUDA',
      subTitle: '',
      btnSalvar: 'SALVAR'
    }

  constructor() { }

  public form: FormGroup = new FormGroup({});

  ngOnInit(): void {
  }

}
