import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { LoginModel } from '../model/login.model';



@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private llave: string = 'dWdvjovACPYoQx6teXTt';
  private url = 'http://localhost:53313/api';
  private token = '';
  private token$ = new BehaviorSubject<string>('');

  constructor() { }


  public select$ = () => this.token$.asObservable();
  public dispatch( token, login: LoginModel ) {

    sessionStorage.clear();
    sessionStorage.setItem('parametros', CryptoJS.AES.encrypt(JSON.stringify(login),this.llave).toString());
    sessionStorage.setItem('cookie', CryptoJS.AES.encrypt(token, this.llave).toString());

    this.token = token;
    this.token$.next(this.token);

  }

  ObtenerParametros() {
    var login = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('parametros'),this.llave).toString(CryptoJS.enc.Utf8));
    return login;
  }

  ObtenerCookie() {
    return  CryptoJS.AES.decrypt(sessionStorage.getItem('cookie') == null ? '' : sessionStorage.getItem('cookie')  ,this.llave).toString(CryptoJS.enc.Utf8);    
  }

  public ObtenerURL(){
   return this.url;
  }
}
