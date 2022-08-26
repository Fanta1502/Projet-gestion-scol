import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ChartsModule } from "ng2-charts";
import { TodoListComponent } from "../apps/todo-list/todo-list.component";
import { TodoComponent } from "../apps/todo-list/todo/todo.component";
import { ContentAnimateDirective } from "../shared/directives/content-animate.directive";
import { FooterComponent } from "../shared/footer/footer.component";
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { SidebarComponent } from "../shared/sidebar/sidebar.component";
import { SpinnerComponent } from "../shared/spinner/spinner.component";
import { EditProfilComponent } from "../user-pages/edit-profil/edit-profil.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EnseignantComponent } from "./enseignant/enseignant.component";
import { AddEleveComponent } from "./gestion-eleve/add-eleve/add-eleve.component";
import { EditEleveComponent } from "./gestion-eleve/edit-eleve/edit-eleve.component";
import { GestionEleveComponent } from "./gestion-eleve/gestion-eleve.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { PagesComponent } from "./pages.component";
import { EtablissementComponent } from './etablissement/etablissement.component';
import { AddEtablissementComponent } from './etablissement/add-etablissement/add-etablissement.component';
import { AddEnseignantComponent } from './enseignant/add-enseignant/add-enseignant.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgbModule,
  ],
  declarations: [
    PagesComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    TodoListComponent,
    TodoComponent,
    SpinnerComponent,
    ContentAnimateDirective,
    GestionEleveComponent,
    EnseignantComponent,
    AddEleveComponent,
    EditEleveComponent,
    EditProfilComponent,
    EtablissementComponent,
    AddEtablissementComponent,
    AddEnseignantComponent
  ],
  providers: [],
})
export class PagesModule {
}
