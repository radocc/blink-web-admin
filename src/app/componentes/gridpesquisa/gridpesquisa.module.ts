import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DireitoGrupoService } from "@radoccservices/base/direitogrupo-service";
import { FiltroService } from "@radoccservices/base/filtro-service";
import { ShareTranslateModule } from "app/modules/share-translate/share-translate.module";
import { NgPrimeModule } from "app/ngprime/ngprime.module";
import { GridPesquisaComponent } from "./gridpesquisa.component";

@NgModule({
    declarations: [
        GridPesquisaComponent
    ],
    imports: [
        CommonModule,
        NgPrimeModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        ShareTranslateModule,
    ],
    providers: [
        FiltroService,
        DireitoGrupoService,
        
    ],
    exports: [GridPesquisaComponent]
})
export class GridPesquisaModule {}