import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterActionComponent } from 'app/componentes/register-action/register-action.component';
import { NgPrimeModule } from 'app/ngprime/ngprime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RegisterActionComponent
  ],
  exports:[
    RegisterActionComponent
  ],
  imports: [
    CommonModule,
    NgPrimeModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DevComponentModule { }
