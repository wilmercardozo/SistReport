import { Injectable } from '@angular/core';
import { ProyectoModel } from '../model/proyecto.model';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { map } from 'rxjs/operators';
import { LoginModel } from '../model/login.model';
import { error } from 'protractor';
import { LoginService } from './login.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  url = 'http://localhost:53313/api';
  token = '';
  headers = {Authorization:''};

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private loginService: LoginService,private router: Router ) { }

  nuevoProyecto(proyectoModel: ProyectoModel) {
    this.obtenerToken();
    const headers = this.headers;
    return this.http.post<any>(`${this.url}/proyecto/NuevoProyecto`,
      proyectoModel,
      { headers })
      .pipe(
        map((resp: string) => {
          return JSON.parse(resp);
        })
      );
  }

  editarProyecto(proyectoModel: ProyectoModel) {
    this.obtenerToken();
    const headers = this.headers;
    return this.http.post<any>(`${this.url}/proyecto/EditarProyecto`,
      proyectoModel,
      { headers })
      .pipe(
        map((resp: string) => {
          return JSON.parse(resp);
        })
      );
  }

  ObtenerParametros() {
    this.obtenerToken();
    const headers = this.headers;
    return this.http.post<any>(`${this.url}/proyecto/Parametros`, '', { headers })
      .pipe(
        map((resp) => {
          return JSON.parse(resp);
        })
      );
  }

  ObtenerListaProyectos() {
    this.obtenerToken();
    const headers = this.headers;
    return this.http.post<any>(`${this.url}/proyecto/Proyectos`, '', { headers })
      .pipe(
        map((resp) => {
          return JSON.parse(resp);
        })
      );
  }

  ObtenerProyecto(RegistroVenta: string) {
    this.obtenerToken();
    const headers = this.headers;
    return this.http.post<any>(`${this.url}/proyecto/Proyecto`, RegistroVenta, { headers })
      .pipe(
        map((resp) => {
          return JSON.parse(resp);
        })
      );
  }

  DesabilitarProyecto (RegistroVenta: string) {
    this.obtenerToken();
    const headers = this.headers;
    return this.http.post<any>(`${this.url}/proyecto/DesabilitarProyecto`, RegistroVenta, { headers })
      .pipe(
        map((resp) => {
          return JSON.parse(resp);
        })
      );
  }

  obtenerToken() {

    this.tokenStorage.select$()
      .subscribe(resp => {
       // this.headers = { 'Authorization': 'Bearer ' + resp };
       var token: string=  resp == '' || resp == null || resp == undefined?  this.tokenStorage.ObtenerCookie(): resp
       
       token == '' || token == null || token == undefined? this.router.navigateByUrl('/login'):

       this.headers.Authorization =  'Bearer ' + token;

        
      });

  }

}
