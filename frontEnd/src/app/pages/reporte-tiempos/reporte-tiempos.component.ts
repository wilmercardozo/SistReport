import { Component, OnInit } from '@angular/core';
import { RergistroHoraModel } from 'src/app/model/registroHora.model';
import { registroModel } from 'src/app/model/registro.model';
import { RegistroHorasService } from 'src/app/services/registro-horas.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistroHorasComponent } from 'src/app/formularios/registro-horas/registro-horas.component';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { EstadoModel } from 'src/app/model/estado.model';
import { ProyectoModel } from 'src/app/model/proyecto.model';

@Component({
  selector: 'app-reporte-tiempos',
  templateUrl: './reporte-tiempos.component.html',
  styleUrls: ['./reporte-tiempos.component.scss']
})
export class ReporteTiemposComponent implements OnInit {
  public titulopagina: string = 'Registro de actividades';  
  public showCard: boolean;
  public page = 1;
  public pageSize = 4;
  public listRegistroHoras: RergistroHoraModel [] = [];
  public listRegistroHorasFiltro: RergistroHoraModel [] = [];
  public listEstado: EstadoModel [] = [];
  public collectionSize = this.listRegistroHoras.length;
  public cargando: boolean;
  public sinData: boolean;
  public tituloModal: string;
  public mensajeModal: string;
  public confirmacionRegistro: registroModel= new registroModel();
  public btnDesabilitar: boolean;
  public cardHorasRegistradas = '00 : 00';
  public cardHorasRechazadas = '00 : 00';
  public cardHorasAprobadas = '00 : 00';
  public cardHoraspendientes = '00 : 00';
  public modal;
  public mensaje1: string = 'Se guardo el registro con éxito';
  public mensaje2: string = 'Confirmacion';
  public mensaje3: string = 'Se presentó un error al guardar la información';
  public mensaje4: string = '¿Está seguro de eliminar el registro?'
  public mensaje5: string = '';
  public copia: boolean = false; 
  public filtroEstado = '0';
  public filtroRV ='';
  public cardPorcentajeAprobadas = '00 %'
  public cardPorcentajePendientes = '00 %'
  public cardPorcentajeRechazadas = '00 %'
  public cardPorcentajeRegistradas = '00 %'
  public fuentesBuscador: string []=  [];
  public idUsuario = 0;
  
