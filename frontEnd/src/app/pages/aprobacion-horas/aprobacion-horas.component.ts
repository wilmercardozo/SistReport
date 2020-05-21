import { Component, OnInit } from '@angular/core';
import { GestionProyectoModel } from 'src/app/model/gestionProyecto.model';
import { EstadoModel } from 'src/app/model/estado.model';
import { registroModel } from 'src/app/model/registro.model';
import { AprobacionHorasService } from 'src/app/services/aprobacion-horas.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TiempoModel } from 'src/app/model/tiempo.model';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CalificacionRegistroHorasModel } from 'src/app/model/calificacionRegistroHoras.model';
import { RergistroHoraModel } from 'src/app/model/registroHora.model';
import { UtilesService } from 'src/app/services/utiles.service';

@Component({
  selector: 'app-aprobacion-horas',
  templateUrl: './aprobacion-horas.component.html',
  styleUrls: ['./aprobacion-horas.component.css']
})
export class AprobacionHorasComponent implements OnInit {
  public titulopagina = 'Aprobación de Horas';
  public showCard: boolean;
  public page = 1;
  public pageSize = 4;
  public pageSizeUsuarios = 4;
  public pageSizeDetalle = 4;
  public listGestionProyecto: GestionProyectoModel [] = [];
  public listGestionProyectoFiltro: GestionProyectoModel [] = [];
  public collectionSize = this.listGestionProyecto.length;
  public listEstado: EstadoModel [] = [];
  public cargando: boolean;
  public sinData: boolean;
  public tituloModal: string;
  public mensajeModal: string;
  public confirmacionRegistro;
  public filtroCantidadEstado = '0';
  public filtroProyecto = '';
  public fuentesBuscador =  [];
  public cardTotalHorasRegistradas = '00 : 00';
  public cardHorasRechazadas = '00 : 00';
  public cardHorasAprobadas = '00 : 00';
  public cardHoraspendientes = '00 : 00';
  public cardPorcentajeAprobadas = '00 %';
  public cardPorcentajePendientes = '00 %';
  public cardPorcentajeRechazadas = '00 %';
  public cardPorcentajeTotalRegistradas = '00 %';
  public listCalificacion: CalificacionRegistroHorasModel[] = [];
  public listRegistroHoras: RergistroHoraModel [] = [];
  public listRegistroHorasUsuarioDetalle: RergistroHoraModel [] = [];
  public registroVentaModeloUsuario = '';
  public btnDesabilitar = false;
  public aprobar = false;
  public gestionProyecto = false;
  public tablaDetalleUsuario = false;
  public comentarioRechazo = '';
  public errorModal = '';
  public listModeloUsuario = [];
  public collectionSizeModeloUsuario = this.listModeloUsuario.length;
  public collectionSizeModeloUsuarioDetalle = this.listRegistroHorasUsuarioDetalle.length;
  public titulopaginaGestion = '';
  public nombreUsuarioDetalle = '';
  public idUsuarioModelo = 0;
  public idRegistroDetalle = 0;
  public nombreModal = 'modalConfirmacion';
  public msmExitoso = 'Se actualizo la información con éxito';
  public msmError = 'Se presentó un error al actualizar la información ';
  public mensaje1 = 'Se guardo el registro con éxito';
  public mensaje2 = 'Confirmacion';
  public mensaje3 = 'Se presentó un error al guardar la información';
  public mensaje4 = '¿Está seguro de aprobar todos los registros?';
  public mensaje5 = '¿Está seguro de rechazar todos los registros?';
  public mensaje6 = 'Debe ingresar un motivo de rechazo';
  public mensaje7 = 'Se presentó un error al guardar la información';

constructor(
    private servicio: AprobacionHorasService,
    private utiles: UtilesService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.showCard = true;
    this.ObtenerProyectos();
  }

