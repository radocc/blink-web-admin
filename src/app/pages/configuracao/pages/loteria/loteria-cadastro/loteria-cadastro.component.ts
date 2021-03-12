import { CadForm } from '@radocccomponentes/pagecadastro/cadform';
import { Events } from './../../../../../models/enum/events';
import { EventBrokerService } from 'ng-event-broker';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { PageCadastroComponent } from '@radocccomponentes/pagecadastro/pagecadastro.component';
import { Loteria } from '@radoccmodels/loteria';
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
export class LoteriaCadastroComponent extends CadForm implements OnInit {
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

  constructor(private msgService:MessageService, private loteriaService:LoteriaService,
    public eventService: EventBrokerService) {
      super(eventService)

  }

  ngOnInit(): void { 
  } 
  
  public buscar(id:number, editavel:boolean){
    this.loteriaService.findById(id).subscribe((loteria)=>{
      this.montarForm(loteria,editavel);
    })
  }

  public montarForm(loteria:Loteria, editavel){
    this.loteria = loteria;
    this.form.controls['nome'].setValue(loteria.nome, {emitEvent:false});
    this.form.controls['url'].setValue(loteria.url, {emitEvent:false});
    
    if (editavel == false){
      this.form.disable();
    }    
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
      this.eventService.publishEvent(Events.atualizarLista);
    }, error=>{
      console.log(error);
      this.pageCadastro.showErrorMsg("FALHA_AO_SALVAR");
    })
  }
 

}