  constructor(
    private servicio: RegistroHorasService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.showCard = true;
    this.cargando = true; 
    this.sinData = false;
    this.obtenerRegistroHoras();    
  }

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 2 ? []
      : this.fuentesBuscador.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )

  public obtenerRegistroHoras() {
    this.servicio.ObtenerRegistroHorasPorUsuario()
    .subscribe(resp => {
      if (resp.estado == true)
      {
        this.listRegistroHoras = JSON.parse(resp.mensaje1) ;      
        this.collectionSize = this.listRegistroHoras.length;
        this.cargando = false;
        this.idUsuario = this.listRegistroHoras[0].idUsuario;
        this.filtrarRegistros();
        this.informacionTarjetas();
        this.obtenerEstados();
        this.obtenerProyectos();
      }
      this.sinData = this.listRegistroHoras.length == 0 ? true : false;

    }, (error) => {
      console.error(error);
      this.router.navigate(['login']);        
      })
  }
    
  get listDataTable(): RergistroHoraModel[] {    
    return this.listRegistroHorasFiltro
      .map((data, i) => ({ id: i + 1, ...data }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  public obtenerEstados(){
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
  public obtenerProyectos(){
    this.servicio.ObtenerProyectos()
    .subscribe(resp => {
      if (resp.estado == true)
      {
        var proyectos: ProyectoModel []= JSON.parse(resp.mensaje1) ;        
        proyectos.forEach(prom => {
         this.fuentesBuscador.push( `${prom.registroVenta}  ${prom.proyecto}`)
        });
      }      

    }, (error) => {
      console.error(error);            
      })
  }

  public filtrarRegistros(){
   
  var filtro1 : RergistroHoraModel [] = [] ;
  var filtro2 : RergistroHoraModel [] = [] ;

  if  (this.filtroEstado != '0')
  {
    this.listRegistroHoras.forEach(prom => {
      if (prom.estado === parseInt( this.filtroEstado ))
      {
        filtro1.push(prom);
      }
  })   
  } 
  else
  {
    filtro1 = this.listRegistroHoras;
  }

  if (this.filtroRV != '' && this.filtroRV != null)
  {
    filtro1.forEach(prom =>{
      var proyecto = prom.registroVenta + ' ' +prom.proyecto
      if(proyecto.indexOf(this.filtroRV) > -1)
      {
          filtro2.push(prom);
      }
    });    
  }

   this.listRegistroHorasFiltro = filtro2.length == 0 ? filtro1: filtro2;
   this.collectionSize = this.listRegistroHorasFiltro.length;
  }

 public informacionTarjetas() {
    var pendientes: RergistroHoraModel [] = this.listRegistroHoras.filter(pro => pro.estado === 1);
    var aprobadas: RergistroHoraModel [] = this.listRegistroHoras.filter(pro => pro.estado === 2);
    var rechazadas: RergistroHoraModel [] = this.listRegistroHoras.filter(pro => pro.estado === 3);

    this.cardHorasRegistradas = this.sumarHoras(this.listRegistroHoras);
    this.cardHoraspendientes = this.sumarHoras(pendientes);
    this.cardHorasRechazadas = this.sumarHoras(rechazadas);
    this.cardHorasAprobadas = this.sumarHoras(aprobadas);
    this.cardPorcentajePendientes = this.calcularPorcenta(this.cardHorasRegistradas, this.cardHoraspendientes );
    this.cardPorcentajeAprobadas = this.calcularPorcenta(this.cardHorasRegistradas, this.cardHorasAprobadas );
    this.cardPorcentajeRechazadas = this.calcularPorcenta(this.cardHorasRegistradas, this.cardHorasRechazadas );

  }

  public calcularPorcenta(totalHoras, horas) {
    totalHoras= totalHoras.split(':');
    horas= horas.split(':');

    var horasTotal  = parseFloat(totalHoras[0]) + parseFloat(totalHoras[1])/ 60 ;
    var horasAlcance  = parseFloat(horas[0]) + parseFloat(horas[1])/ 60 ;    
    return (horasAlcance * 100) /horasTotal + ' %';
  }

  public sumarHoras (registroHoras: RergistroHoraModel []) {
    var horas = 0
    var minutos = 0
    var valorFinal;
    registroHoras.forEach(element =>{
      horas = horas +  element.horas.hora
      minutos = minutos + element.horas.minuto
    });

    horas = Math.trunc(minutos / 60) + horas;
    minutos = minutos % 60;

    var retunrHora, retunrMinuto 
    retunrHora = horas < 10 ? `0${horas}` : horas
    retunrMinuto = minutos < 10 ? `0${minutos}` : minutos    

    return `${retunrHora} : ${retunrMinuto}`

 }

  public formatearFecha(fecha: Date){    
    var date = new Date(fecha);
     var nuevaFoto = date.getDate() + "/" + (date.getMonth() +1) + "/" + date.getFullYear();
    return nuevaFoto;
  }

  public nuevoRegistro(modal){
    this.modal= modal;
    this.abrirFormulario(null);
  }

  public edicionRegistro(modal, id){
    const registro : RergistroHoraModel [] = this.listRegistroHoras.filter(pro => pro.idRegistro == id);
     this.abrirFormulario(registro);
  }

  public copiarRegistro(modal, id){
    const registro : RergistroHoraModel [] = this.listRegistroHoras.filter(pro => pro.idRegistro == id);
    this.copia = true;
    this.abrirFormulario(registro);
    this.copia = false;
  }

  public abrirFormulario(inputRegistro) {
    const modal = this.modal;
    const modalRef = this.modalService.open(RegistroHorasComponent, { size: 'lg' });

    modalRef.componentInstance.inputModelo= inputRegistro === null ? null :  inputRegistro[0];
    modalRef.componentInstance.inputCopia=  this.copia;
    modalRef.componentInstance.inputIdUsuario = this.idUsuario;
    modalRef.componentInstance.result.subscribe((receivedProyecto: RergistroHoraModel) => {
      this.modalService.open(modal,  {ariaLabelledBy: 'modal-basic-title'});
      this.mensajeModal = this.mensaje1;
      this.tituloModal = this.mensaje2;
      this.cargando = true;
      this.sinData = false;
      this.obtenerRegistroHoras();
      this.btnDesabilitar = false;

    }, (error) => {
      console.error(error);
      this.mensajeModal = this.mensaje3;
      this.tituloModal = this.mensaje2;
      this.btnDesabilitar = false;
      this.modalService.open(modal,  {ariaLabelledBy: 'modal-basic-title'});
    });

  }
  confirmarEliminacion(modal, id: number) {
    this.tituloModal = this.mensaje2;
    this.mensajeModal = this.mensaje4;
    this.confirmacionRegistro.idregistro = id; 
    this.btnDesabilitar = true;
    this.modalService.open(modal,  {ariaLabelledBy: 'modal-basic-title'});
  }

  eliminarRegistro(modal) {
    this.servicio.EliminarRegistroHoras(this.confirmacionRegistro)
      .subscribe(resp => {
        if (resp.estado === true){
          this.modalService.dismissAll(modal);
          this.listRegistroHoras = this.listRegistroHoras.filter(pro => pro.idRegistro !== this.confirmacionRegistro.idregistro);
          this.filtrarRegistros();
        } else {
          this.modalService.open(modal,  {ariaLabelledBy: 'modal-basic-title'});
          this.mensajeModal = resp.mensaje1;
        }
      }, (error) => {
        this.router.navigate(['login']);
        })
      ;
  }

}
