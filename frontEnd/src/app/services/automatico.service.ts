import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AutomaticoModel } from '../model/automatico.model';
import { registroModel } from '../model/registro.model';
import { AutomaticoPorUsuarioModel } from '../model/automaticoPorUsuario.model';

@Injectable({
  providedIn: 'root'
})
export class AutomaticoService {
  private headers = {Authorization:''};
  private url: string;

  constructor(
    private http: HttpClient, 
    private tokenStorage: TokenStorageService,
    private loginService: LoginService,
    private router: Router) { }

    ObtenerProyectos() {
      this.obtenerToken();
      const headers = this.headers;
      this.url = this.tokenStorage.ObtenerURL();

      return this.http.post<any>(`${this.url}/automatico/ObtenerProyectos`, '', { headers })
        .pipe(
          map((resp) => {
            return JSON.parse(resp);
          })
        );
    }

    ObtenerUsuarios() {
      this.obtenerToken();
      const headers = this.headers;
      this.url = this.tokenStorage.ObtenerURL();

      return this.http.post<any>(`${this.url}/automatico/ObtenerUsuarios`, '', { headers })
        .pipe(
          map((resp) => {
            return JSON.parse(resp);
          })
        );
    }

    ObtenerAutomaticosPorUsuario() {
      this.obtenerToken();
      const headers = this.headers;
      this.url = this.tokenStorage.ObtenerURL();

      return this.http.post<any>(`${this.url}/automatico/ObtenerAutomaticosPorUsuario`, '', { headers })
        .pipe(
          map((resp) => {
            return JSON.parse(resp);
          })
        );
    }

    ActualizarAutomaticosPorUsuario(automatico: AutomaticoPorUsuarioModel) {
      this.obtenerToken();
      const headers = this.headers;
      this.url = this.tokenStorage.ObtenerURL();

      return this.http.post<any>(`${this.url}/automatico/GuardarAutomatico`,
        automatico,
        { headers })
        .pipe(
          map((resp: string) => {
            return JSON.parse(resp);
          })
        );
    }

    EliminarAutomaticosPorUsuario (registro: registroModel) {
      this.obtenerToken();
      const headers = this.headers;
      this.url = this.tokenStorage.ObtenerURL();
     const id:Number = 2;
      return this.http.post<any>(`${this.url}/automatico/DesabilitarAutomatico`, registro, { headers })
        .pipe(
          map((resp) => {
            return JSON.parse(resp);
          })
        );
    }

    // EliminarAutomaticosPorUsuario(idUsuario) {
    //   this.obtenerToken();
    //   const headers = this.headers;
    //   this.url = this.tokenStorage.ObtenerURL();

    //   return this.http.post<any>(`${this.url}/automatico/EliminarAutomatico`,
    //     idUsuario,
    //     { headers })
    //     .pipe(
    //       map((resp: string) => {
    //         return JSON.parse(resp);
    //       })
    //     );
    // }
    
    obtenerToken() {
      this.tokenStorage.select$()
        .subscribe(resp => {         ;
         var token: string=  resp == '' || resp == null || resp == undefined?  this.tokenStorage.ObtenerCookie(): resp         
         token == '' || token == null || token == undefined? this.router.navigateByUrl('/login'):  
         this.headers.Authorization =  'Bearer ' + token; 
        });
  
    }

}
