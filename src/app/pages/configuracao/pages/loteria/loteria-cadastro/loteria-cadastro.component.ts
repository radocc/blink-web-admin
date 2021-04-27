import { CadForm } from '@radocccomponentes/pagecadastro/cadform';
import { Events } from './../../../../../models/enum/events';
import { EventBrokerService } from 'ng-event-broker';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { PageCadastroComponent } from '@radocccomponentes/pagecadastro/pagecadastro.component';
import { Loteria } from '@radoccmodels/loteria';
import { LoteriaService } from '@radoccservices/loteria-services';
import { MessageService } from 'primeng/api';
import { LoteriaResultado } from '@radoccmodels/loteriaresultado';

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
    url:new FormControl('', Validators.required),
    dataAtualizacao:new FormControl({disabled:true}),
    resultado:new FormControl({disabled:true})
  }) 
  
  public loteria:Loteria;
  public resultado:LoteriaResultado;

  constructor(private msgService:MessageService, private loteriaService:LoteriaService,
    public eventService: EventBrokerService) {
      super(eventService)

  }

  ngOnInit(): void { 
    super.ngOnInit();        
  } 
  
  public novo(){
    super.novo();
    this.loteria = null;
    this.resultado = null;
  }

  public buscar(id:number, editavel:boolean){
    this.loteriaService.findById(id).subscribe((loteria)=>{
      this.montarForm(loteria,editavel);
      this.ultimoResultado();
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

  public atualizarResultado(){
    this.loteriaService.atualizarResultado(this.loteria.id).subscribe((result)=>{
      this.ultimoResultado();
    })
  }

  public ultimoResultado(){
    this.loteriaService.ultimoResultado(this.loteria.id).subscribe((result)=>{
      this.resultado = result;
      if (this.resultado != null){
        let dtAtualizacao = new Date(this.resultado.dataAtualizacao);
        this.form.controls['dataAtualizacao'].setValue(dtAtualizacao);
        this.form.controls['resultado'].setValue(JSON.stringify(this.resultado,null,2));
      }
    })
  }
}
