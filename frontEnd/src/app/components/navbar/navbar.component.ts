import { Component, OnInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { MenuModel } from 'src/app/model/menu.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[]= [];
  public location: Location;
  private menu: MenuModel [] = [];

  constructor(
    location: Location,
     private element: ElementRef,
     private router: Router,
     private servicio: MenuService) {
    this.location = location;
  }

  ngOnInit() {
    this.obtenerMenu();  
  }
  getTitle() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }   

    for (let item = 0; item < this.listTitles.length; item++) {
      for (let pagina = 0; pagina < this.listTitles[item].paginas.length; pagina++) {
        if (this.listTitles[item].paginas[pagina].path === titlee) {
          const tituloPagina = this.listTitles[item].paginas[pagina].title;
          const rol = this.listTitles[item].rol;
          return `${ rol } / ${ tituloPagina }`;
        }
      }
    }
    return 'Dashboard';
  }

  obtenerMenu() {
    this.servicio.obtenerMenu()
      .subscribe((resp) => {
        if (resp.estado === true) {
          this.menu= typeof(resp.mensaje1) === 'object' ?  resp : JSON.parse(resp.mensaje1);
          this.listTitles = this.menu.filter(listTitle => listTitle);
        }      

      }, (error) => {
        console.log(error);
        this.router.navigate(['login']);  
      });

  }

}
