import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgPrimeModule } from 'app/ngprime/ngprime.module';
import { ShareTranslateModule } from '@radoccmodules/share-translate/share-translate.module';
import { RegisterActionComponent } from '@radocccomponentes/register-action/register-action.component';


@NgModule({
  declarations: [
    RegisterActionComponent
  ],
  imports: [
    CommonModule,
    NgPrimeModule,
    ShareTranslateModule,
  ],
  exports:[
    RegisterActionComponent
  ]
})
export class RegisterActionModule { }
