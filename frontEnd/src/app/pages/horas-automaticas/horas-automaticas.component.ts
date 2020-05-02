import { Component, OnInit } from '@angular/core';
import { AutomaticoPorUsuarioModel } from 'src/app/model/automaticoPorUsuario.model';
import { AutomaticoService } from 'src/app/services/automatico.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { registroModel } from 'src/app/model/registro.model';
import { AutomaticoComponent } from 'src/app/formularios/automatico/automatico.component';

@Component({
  selector: 'app-horas-automaticas',
  templateUrl: './horas-automaticas.component.html',
  styleUrls: ['./horas-automaticas.component.css']
})
export class HorasAutomaticasComponent implements OnInit {
  public titulopagina: string = 'Administración de horas automaticas';
  public page = 1;
  public pageSize = 4; 
  public listAutomaticoPorUsuario: AutomaticoPorUsuarioModel [] = []
  public collectionSize = this.listAutomaticoPorUsuario.length;
  public cargando: boolean;
  public sinData: boolean;
  public tituloModal: string;
  public mensajeModal: string;
  public confirmacionRegistro: registroModel= new registroModel();
  public btnDesabilitar: boolean; 
  public modal;
  
  constructor(
    private automaticoService: AutomaticoService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.cargando = true; 
    this.sinData = false;
    this.obtenerListaAutomaticosPorUsuario();
  }

  obtenerListaAutomaticosPorUsuario() {
    this.automaticoService.ObtenerAutomaticosPorUsuario()
      .subscribe(resp => {        
        this.listAutomaticoPorUsuario = JSON.parse(resp.mensaje1) ;
        this.collectionSize = this.listAutomaticoPorUsuario.length;
        this.cargando = false;
        this.sinData = this.listAutomaticoPorUsuario.length == 0 ? true : false;  
      }, (error) => {
        this.router.navigate(['login']);        
        })
      ;
  }
  
  get listDataTable(): AutomaticoPorUsuarioModel[] {
    return this.listAutomaticoPorUsuario
      .map((data, i) => ({ id: i + 1, ...data }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  nuevoRegistro(modal){
    this.modal= modal;
    this.abrirFormulario(null);
  }

  edicionRegistro(modal, id){
    const registro : AutomaticoPorUsuarioModel [] = this.listAutomaticoPorUsuario.filter(pro => pro.idUsuario == id);
     this.abrirFormulario(registro);
  }

  abrirFormulario(inputRegistro){
    var modal = this.modal;
    const modalRef = this.modalService.open(AutomaticoComponent, { size: 'lg' });  

    modalRef.componentInstance.inputModelo= inputRegistro === null ? null :  inputRegistro[0];
    modalRef.componentInstance.result.subscribe((receivedProyecto: AutomaticoComponent) => {
      this.cargando = true; 
      this.sinData = false;   
      this.obtenerListaAutomaticosPorUsuario();
      this.mensajeModal = 'Se guardo el registro con éxito';
      this.tituloModal = 'Confirmacion';
      this.btnDesabilitar= false;
      this.modalService.open(modal,  {ariaLabelledBy: 'modal-basic-title'});

    }, (error) => {     
      
      this.mensajeModal = 'Se presentó un error al guardar la información'; 
      this.tituloModal = 'Confirmacion';
      this.btnDesabilitar= false;
      this.modalService.open(modal,  {ariaLabelledBy: 'modal-basic-title'});

    });

  }

  confirmarEliminacion(modal, id: number) {
    this.tituloModal = 'Confirmacion'
    this.mensajeModal = '¿Está seguro de eliminar el registro?'
    this.confirmacionRegistro.idregistro = id; 
    this.btnDesabilitar= true;
    this.modalService.open(modal,  {ariaLabelledBy: 'modal-basic-title'});
  }

  eliminarRegistro(modal){
    this.automaticoService.EliminarAutomaticosPorUsuario(this.confirmacionRegistro)
      .subscribe(resp => {
        if (resp.estado === true){
          this.modalService.dismissAll(modal);
          this.listAutomaticoPorUsuario= this.listAutomaticoPorUsuario.filter(pro => pro.idUsuario != this.confirmacionRegistro.idregistro);
        }
        else{
          this.mensajeModal =resp.mensaje1;
        }
        
      }, (error) => {
        this.router.navigate(['login']);        
        })
      ;
  }

}
