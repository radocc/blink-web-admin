import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { Loteria } from '@radoccmodels/loteria';
import { ArquivoService } from '@radoccservices/base/arquivo-service';
import { LoteriaService } from '@radoccservices/loteria-services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-loteria-cadastro',
  templateUrl: './loteria-cadastro.component.html',
  styleUrls: ['./loteria-cadastro.component.scss'],
  providers:[ 
    MessageService,LoteriaService
  ]
})
export class LoteriaCadastroComponent implements OnInit {

  public form:FormGroup = new FormGroup({
    nome:new FormControl('', Validators.required)    
  }) 
  
  public loteria:Loteria;

  constructor(private msgService:MessageService, private loteriaService:LoteriaService) {

  }

  ngOnInit(): void { 
  } 
  
  public salvar(){    
    if (this.form.invalid){
      this.msgService.add({
        severity:'error', summary:'Campos inválidos', detail:'Verifique os campos com asterisco vermelho'
      })
      return ;
    }
    if (this.loteria == null){
      this.loteria = new Loteria();
    }
    this.loteria.nome = this.form.controls['nome'].value;
    
    this.loteriaService.save(this.loteria).subscribe((loteria)=>{
      this.loteria = loteria;
    }, error=>{
      console.log(error);
    })
  }

  public publicar(){

  }

  public preview(){

  }

  public importar(){

  }

}
