import { Component, OnInit, Input, Output, EventEmitter, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { RergistroHoraModel } from 'src/app/model/registroHora.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistroHorasService } from 'src/app/services/registro-horas.service';
import { ProyectoModel } from 'src/app/model/proyecto.model';
import { FaseModel } from 'src/app/model/fase.model';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TiempoModel } from 'src/app/model/tiempo.model';
import { ReglaModel } from 'src/app/model/regla.model';


@Component({
  selector: 'app-registro-horas',
  templateUrl: './registro-horas.component.html',
  styleUrls: ['./registro-horas.component.css']
})
export class RegistroHorasComponent implements OnInit {
  public titulo: string;
  public formGroup: FormGroup;
  public modelo: RergistroHoraModel = new RergistroHoraModel();
  public alerta = false;
  public mensajeAlerta: string;
  public edicion: boolean;
  public fuentesBuscador: string [] =  [];
  public fases: FaseModel [] = [];
  public reglas: ReglaModel= new ReglaModel();
  public reglasRegistro:ReglaModel;
  public mensaje5 = 'Valide los registros del formulario.';
  public mensaje1 = 'Se presentó un error guardar la informacion';
  public mensaje2 = 'Días disponibles para reportar, entre el '; 
  
  

  @Input() inputModelo: RergistroHoraModel;
  @Input() inputCopia: boolean;
  @Input() inputIdUsuario: number;
  @Output() result: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private activeModal: NgbActiveModal,
     private fb: FormBuilder,
     private servicio: RegistroHorasService) { }

  ngOnInit(): void {
    this.obtenerProyectos();
    this.obtenerFases();
    this.obtenerReglas();
    this.CrearFormulario();
  }

  public guardar(){

    if(this.validarFormulario()){
      this. armarEntidad();
  
      this.servicio.ActualizarRegistroHoras(this.modelo)
      .subscribe(resp => {
        if (resp.estado== true) {
          this.result.emit(resp);
          this.activeModal.close();
        } else {
        this.mensajeAlerta = this.mensaje1;
        this.alerta= true;
      }  
      }, (error) => {
        this.mensajeAlerta = this.mensaje1;
        this.alerta= true;
        console.log(error);
      });
  
    } 
  
  }

  public validarFormulario (): boolean{
  
    if (this.formGroup.invalid) {
      this. mensajeAlerta = this.mensaje5;
      this.alerta= true;
      return false;
    }

    if (this.validarRangoFecha()) {          
      this. mensajeAlerta = this.mensaje2;
      this.alerta= true;
      return false;
    }
  
    return true;
  }

  public validarRangoFecha() {    
    var fechaIngresada  = this.armarFecha();     
    const fechainicio = new Date( this.reglas.fechaDisponibleInicio);
    const fechafin = new Date(this.reglas.fechaDisponibleFin);  
    return fechaIngresada < fechafin &&  fechaIngresada > fechainicio ? false : true;
  }
  public armarFechaFormateada(fecha){
    fecha= new Date(fecha);
    var mes = fecha.getMonth() + 1;
    return fecha.getDate() + '/'+ mes + '/' + fecha.getFullYear()
  }

  public armarEntidad(){
    
    var array= this.obtenerProyecto();  

    this.modelo.idRegistro = this.inputModelo != null && this.inputCopia === false ? this.inputModelo.idRegistro  : 0; 
    this.modelo.estado = 1;
    this.modelo.estadoNombre = this.inputModelo != null && this.inputCopia === false ? this.inputModelo.estadoNombre : '';
    this.modelo.idUsuario = this.inputIdUsuario;
    this.modelo.nombreUsuario=  this.inputModelo != null && this.inputCopia === false ? this.inputModelo.nombreUsuario : '';
    this.modelo.registroVenta = array[0];
    this.modelo.proyecto = array[1];
    this.modelo.actividad = this.formGroup.value.actividad;
    this.modelo.fase = this.formGroup.value.fase;
    this.modelo.horas = this.armarHoras();
    this.modelo.fechaReporte = this. armarFecha();
    this.modelo.solcitud = this.formGroup.value.solicitud != undefined ? this.formGroup.value.solicitud : '' ; 
  }

  public armarFecha() {
    const fecha = this.formGroup.value.fechaReporte
    const fechaReporte = new Date (fecha.year + '-' + fecha.month + '-' + fecha.day );
    return fechaReporte
  }
  
  public armarHoras() {
    var tiempo : TiempoModel = new TiempoModel();
    tiempo.hora =  this.formGroup.value.horas.hour;
    tiempo.minuto =  this.formGroup.value.horas.minute;
    tiempo.segundo = 0;
    return tiempo;
  }
  

  search = (text$: Observable <string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 2 ? []
      : this.fuentesBuscador.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )

  public obtenerProyectos() {
    this.servicio.ObtenerProyectos()
    .subscribe(resp => {
      if (resp.estado === true) {
        const proyectos: ProyectoModel [] = JSON.parse(resp.mensaje1);
        proyectos.forEach(prom => {
         this.fuentesBuscador.push( `${prom.registroVenta}; ${prom.proyecto}`)
        });
      }

    }, (error) => {
      console.error(error);            
    });
  }

  public obtenerFases() {
    this.servicio.ObtenerFases()
    .subscribe(resp => {
      if (resp.estado === true) {
        this.fases = JSON.parse(resp.mensaje1) ;
      }

    }, (error) => {
      console.error(error);
      });
  }

  public obtenerReglas(){
    this.servicio.ObtenerReglas()
    .subscribe(resp => {
      if (resp.estado === true) {
        this.reglas = JSON.parse(resp.mensaje1) ;
        this.armarMensajeRangoFechas();
      }
    }, (error) => {
      console.error(error);
     });
  }

   public armarMensajeRangoFechas(){
    var fechaInicio = this.armarFechaFormateada(this.reglas.fechaDisponibleInicio);
    var fechaFin = this.armarFechaFormateada(this.reglas.fechaDisponibleFin);      
    this.mensaje2= this.mensaje2 + fechaInicio + '  al ' + fechaFin ;  
   }  

  public  CrearFormulario() {
    if (this.inputModelo === undefined || this.inputModelo === null) {
      this.nuevoFormulario();
      this.edicion = false;
      this.titulo = 'Nuevo Registro';
    }  else if (! this.inputCopia) {
      this.edicionFormulario();      
      this.titulo = 'Edición registro';
     } else if (this.inputCopia) {
      this.edicionFormulario();      
      this.titulo = 'Copia registro';
     }
  }


