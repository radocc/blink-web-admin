import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
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
    exports: [GridPesquisaComponent]
})
export class GridPesquisaModule {}