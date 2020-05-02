import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { map } from 'rxjs/operators';
import { MenuModel } from '../model/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }


  obtenerMenu() {
    let token = '';
    this.tokenStorage.select$().subscribe(resp => token = resp);

    return this.http.get('')
      .pipe(
        map((resp: MenuModel) => {
          return resp;
        })
      );
  }

}
