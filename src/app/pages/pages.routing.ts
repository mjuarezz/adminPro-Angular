import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';



const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'account-settings',component: AccountSettingsComponent, data: { titulo: 'Account Settings' } },
            { path: 'grafica1',component: Grafica1Component, data: { titulo: 'Gráfica #1' } },
            { path: 'profile',component: PerfilComponent, data: { titulo: 'Profile' } },
            { path: 'progress',component: ProgressComponent, data: { titulo: 'ProgressBar' } },
            { path: 'promesas',component: PromesasComponent, data: { titulo: 'Promesa' } },
            { path: 'rxjs',component: RxjsComponent, data: { titulo: 'RxJs' } },


            // Mantenimientos
            { path: 'usuarios',component: UsuariosComponent, data: { titulo: 'Usuarios de aplicación' } },
            { path: 'medicos',component: MedicosComponent, data: { titulo: 'Profesionales de la medicina' } },
            { path: 'hospitales',component: HospitalesComponent, data: { titulo: 'Centros hospitalarios' } },

        ]
    },
    
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class PagesRoutingModule {}
