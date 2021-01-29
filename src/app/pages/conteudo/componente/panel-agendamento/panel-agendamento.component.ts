import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConteudoAgendamento } from '@radoccmodels/conteudoagendamento';

@Component({
  selector: 'app-panel-agendamento-conteudo',
  templateUrl: './panel-agendamento.component.html',
  styleUrls: ['./panel-agendamento.component.scss']
})
export class PanelAgendamentoComponent implements OnInit {

  public form:FormGroup = new FormGroup({
    dataInicio:new FormControl(new Date(), [Validators.required]),
    dataFim:new FormControl(null, [Validators.required]),
    horaInicio:new FormControl(),
    horaFim:new FormControl()
  })
  public modoHorario:string = '1';
  public diaSemana:string[] = ['0','1','2','3','4','5','6','7'];
  public conteudoAgendamento:ConteudoAgendamento;

  constructor() { }

  ngOnInit(): void { 
  }

  onClickDiaSemana(event,dia){
    if (event.checked){
      if (this.diaSemana.length == 7){
        this.diaSemana.push('0');
      }
    }else {
      /**
       * Remover a marcação de todos
       */
      let index = this.diaSemana.indexOf('0');
      if (index >-1){
        this.diaSemana.splice(index,1);
      }
      
    }
  }

  public onClickTodos(event){
    if (event.checked){
      this.diaSemana = ['0','1','2','3','4','5','6','7'];
    }else{
      this.diaSemana = [];
    }
  }

  public validar():boolean{

    return true;
  }

  public getAgendamento():ConteudoAgendamento{
    if (this.validar() ==false){
      return null;
    }
    if (this.conteudoAgendamento == null){
      this.conteudoAgendamento = new ConteudoAgendamento();
    }
    this.conteudoAgendamento.dataInicio = this.form.controls['dataInicio'].value;
    this.conteudoAgendamento.dataFim = this.form.controls['dataFim'].value;
    if (this.modoHorario == '1'){
      let hrInicio = new Date();
      hrInicio.setHours(0,1);
      this.conteudoAgendamento.horaInicio = hrInicio;
      let hrFim = new Date();
      hrFim.setHours(23,58);
      this.conteudoAgendamento.horaFim = hrFim;
    }else {
      this.conteudoAgendamento.horaInicio = this.form.controls['horaInicio'].value;
      this.conteudoAgendamento.horaFim = this.form.controls['horaFim'].value;
    }    
    this.conteudoAgendamento.diasSemana = this.diaSemana.join(',');
    
    return this.conteudoAgendamento;
  }

  public setAgendamento(agendamento:ConteudoAgendamento){
    this.conteudoAgendamento = agendamento;
    this.form.controls['dataInicio'].setValue(agendamento.dataInicio);
    if (agendamento.dataFim){
      this.form.controls['dataFim'].setValue(agendamento.dataFim);
    }
    this.form.controls['horaInicio'].setValue(agendamento.horaInicio);
    this.form.controls['horaFim'].setValue(agendamento.horaFim);
    this.diaSemana = agendamento.diasSemana.split(',');

  }

  public reset(){
    this.form.reset();
    this.conteudoAgendamento = null;
  }
}
