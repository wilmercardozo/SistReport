import { Component, OnInit } from '@angular/core';
import { RergistroHoraModel } from 'src/app/model/registroHora.model';
import { SeguimientoEquipoService } from 'src/app/services/seguimiento-equipo.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { EstadoModel } from 'src/app/model/estado.model';

@Component({
  selector: 'app-seguimiento-equipos',
  templateUrl: './seguimiento-equipos.component.html',
  styleUrls: ['./seguimiento-equipos.component.css']
})
export class SeguimientoEquiposComponent implements OnInit {
  public titulopagina = 'Seguimiento al equipo de trabajo';
  public showCard: boolean;
  public page = 1;
  public pageSize = 4;
  public listRegistroHoraEquipo: RergistroHoraModel [] = [];
  public listRegistroHorasUsuario: RergistroHoraModel [] = [];
  public listRegistroHorasUsuarioFiltro: RergistroHoraModel [] = [];
  public listModeloPorUsuario = [];
  public collectionSize = this.listRegistroHoraEquipo.length;
  public collectionSizeUsuario = this.listRegistroHorasUsuario.length;
  public cargando: boolean;
  public sinData: boolean;
  public tituloModal: string;
  public mensajeModal: string;
  public filtroEstado = '0';
  public filtroProyecto = '';
  public detalle = false;
  public fuentesBuscador: []=  [];
  public listEstado: EstadoModel [] = [];

  constructor(
    private servicio: SeguimientoEquipoService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.cargando = true;
    this.sinData = false;
    this.obtenerRegistroHorasEquipo();
  }

  public obtenerRegistroHorasEquipo() {
    this.servicio.ObtenerRegistroHorasPorEquipo()
    .subscribe(resp => {
      if (resp.estado === true) {
        this.listRegistroHoraEquipo = JSON.parse(resp.mensaje1) ;
        this.collectionSize = this.listRegistroHoraEquipo.length;
        this.armarRegistroPorUsuario();
      }
      this.cargando = false;
      this.sinData = this.listRegistroHoraEquipo.length === 0 ? true : false;

    }, (error) => {
      console.error(error);
      this.router.navigate(['login']);
      });
  }

  public armarRegistroPorUsuario() {
    const usuarios = [];
    this.listRegistroHoraEquipo.forEach( prom => {
    if (! usuarios.includes( prom.idUsuario) ) {
      usuarios.push( prom.idUsuario);
    }
  });

  usuarios.forEach( idUsuario => {
    this.listModeloPorUsuario.push(this.armaModeloUsuario(idUsuario));
  });
  this.collectionSize = this.listModeloPorUsuario.length;
  }

  public armaModeloUsuario(IdUsuario) {
    const registroHoras: RergistroHoraModel [] = [];
    this.listRegistroHoraEquipo.forEach( prom => {
      if ( prom.idUsuario === IdUsuario) {
        registroHoras.push(prom);
      }
    });

    const pendientes: RergistroHoraModel [] = registroHoras.filter(pro => pro.estado === 1);
    const aprobadas: RergistroHoraModel [] = registroHoras.filter(pro => pro.estado === 2);
    const rechazadas: RergistroHoraModel [] = registroHoras.filter(pro => pro.estado === 3);
    const horasPendientes = this.sumarHorasUsuario(pendientes);
    const horasRechazadas = this.sumarHorasUsuario(rechazadas);
    const horasAprobadas = this.sumarHorasUsuario(aprobadas);
    const horastotal = this.sumarHorasUsuario(registroHoras);

    const modeloUsuario = {
      idUsuario: registroHoras.length > 0 ? registroHoras[0].idUsuario : '',
      nombreUsuario: registroHoras.length > 0 ? registroHoras[0].nombreUsuario : '',
      cantidadRegistrados: horasPendientes,
      cantidadAprobados: horasAprobadas,
      cantidadRechazados: horasRechazadas,
      cantidadTotal: horastotal
      };

      return modeloUsuario;
}

public sumarHorasUsuario (registroHoras: RergistroHoraModel []) {
  let horas = 0;
  let minutos = 0;

  registroHoras.forEach(element => {
    horas = horas +  element.horas.hora;
    minutos = minutos + element.horas.minuto;
  });

  horas = Math.trunc(minutos / 60) + horas;
  minutos = minutos % 60;

  let retunrHora, retunrMinuto;
  retunrHora = horas < 10 ? `0${horas}` : horas;
  retunrMinuto = minutos < 10 ? `0${minutos}` : minutos;

  return `${retunrHora} : ${retunrMinuto}`;
}

public detalleRegistroHoras(idUsuario: number, nombreUsuario) {
  this.obtenerEstados();
  this.listRegistroHorasUsuario = [];
  this.listRegistroHorasUsuario = this.listRegistroHoraEquipo.filter(pro => pro.idUsuario === idUsuario);  
 
  this.filtrarRegistros();
  this.detalle= true;
}

public obtenerEstados() {
  this.servicio.ObtenerEstados()
  .subscribe(resp => {
    if (resp.estado == true)
    {
      this.listEstado = JSON.parse(resp.mensaje1) ;        
    }      

  }, (error) => {
    console.error(error);            
    })
}

public formatearFecha(fecha: Date){    
  var date = new Date(fecha);
   var nuevaFoto = date.getDate() + "/" + (date.getMonth() +1) + "/" + date.getFullYear();
  return nuevaFoto;
}

public filtrarRegistros() {
  let filtro1: RergistroHoraModel [] = [] ;
  let filtro2: RergistroHoraModel [] = [] ;

  if  (this.filtroEstado !== '0') {
    this.listRegistroHorasUsuario.forEach(prom => {
      if (prom.estado === parseInt (this.filtroEstado)) {
        filtro1.push(prom);
      }
  });
  } else {
    filtro1 = this.listRegistroHorasUsuario;
  }

  if (this.filtroProyecto !== '' && this.filtroProyecto != null) {
    filtro1.forEach(prom => {
      const proyecto = prom.registroVenta + ' ' + prom.proyecto;
      if (proyecto.indexOf(this.filtroProyecto) > -1) {
          filtro2.push(prom);
      }
    });
  }

   this.listRegistroHorasUsuarioFiltro = filtro2.length === 0 ? filtro1 : filtro2;
   this.collectionSizeUsuario = this.listRegistroHorasUsuarioFiltro.length;   
  }

  get listDataTable(): RergistroHoraModel[] {    
    return this.listRegistroHorasUsuarioFiltro
      .map((data, i) => ({ id: i + 1, ...data }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }  

}
