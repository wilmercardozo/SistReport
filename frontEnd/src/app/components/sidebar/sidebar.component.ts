import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { MenuModel } from 'src/app/model/menu.model';
import { MenuService } from 'src/app/services/menu.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  private menu: MenuModel [] = [] ;
  public menuItems: any[];
  public isCollapsed = true;
  public PROP: any[];  

  constructor(
    private router: Router,
    private servicio: MenuService,
    private token: TokenStorageService) { }

  ngOnInit() {  
   this.obtenerMenu();
  }

  sideBarCollapse(id: string) {
    this.menuItems.forEach((menu) => {
      if (menu.rol === id) {
        menu.isCollapsed = !menu.isCollapsed;
      } else {
        menu.isCollapsed = true;
      }
    });

  }

  obtenerMenu() {
    this.servicio.obtenerMenu()
      .subscribe((resp) => {
        if (resp.estado === true) {
          this.menu= typeof(resp.mensaje1) === 'object' ?  resp : JSON.parse(resp.mensaje1);
          this.armarRutas();  
          this.menuItems = this.menu.filter(menuItem => menuItem);
          this.router.events.subscribe((event) => {
        });        
        }      

      }, (error) => {

        console.log(error);
        this.router.navigate(['login']);  
      });
  }

  armarRutas() {
    const listRutas = []; 
    this.menu.forEach(rol => {
       rol.paginas.forEach(pag => {
        listRutas.push(pag.path);
       });
    });
    this.token.guardarRutas(listRutas);
  }



}