  ObtenerProyectos() {
    this.antesDePeticion();
    this.servicio.ObtenerProyectosPorUsuario()
    .subscribe(resp => {
        this.listGestionProyecto = typeof(resp.mensaje1) === 'object' ?  resp.mensaje1 : JSON.parse(resp.mensaje1);
        this.despuesDepeticion(resp.estado);

    }, (error) => {
      console.error(error);
      this.router.navigate(['login']);
      });
  }

  antesDePeticion() {
    this.cargando = true;
    this.sinData = false;
  }

  despuesDepeticion(estado) {
    if (estado) {
    this.collectionSize = this.listGestionProyecto.length;
    this.pageSize = this.utiles.calcularPaginacion(this.listGestionProyecto.length);
    this.armarBuscador();
    this.filtrarRegistros();
    this.informacionTarjetas();
    this.obtenerEstados();
    }
    this.cargando = false;
      this.sinData = this.listGestionProyecto.length === 0 ? true : false;
  }

   armarBuscador() {
  this.listGestionProyecto.forEach( prom => {
    this.fuentesBuscador.push(`${prom.registroVenta}  ${prom.proyecto}`)
  });
}

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 2 ? []
      : this.fuentesBuscador.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )

  get listDataTable(): GestionProyectoModel[] {
    return this.listGestionProyectoFiltro
      .map((data, i) => ({ id: i + 1, ...data }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

   filtrarRegistros() {
    let filtro1: GestionProyectoModel [] = [], filtro2: GestionProyectoModel [] = [];

    switch (this.filtroCantidadEstado) {
      case '0': {
        filtro1 = this.listGestionProyecto;
        break;
     }
      case '1': {
         this.listGestionProyecto.forEach(pro =>
           pro.cantidadRegistrados.hora > 0 || pro.cantidadRegistrados.minuto > 0 ? filtro1.push(pro) : null );
         break;
      }
      case '2': {
        this.listGestionProyecto.forEach(pro =>
           pro.cantidadAprobados.hora > 0 || pro.cantidadAprobados.minuto > 0 ? filtro1.push(pro) : null );
         break;
      }
      case '3': {
        this.listGestionProyecto.forEach(pro =>
           pro.cantidadRechazados.hora > 0 || pro.cantidadRechazados.minuto > 0 ? filtro1.push(pro) : null );
        break;
     }
      default: {
         break;
      }
   }

   if (this.filtroProyecto !== '' && this.filtroProyecto != null) {
        filtro1.forEach(prom => {
        const proyecto = prom.registroVenta + ' ' + prom.proyecto;
        proyecto.indexOf(this.filtroProyecto) > -1 ? filtro2.push(prom) : null;
      });
   }

   this.listGestionProyectoFiltro = filtro2.length === 0 ? filtro1 : filtro2;
   this.collectionSize = this.listGestionProyectoFiltro.length;
  }

   informacionTarjetas() {
    const pendientes: TiempoModel [] = [], aprobadas: TiempoModel [] = [], rechazadas: TiempoModel [] = [], total: TiempoModel [] = [];

    this.listGestionProyecto.forEach(pro => {
      if ( pro.cantidadRegistrados.hora > 0 || pro.cantidadRegistrados.minuto > 0) {
        pendientes.push(pro.cantidadRegistrados);
        total.push(pro.cantidadRegistrados);
      }

      if (pro.cantidadAprobados.hora > 0 || pro.cantidadAprobados.minuto > 0) {
        aprobadas.push(pro.cantidadAprobados);
        total.push(pro.cantidadAprobados);
      }

      if (pro.cantidadRechazados.hora > 0 || pro.cantidadRechazados.minuto > 0) {
        rechazadas.push(pro.cantidadRechazados);
        total.push(pro.cantidadRechazados);
      }

    });

    this.cardTotalHorasRegistradas = this.utiles.sumarHorasModeloTiempo(total);
    this.cardHoraspendientes = this.utiles.sumarHorasModeloTiempo(pendientes);
    this.cardHorasRechazadas = this.utiles.sumarHorasModeloTiempo(rechazadas);
    this.cardHorasAprobadas = this.utiles.sumarHorasModeloTiempo(aprobadas);
    this.cardPorcentajePendientes = this.utiles.calcularPorcenta(this.cardTotalHorasRegistradas, this.cardHoraspendientes );
    this.cardPorcentajeAprobadas = this.utiles.calcularPorcenta(this.cardTotalHorasRegistradas, this.cardHorasAprobadas );
    this.cardPorcentajeRechazadas = this.utiles.calcularPorcenta(this.cardTotalHorasRegistradas, this.cardHorasRechazadas );
  }

  obtenerEstados() {
    this.servicio.ObtenerEstados()
    .subscribe(resp => {
      if (resp.estado === true) {
        this.listEstado = typeof(resp.mensaje1) === 'object' ?  resp.mensaje1 : JSON.parse(resp.mensaje1);
      }
    }, (error) => {
      console.error(error);
    });
  }

 aprobarTodo(modal, proyecto) {
  this.tituloModal = this.mensaje2;
  this.mensajeModal = this.mensaje4;
  this.confirmacionRegistro = proyecto;
  this.btnDesabilitar = true;
  this.aprobar = true;
  this.modalService.open(modal,  {ariaLabelledBy: 'modal-basic-title'});
  this.errorModal = '';
}

public rechazarTodo(modal, proyecto) {
  this.tituloModal = this.mensaje2;
  this.mensajeModal = this.mensaje5;
  this.confirmacionRegistro = proyecto;
  this.btnDesabilitar = true;
  this.aprobar = false;
  this.modalService.open(modal,  {ariaLabelledBy: 'modal-basic-title'});
  this.errorModal = '';
}

public ejecutarCalificacion(modal) {
  if (! this.gestionProyecto) {
    this.CalificacionMasiva();
  } else {
    this.calificacionModeloUsuario();
  }
}

public CalificacionMasiva() {
  if (!this.aprobar) {
    if (this.comentarioRechazo.length === 0) {
      this.errorModal = this.mensaje6;
      return;
    }
  }
  const calificacion: CalificacionRegistroHorasModel =  new CalificacionRegistroHorasModel();
  calificacion.registroVenta = this.confirmacionRegistro;
  calificacion.aprobado = this.aprobar ? true : false;
  calificacion.comentario = this.comentarioRechazo;
  this.enviarCalificacionMasiva(calificacion);
}

public enviarCalificacionMasiva(calificacion: CalificacionRegistroHorasModel) {

  this.servicio.CalificarRegistroHorasMasivo(calificacion)
  .subscribe(resp => {
  if (resp.estado === true) {
    this.modalService.dismissAll(this.nombreModal);
    this.listGestionProyecto = this.listGestionProyecto.filter(pro => pro.registroVenta !== this.confirmacionRegistro);
    this.filtrarRegistros();
    this.comentarioRechazo = '';
    this.utiles.notificacionExito();
  } else {
    this.utiles.notificacionError();
    console.log(resp.mensaje1);
  }
}, (error) => {
  this.utiles.notificacionError();
  console.error(error);
});

}

public calificacionModeloUsuario() {
  if (!this.aprobar) {
    if (this.comentarioRechazo.length === 0) {
      this.errorModal = this.mensaje6;
      return;
    }
  }
  this.armarlistaRegistroPorUsuario();
  this.enviarCalificacionPorLista();
}

public enviarCalificacionPorLista() {
  this.servicio.CalificarRegistroHorasLista( this.listCalificacion)
  .subscribe(resp => {
  if (resp.estado === true) {
    this.modalService.dismissAll(this.nombreModal);
    this.comentarioRechazo = '';
    this.listModeloUsuario = this.listModeloUsuario.filter(pro => pro.idUsuario != this.idUsuarioModelo );
    this.collectionSizeModeloUsuario = this.listModeloUsuario.length;
    this. ObtenerProyectos();
    this.utiles.notificacionExito();
  } else {
    this.errorModal = this.mensaje7;
    console.log(resp.mensaje1);
    this.utiles.notificacionError();
  }
}, (error) => {
  console.error(error);
  this.utiles.notificacionError();
});
}

 gestionarProyecto(registroVenta) {
  this.gestionProyecto = true;
  this.tablaDetalleUsuario = false;
  this.listModeloUsuario = [];
  this.titulopaginaGestion = 'Aprobación de Horas -> Proyecto: ' + registroVenta;
  this.registroVentaModeloUsuario = registroVenta ;
  this.obtenerRegistroHorasPorproyecto();
}

 volver() {
  this.tablaDetalleUsuario = false;
  this.gestionProyecto = false;
}

 obtenerRegistroHorasPorproyecto() {
const registro: registroModel = new registroModel();
registro.parametro1 =  this.registroVentaModeloUsuario;
 this.servicio.ObtenerRegistroHorasPorRegistroVenta(registro)
 .subscribe(resp => {
  if (resp.estado === true) {
    this.listRegistroHoras =  typeof(resp.mensaje1) === 'object' ?  resp.mensaje1 : JSON.parse(resp.mensaje1);
    this.collectionSizeModeloUsuario = this.listRegistroHoras.length;
    this.armarRegistroHorasPorUsuario();
  } else {
    this.utiles.notificacionError();
  }
}, (error) => {
  console.error(error);
  this.utiles.notificacionError();
});
}

 armarRegistroHorasPorUsuario() {
  const usuarios = [];
  this.listRegistroHoras.forEach( prom => {
    if (! usuarios.includes( prom.idUsuario) ) {
      usuarios.push( prom.idUsuario);
    }
  });

  usuarios.forEach( idUsuario => {
    this.listModeloUsuario.push(this.armaModeloUsuario(idUsuario));
  });
  this.collectionSizeModeloUsuario = this.listModeloUsuario.length;
  this.pageSizeUsuarios = this.utiles.calcularPaginacion(this.listModeloUsuario.length);
}

public armaModeloUsuario(IdUsuario) {
    const registroHoras: RergistroHoraModel [] = [];
    this.listRegistroHoras.forEach( prom => {
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

    const modeloUsuario = {
      idUsuario: registroHoras.length > 0 ? registroHoras[0].idUsuario : '',
      nombreUsuario: registroHoras.length > 0 ? registroHoras[0].nombreUsuario : '',
      cantidadRegistrados: horasPendientes,
      cantidadAprobados: horasAprobadas,
      cantidadRechazados: horasRechazadas
      };

      return modeloUsuario;

}

public sumarHorasUsuario (registroHoras: RergistroHoraModel []) {
  var horas = 0;
  var minutos = 0;

  registroHoras.forEach(element => {
    horas = horas +  element.horas.hora;
    minutos = minutos + element.horas.minuto;
  });

  horas = Math.trunc(minutos / 60) + horas;
  minutos = minutos % 60;

  var retunrHora, retunrMinuto; 
  retunrHora = horas < 10 ? `0${horas}` : horas;
  retunrMinuto = minutos < 10 ? `0${minutos}` : minutos;

  return `${retunrHora} : ${retunrMinuto}`;
}

public aprobarTodoModeloUsuario(modal, idUsuario) {
  this.tituloModal = this.mensaje2;
  this.mensajeModal = this.mensaje4;
  this.btnDesabilitar = true;
  this.aprobar = true;
  this.idUsuarioModelo = idUsuario;
  this.modalService.open(modal,  {ariaLabelledBy: 'modal-basic-title'});
  this.errorModal = '';
}

public rechazarTodoModeloUsuario(modal, idUsuario) {
  this.tituloModal = this.mensaje2;
  this.mensajeModal = this.mensaje5;
  this.btnDesabilitar = true;
  this.aprobar = false;
  this.idUsuarioModelo = idUsuario;
  this.modalService.open(modal,  {ariaLabelledBy: 'modal-basic-title'});
  this.errorModal = '';
}

public gestionarDetalleUsuario(idUsuario, nombreUsuario) {
  this.listRegistroHorasUsuarioDetalle = [];
  this.listRegistroHorasUsuarioDetalle = this.listRegistroHoras.filter(pro => pro.idUsuario == idUsuario);
  this.collectionSizeModeloUsuarioDetalle = this.listRegistroHorasUsuarioDetalle.length;
  this.pageSizeDetalle = this.utiles.calcularPaginacion(this.listRegistroHorasUsuarioDetalle.length);
  this.tablaDetalleUsuario = true;
  this.nombreUsuarioDetalle = 'Usuario: ' + nombreUsuario;
}

public seleccionarOtroUsuario() {
  this.tablaDetalleUsuario = false;
}

public armarlistaRegistroPorUsuario() {
  this. listCalificacion = [];
  const comentario = this.aprobar ? '' : this.comentarioRechazo;
  this.listRegistroHoras.forEach( prom => {
    if (prom.idUsuario === this.idUsuarioModelo) {
      const calificacion: CalificacionRegistroHorasModel = new CalificacionRegistroHorasModel();
      calificacion.idRegistro = prom.idRegistro;
      calificacion.aprobado = this.aprobar;
      calificacion.comentario = comentario;
      calificacion.registroVenta = prom.registroVenta;
      this.listCalificacion.push(calificacion);
    }
  });
}

public armarListaRegistroPorUsuarioDetalle() {
  this.listRegistroHorasUsuarioDetalle = this.listRegistroHoras.filter(pro => pro.idUsuario == this.idUsuarioModelo);
}

public formatearFecha(fecha: Date){
  const date = new Date(fecha);
  const nuevaFoto = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  return nuevaFoto;
}

public aprobarDetalleUsuario(modal, idregistro) {
  this.tituloModal = this.mensaje2;
  this.mensajeModal = this.mensaje4;
  this.btnDesabilitar = true;
  this.aprobar = true;
  this.idRegistroDetalle = idregistro;
  this.modalService.open(modal,  {ariaLabelledBy: 'modal-basic-title'});
  this.errorModal = '';
}

public rechazarDetalleUsuario(modal, idregistro) {
  this.tituloModal = this.mensaje2;
  this.mensajeModal = this.mensaje4;
  this.btnDesabilitar = true;
  this.aprobar = false;
  this.idRegistroDetalle = idregistro;
  this.modalService.open(modal,  {ariaLabelledBy: 'modal-basic-title'});
  this.errorModal = '';
}

public ejecutarCalificacionDetalle(modal) {
  if (!this.aprobar) {
    if (this.comentarioRechazo.length === 0) {
      this.errorModal = this.mensaje6;
      return;
    }
  }
  this.armarRegistroUsuarioDetalle();
  this.enviarCalificacionPorListaDetalle(modal);
}

public armarRegistroUsuarioDetalle() {
  this.listCalificacion = [];
  const calificacion: CalificacionRegistroHorasModel = new CalificacionRegistroHorasModel();
  const comentario = this.aprobar ? '' : this.comentarioRechazo;
  calificacion.idRegistro = this.idRegistroDetalle;
  calificacion.aprobado = this.aprobar;
  calificacion.comentario = comentario;
  this.listCalificacion.push(calificacion);
}

public enviarCalificacionPorListaDetalle(modal) {
  this.servicio.CalificarRegistroHorasLista( this.listCalificacion)
  .subscribe(resp => {
  if (resp.estado === true) {
    this.modalService.dismissAll(modal);
    this.comentarioRechazo = '';
    this.listRegistroHorasUsuarioDetalle = this.listRegistroHorasUsuarioDetalle.filter(pro => pro.idRegistro !== this.idRegistroDetalle);
    this. ObtenerProyectos();
    this. obtenerRegistroHorasPorproyecto();
    this.utiles.notificacionExito();
  } else {
    this.errorModal = this.mensaje7;
    console.log(resp.mensaje1);
    this.utiles.notificacionError();
  }
}, (error) => {
  console.error(error);
  this.utiles.notificacionError();
});
}



}








