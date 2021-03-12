import { Events } from './../../models/enum/events';
import { EventBrokerService } from 'ng-event-broker';
import { OnDestroy, OnInit, ViewChild } from "@angular/core";
import { PageCadastroComponent } from "./pagecadastro.component";

export abstract class  CadForm implements OnInit, OnDestroy {
    @ViewChild(PageCadastroComponent, {static: true}) page: PageCadastroComponent;
    private eventEditar:any;
    private eventVisualizar:any;

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
    }

    ngOnDestroy(){
        this.eventEditar.unsubscribe();
        this.eventVisualizar.unsubscribe();
    }

    public abstract buscar(id:number, editavel:boolean):void;

}