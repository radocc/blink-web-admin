import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { PageCadastroComponent } from '@radocccomponentes/pagecadastro/pagecadastro.component';
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
  public config:{
    titulo:string,
    subTitle:string,
    btnSalvar:string;
  }={
    titulo:'LOTERIA',
    subTitle:'',
    btnSalvar:'SALVAR'
  }
  @ViewChild("pageCadastro") public pageCadastro:PageCadastroComponent
  
  public form:FormGroup = new FormGroup({
    nome:new FormControl('', Validators.required),
    url:new FormControl('', Validators.required)    
  }) 
  
  public loteria:Loteria;

  constructor(private msgService:MessageService, private loteriaService:LoteriaService) {

  }

  ngOnInit(): void { 
  } 
  
  public salvar(event){    
    if (this.form.invalid){
      this.pageCadastro.showWarnMsg('EXISTEM_CAMPOS_OBRIGATORIOS');
      return ;
    }
    if (this.loteria == null){
      this.loteria = new Loteria();
    }
    this.loteria.nome = this.form.controls['nome'].value;
    this.loteria.url = this.form.controls['url'].value;
    this.loteriaService.save(this.loteria).subscribe((loteria)=>{
      this.loteria = loteria;
      this.pageCadastro.showSuccessMsg('SALVO_COM_SUCESSO');
    }, error=>{
      console.log(error);
      this.pageCadastro.showErrorMsg("FALHA_AO_SALVAR");
    })
  }
 

}