public nuevoFormulario() {
  const time = {hour: 0, minute: 0};
  this.formGroup = this.fb.group({
    idRegistro: ['', []],
    idUsuario: ['', [Validators.maxLength(50)]],
    registroVenta: ['', [Validators.maxLength(15)]],
    proyecto: ['', [Validators.required, Validators.maxLength(150),this.validarProyecto]],
    actividad: ['', [Validators.required, Validators.maxLength(500)]],
    fase: ['0', [Validators.required, Validators.maxLength(5),this.validarCombo]],
    horas: [time, [Validators.required,this.validarHoras]],
    fechaReporte: ['', [Validators.required, Validators.maxLength(5)]],
    solcitud : ['', [Validators.maxLength(10)]],
    estado: ['1', [Validators.maxLength(5)]]
  });

}

public edicionFormulario() {
  var fechaRegistro= this.armarObjetoFecha(this.inputModelo.fechaReporte);
  const hora = {hour: this.inputModelo.horas.hora, minute: this.inputModelo.horas.minuto};
  const proyecto = this.inputModelo.registroVenta + '; ' +this.inputModelo.proyecto; 
  
  this.formGroup = this.fb.group({
    idRegistro: [this.inputModelo.idRegistro, []],
    idUsuario: [this.inputModelo.idUsuario, [Validators.maxLength(50)]],
    registroVenta: [this.inputModelo.registroVenta, [Validators.maxLength(15)]],
    proyecto: [proyecto, [Validators.required, Validators.maxLength(150),this.validarProyecto]],
    actividad: [this.inputModelo.actividad, [Validators.required, Validators.maxLength(500)]],
    fase: [this.inputModelo.fase, [Validators.required, Validators.maxLength(5),this.validarCombo]],
    horas: [hora, [Validators.required,this.validarHoras]],
    fechaReporte: [fechaRegistro, [Validators.required, Validators.maxLength(5)]],
    solcitud : [this.inputModelo.solcitud, [Validators.maxLength(10)]],
    estado: ['1', [Validators.maxLength(5)]]
  });

}


public armarObjetoFecha(fecha: Date){
  var ObjetoFecha = {
    year: new Date(fecha).getFullYear(),
    month: new Date(fecha).getMonth() + 1,
    day: new Date(fecha).getDate()
  } 
  return ObjetoFecha
}

public getError(controlName: string): string {
  let error = '';
  const control = this.formGroup.get(controlName);
  if (control.touched && control.errors != null) {
    error = JSON.stringify(control.errors);
  }
  error = this.formatearError (error);
  return error;
}

public formatearError(objeto: string): string {
  if (objeto === '') {
    return objeto;
  }
  const obj = JSON.parse(objeto);
  let mensaje = '';

  if (obj.minlength) {
    mensaje = 'La longitud mínima de caracteres es de : ' + obj.minlength.requiredLength;
  } else if (obj.maxlength) {
    mensaje = 'Supero el límite de caracteres permitidos de: ' + obj.maxlength.requiredLength;
  } else if (obj.required) {
    mensaje = 'El campo es requerido';
  } else  if (obj.caractespeciales) {
    mensaje = obj.caractespeciales;
  } else if (obj.seleccioncombo) {
    mensaje = obj.seleccioncombo;
  } else if (obj.textoProyecto) {
    mensaje = obj.textoProyecto;
  } else if (obj.validarHoras) {
    mensaje = obj.validarHoras;
  } else if (obj.rangoFechas) {
    mensaje = obj.rangoFechas;
  }
  return mensaje;
}


public validarHoras(control: AbstractControl) {
  let result = null;
  result = control.value.hour === 0 && control.value.minute === 0 ? {cantidadHoras: 'Debe estableces algún tiempo' } : null   
  return result;
}

public validarProyecto(control: AbstractControl) {
  let result = null;
  var baseProyecto = control.value;
  baseProyecto = baseProyecto.split(';');
  result = baseProyecto.length != 2 ? {textoProyecto: 'Debe seleccionar un registro de la lista' } : null
   
  return result;
}

public validarCombo( control: AbstractControl){
  let result = null;  
  const valor = parseInt(control.value) ;
  return result = !Number.isInteger(valor) || valor === 0 ? result = {seleccioncombo: 'Debe seleccionar un valor de la lista'} : null  
}

public obtenerProyecto() {
  var baseProyecto = this.formGroup.value.proyecto;
  baseProyecto = baseProyecto.split(';');
    return baseProyecto; 
}

}
