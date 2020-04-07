import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Heroe } from '../Modelos/heroe';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HeroesService {

  constructor( private _http: HttpClient ) {}

  getQuery( query?: string ) {
    const url = `http://localhost:3000/heroes/${query}`;
    return this._http.get(url);
  }

  getHeroes() {
    return this.getQuery('')
    .pipe(map(data => data));
  }

  getHeroe(Index: number) {
    return this.getQuery(Index.toString())
    .pipe(map(data => data));
  }

  buscarHeroes( termino: string ): Heroe[] {
    let heroesArr: Heroe[] = [];
    // termino = termino.toLowerCase();

    // for (let heroe of this.heroes) {
    //    let nombre = heroe.Nombre.toLowerCase();
    //   if (nombre.indexOf(termino) >= 0) {
    //     heroesArr.push(heroe);
    //   }
    // }

    return heroesArr;
  }

  createHeroe( heroe: Heroe ) {
    const url = `http://localhost:3000/heroes/`;
    return this._http.post( url, heroe );
  }

}


