import { CadForm } from '@radocccomponentes/pagecadastro/cadform'; 
import { EventBrokerService } from 'ng-event-broker';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';  
import { MessageService } from 'primeng/api';  
import { PrevisaoTempo } from '@radoccmodels/previsaotempo';
import { PrevisaoTempoService } from '@radoccservices/previsaotempo-service';
import { Cidade } from '@radoccmodels/base/cidade';

@Component({
  selector: 'app-previsaotempo-cadastro',
  templateUrl: './previsaotempo-cadastro.component.html',
  styleUrls: ['./previsaotempo-cadastro.component.scss'],
  providers:[ 
    MessageService,PrevisaoTempoService
  ]
})
export class PrevisaoTempoCadastroComponent extends CadForm implements OnInit {
  public config:{
    titulo:string,
    subTitle:string,
    btnSalvar:string;
  }={
    titulo:'PREVISAO_DO_TEMPO',
    subTitle:'',
    btnSalvar:'SALVAR'
  }
  
  public form:FormGroup = new FormGroup({
    cidade:new FormControl({value:null,disabled:true}, Validators.required),
    jsonDatas:new FormControl({value:null,disabled:true}),
  }) 
  public previsao:PrevisaoTempo;
  public cidades:Cidade[] = [];
  constructor(public eventService:EventBrokerService, private previsaoService:PrevisaoTempoService) {
    super(eventService)
  }

  ngOnInit(): void { 
    super.ngOnInit();
  } 

  public novo() {
    super.novo();
  }

  public buscar(id:number, editavel:boolean){
    this.previsaoService.findById(id).subscribe((tipo)=>{
      this.montarForm(tipo,editavel);
    })
  }
  
  public montarForm(previsao:PrevisaoTempo, editavel:boolean){
    this.previsao = previsao;
    this.cidades = [previsao.cidade];
    this.form.controls['cidade'].setValue(previsao.cidade, {emitEvent:false});
    this.form.controls['jsonDatas'].setValue(JSON.stringify(JSON.parse(previsao.jsonDatas),null,2), {emitEvent:false});
    
  }
  
  public salvar(event){    
    if (this.form.invalid){
      this.page.showWarnMsg('EXISTEM_CAMPOS_INVALIDOS');
      return ;
    }
  
    // this.previsaoService.save(this.previsaoImagem).subscribe((equipamento)=>{
    //   this.previsaoImagem = equipamento;
    //   this.page.showSuccessMsg('SALVO_COM_SUCESSO');
    //   this.eventService.publishEvent(Events.atualizarLista);
    // }, error=>{
    //   this.page.showErrorMsg('FALHA_AO_SALVAR');
    //   console.log(error);
    // })
  }

}
