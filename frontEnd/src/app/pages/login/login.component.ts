import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/model/login.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MenuService } from 'src/app/services/menu.service';
import { promise } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginModel: LoginModel = new LoginModel();
  recordarme: boolean;
  formGroup: FormGroup;
  alerta : boolean;
  carga: boolean = false;
  mensajealerta: string;

  constructor(
    private loginSerivce: LoginService,
     private fb: FormBuilder,
     private menuServicio: MenuService,
     private router: Router) { }

  ngOnInit() {
    sessionStorage.clear();
    this.crearFormulario();
  }

  get usuarioNoValido() {
    return this.formGroup.get('usuario').invalid && this.formGroup.get('usuario').touched;
  }

  crearFormulario() {
    this.formGroup = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]]
    });
  }

  login() {

    if (this.formGroup.invalid) {
      return;
    }
    this. alerta= false;
    this.carga= true;   
    this.loginModel = this.formGroup.value;
    this.loginSerivce.login(this.loginModel)
      .subscribe(resp => {
        if(resp.estado) {        
        this.router.navigateByUrl('/proyectos');
        }
       else {
        this.alerta= true;
        this.mensajealerta= resp.mensaje1;
        }
        this.carga= false;
      
    }, (err) => {
      this.alerta= true;
      this.carga= false;
      this.mensajealerta='Se presentó un problema al  validar las credenciales';
    });

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
    }
    if (obj.maxlength) {
      mensaje = 'Supero el límite de caracteres permitidos de: ' + obj.maxlength.requiredLength;
    }
    if (obj.required) {
      mensaje = 'El campo es requerido';
    }
  return mensaje;
  }
}
