import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { LoginModel } from '../model/login.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = 'http://localhost:53313/api';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  login( login: LoginModel ) {

    return this.http.post( `${this.url}/login/authenticate`, login )
    .pipe(
      map( (resp: string) => {
        
        var respJson= JSON.parse(resp);
        if ( respJson.estado){
          this.guardarToken( respJson.mensaje1,login);
        }      
        
        return respJson;
      })
    );
    }

    private guardarToken( idToken: string, login: LoginModel ) {

      this.tokenStorage.dispatch(idToken, login);
  }
}
