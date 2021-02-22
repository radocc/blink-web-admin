import { ViewChild } from "@angular/core";
import { PageCadastroComponent } from "./pagecadastro.component";

export class CadForm {
    @ViewChild(PageCadastroComponent, {static: true}) page: PageCadastroComponent;
}