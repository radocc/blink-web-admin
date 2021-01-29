import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuModule} from 'primeng/menu';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {FileUploadModule} from 'primeng/fileupload';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {DialogModule} from 'primeng/dialog';
import {ListboxModule} from 'primeng/listbox';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MenuModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    CalendarModule,
    RadioButtonModule,
    FileUploadModule,
    MessagesModule,
    MessageModule,
    DialogModule,
    ListboxModule
  ],
  exports:[
    ButtonModule,
    MenuModule,
    InputTextModule,
    CheckboxModule,
    CalendarModule,
    RadioButtonModule,
    FileUploadModule,
    MessagesModule,
    MessageModule,
    DialogModule,
    ListboxModule
  ]
})
export class NgPrimeModule { }
