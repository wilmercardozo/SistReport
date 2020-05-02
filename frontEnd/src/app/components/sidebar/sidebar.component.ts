import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { MenuModel } from 'src/app/model/menu.model';
import { MenuService } from 'src/app/services/menu.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

declare interface Paginas {
  rol: string;
  icon: string;
  isCollapsed: boolean;
  paginas: RouteInfo[];
}

export const ROUTES: Paginas[] = [
  {
    rol: 'Administración',
    icon: 'ni ni-books text-primary',
    isCollapsed: true,
    paginas:
      [
        { path: '/proyectos', title: 'Proyectos', icon: 'ni ni-app text-primary', class: '' },
        { path: '/parametros', title: 'Parametros', icon: 'ni ni-settings text-primary', class: '' },
        { path: '/usuarios', title: 'Usuarios', icon: 'ni ni-circle-08 text-primary', class: '' },
        { path: '/roles', title: 'Roles', icon: 'fa fa-users text-primary', class: '' },
        { path: '/paginas', title: 'Paginas', icon: 'ni ni-archive-2 text-primary', class: '' },
        { path: '/notificaciones', title: 'Notificaciones', icon: 'ni ni-archive-2 text-primary', class: '' }
      ]
  },
  {
    rol: 'Reporte tiempos',
    icon: 'ni ni-time-alarm text-pink',
    isCollapsed: true,
    paginas:
      [
        { path: '/reporteTiempos', title: 'Registro horas', icon: 'ni ni-watch-time text-pink', class: '' }
      ]
  },
  {
    rol: 'Valoración registros',
    icon: 'ni ni-ruler-pencil text-orange',
    isCollapsed: true,
    paginas:
      [
        { path: '/aprobacionHoras', title: 'Aprobación horas', icon: 'ni ni-check-bold text-orange', class: '' },
        { path: '/aprobacionAutomaticos', title: 'Aprobación Automaticos', icon: 'fa fa-check-square text-orange', class: '' }
      ]
  },
  {
    rol: 'Automatización',
    icon: 'fa fa-cogs text-yellow',
    isCollapsed: true,
    paginas:
      [
        { path: '/horasAutomaticas', title: 'Horas automaticas', icon: 'fa fa-hourglass-half text-yellow', class: '' }
      ]
  },
  {
    rol: 'Seguimiento',
    icon: 'fa fa-search text-red',
    isCollapsed: true,
    paginas:
      [
        { path: '/seguimientoEquipos', title: 'Seguimiento Equipo', icon: 'fa fa-search-plus text-red', class: '' }
      ]
  },
  {
    rol: 'Reportes',
    icon: 'fa fa-clone text-info',
    isCollapsed: true,
    paginas:
      [
        { path: '/reporte1', title: 'Reporte 1', icon: 'fa fa-file text-info', class: '' },
        { path: '/reporte2', title: 'Reporte 2', icon: 'fa fa-file text-info', class: '' },
        { path: '/reporte3', title: 'Reporte 3', icon: 'fa fa-file text-info', class: '' }
      ]
  }
];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  private menu: MenuModel = new MenuModel();
  public menuItems: any[];
  public isCollapsed = true;
  public PROP: any[];

  constructor(private router: Router, private menuService: MenuService) { }

  ngOnInit() {

    //this.obtenerMenu();

    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
    });

  }


  sideBarCollapse(id: string) {
    this.menuItems.forEach((menu: Paginas) => {
      if (menu.rol === id) {
        menu.isCollapsed = !menu.isCollapsed;
      } else {
        menu.isCollapsed = true;
      }
    });

  }

  obtenerMenu() {

    this.menuService.obtenerMenu()
      .subscribe((resp: MenuModel) => {

        this.menu = resp;

      }, (error) => {

        console.log(error);

      });

  }



}
