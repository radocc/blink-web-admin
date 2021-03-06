import { Events } from './../../models/enum/events';
import { EventBrokerService } from 'ng-event-broker';
import { OnDestroy, OnInit, ViewChild } from "@angular/core";
import { PageCadastroComponent } from "./pagecadastro.component";
import { FormGroup } from '@angular/forms';
import { Table } from 'primeng/table';
import { BaseEntityImpl } from '@radoccmodels/baseentityimpl';

export abstract class CadForm implements OnInit, OnDestroy {
    @ViewChild(PageCadastroComponent, {static: true}) page: PageCadastroComponent;
    private eventEditar:any;
    private eventVisualizar:any;
    private eventNovo:any;

    constructor(public eventService:EventBrokerService){

    }

    ngOnInit(): void {
        this.eventEditar = this.eventService.subscribeEvent(Events.editar).subscribe((obj:{id:number})=>{
            this.buscar(obj.id,true);            
        });        
        this.eventVisualizar = this.eventService.subscribeEvent(Events.visualizar).subscribe((obj:{id:number})=>{
            this.buscar(obj.id,false);
            this.page.disableSalvar();
        });
        this.eventNovo = this.eventService.subscribeEvent(Events.novo).subscribe(() => {
            this.novo();
        });

        this.page.cancelar = () => {
            this.novo();
        }
    }

    ngOnDestroy(){
        if (this.eventEditar){
            this.eventEditar.unsubscribe();
        }
        if (this.eventVisualizar){
            this.eventVisualizar.unsubscribe();
        }
        if (this.eventNovo){
            this.eventNovo.unsubscribe();
        }

    }

    public abstract buscar(id:number, editavel:boolean):void;
    public novo(): void {
        this.page.novo();
    };

}