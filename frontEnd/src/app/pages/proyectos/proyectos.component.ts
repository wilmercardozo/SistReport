import { Component, OnInit, PipeTransform } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProyectoComponent } from '../../formularios/proyecto/proyecto.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { ProyectoModel } from 'src/app/model/proyecto.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
  page = 1;
  pageSize = 4;
  listProyectos: ProyectoModel[] = [];
  collectionSize = this.listProyectos.length;
  private date: number = Date.now();  
  public cargando: boolean;
  public sinData: boolean;
  public tituloModal: string;
  public mensajeModal: string;
  public confirmacionRegistroVenta: string;
  public btnDesabilitar: boolean; 

  ngOnInit(): void {
    this.cargando = true; 
    this.sinData = false;   
    this.obtenerListaProyectos();    
  }

  get proyectos(): ProyectoModel[] {
    return this.listProyectos
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  constructor(private router: Router, private modalService: NgbModal, private fb: FormBuilder, private proyectoService: ProyectoService) { }


  agregarNuevoProyecto(content) {
    const modalRef = this.modalService.open(ProyectoComponent, { size: 'lg' });
    modalRef.componentInstance.inputproyectoModel = null;
    modalRef.componentInstance.result.subscribe((receivedProyecto: ProyectoModel) => {
     
      this.cargando = true; 
      this.sinData = false;   
      this.obtenerListaProyectos();

      this.mensajeModal = 'Se agregó el registro con éxito';
      this.tituloModal = 'Confirmacion';
      this.btnDesabilitar= false;
      this.modalService.open(content,  {ariaLabelledBy: 'modal-basic-title'});

    },(error) => {     
      
      this.mensajeModal = 'Se presentó un error al guardar la información';
      this.tituloModal = 'Confirmacion';
      this.btnDesabilitar= false;
      this.modalService.open(content,  {ariaLabelledBy: 'modal-basic-title'}); 
    });
  }

  edicionProyecto(content,registroVenta: string) {
    const proyecto : ProyectoModel [] = this.listProyectos.filter(pro => pro.registroVenta == registroVenta);

    const modalRef = this.modalService.open(ProyectoComponent, { size: 'lg' });
    modalRef.componentInstance.inputproyectoModel= proyecto.length == 1 ? proyecto[0] : null;
    modalRef.componentInstance.result.subscribe((receivedProyecto: ProyectoModel) => {
      this.cargando = true; 
      this.sinData = false;   
      this.obtenerListaProyectos();
      this.mensajeModal = 'Se modificó el registro con éxito';
      this.tituloModal = 'Confirmacion';
      this.btnDesabilitar= false;
      this.modalService.open(content,  {ariaLabelledBy: 'modal-basic-title'});

    }, (error) => {     
      
      this.mensajeModal = 'Se presentó un error al guardar la información'; 
      this.tituloModal = 'Confirmacion';
      this.btnDesabilitar= false;
      this.modalService.open(content,  {ariaLabelledBy: 'modal-basic-title'});

    });

    

  }
 
confirmarEliminacion(content, registroVenta){
  this.tituloModal = 'Confirmacion'
  this.mensajeModal = '¿Está seguro de  deshabilitar el registro?'
  this.confirmacionRegistroVenta = registroVenta; 
  this.btnDesabilitar= true;
  this.modalService.open(content,  {ariaLabelledBy: 'modal-basic-title'});  
}

  obtenerListaProyectos() {
    this.proyectoService.ObtenerListaProyectos()
      .subscribe(resp => {        
        this.listProyectos = JSON.parse(resp.mensaje1) ;
        this.collectionSize = this.listProyectos.length;
        this.cargando = false;
        this.sinData = this.listProyectos.length == 0 ? true : false;  
      }, (error) => {
        this.router.navigate(['login']);        
        })
      ;
  }

  desabilitarProyecto(content) {    
    this.proyectoService.DesabilitarProyecto(this.confirmacionRegistroVenta)
      .subscribe(resp => {
        if (resp.estado === true){
          this.modalService.dismissAll(content);
          this.listProyectos= this.listProyectos.filter(pro => pro.registroVenta != this.confirmacionRegistroVenta);
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
