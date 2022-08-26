import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../user-pages/auth.guard';
import { Error404Component } from '../error-pages/error404/error404.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionEleveComponent } from './gestion-eleve/gestion-eleve.component';
import { EditEleveComponent } from './gestion-eleve/edit-eleve/edit-eleve.component';
import { AddEleveComponent } from './gestion-eleve/add-eleve/add-eleve.component';
import { EnseignantComponent } from './enseignant/enseignant.component';
import { EditProfilComponent } from '../user-pages/edit-profil/edit-profil.component';
import { EtablissementComponent } from './etablissement/etablissement.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'eleves', component: GestionEleveComponent },
      { path: 'etablissement', component: EtablissementComponent },
      { path: 'edit-profil', component: EditProfilComponent },
      { path: 'editeleves', component: EditEleveComponent },
      { path: 'add-eleves', component: AddEleveComponent },
      { path: 'enseignant', component: EnseignantComponent },
      { path: 'basic-ui', loadChildren: () => import('../basic-ui/basic-ui.module').then(m => m.BasicUiModule) },
      { path: 'charts', loadChildren: () => import('../charts/charts.module').then(m => m.ChartsDemoModule) },
      { path: 'forms', loadChildren: () => import('../forms/form.module').then(m => m.FormModule) },
      { path: 'tables', loadChildren: () => import('../tables/tables.module').then(m => m.TablesModule) },
      { path: 'icons', loadChildren: () => import('../icons/icons.module').then(m => m.IconsModule) },
      { path: 'general-pages', loadChildren: () => import('../general-pages/general-pages.module').then(m => m.GeneralPagesModule) },
      { path: 'apps', loadChildren: () => import('../apps/apps.module').then(m => m.AppsModule) },
      { path: 'error-pages', loadChildren: () => import('../error-pages/error-pages.module').then(m => m.ErrorPagesModule) },

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: Error404Component,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
