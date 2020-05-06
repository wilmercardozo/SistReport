import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { ReporteTiemposComponent } from '../../pages/reporte-tiempos/reporte-tiempos.component';
import { ProyectosComponent } from '../../pages/proyectos/proyectos.component';
import { ParametrosComponent } from '../../pages/parametros/parametros.component';
import { UsuariosComponent } from '../../pages/usuarios/usuarios.component';
import { RolesComponent } from '../../pages/roles/roles.component';
import { PaginasComponent } from '../../pages/paginas/paginas.component';
import { NotificacionesComponent } from '../../pages/notificaciones/notificaciones.component';
import { AprobacionHorasComponent } from '../../pages/aprobacion-horas/aprobacion-horas.component';
import { AprobacionAutomaticosComponent } from '../../pages/aprobacion-automaticos/aprobacion-automaticos.component';
import { HorasAutomaticasComponent } from '../../pages/horas-automaticas/horas-automaticas.component';
import { SeguimientoEquiposComponent } from '../../pages/seguimiento-equipos/seguimiento-equipos.component';


export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'proyectos', component: ProyectosComponent },
    { path: 'parametros', component: ParametrosComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'roles', component: RolesComponent },
    { path: 'paginas', component: PaginasComponent },
    { path: 'notificaciones', component: NotificacionesComponent },
    { path: 'reporteTiempos', component: ReporteTiemposComponent },
    { path: 'aprobacionHoras', component: AprobacionHorasComponent },
    { path: 'aprobacionAutomaticos', component: AprobacionAutomaticosComponent },
    { path: 'horasAutomaticas', component: HorasAutomaticasComponent },
    { path: 'seguimientoEquipos', component: SeguimientoEquiposComponent },
];
