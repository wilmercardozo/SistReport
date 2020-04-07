import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../servicios/heroes.service';
import { ActivatedRoute } from '@angular/router';
import { Heroe } from 'src/app/Modelos/heroe';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent {

  Heroe: Heroe = new Heroe();

  constructor(private _heroesService: HeroesService,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this._heroesService.getHeroe(params['id'])
        .subscribe( (heroeService: Heroe ) => {
          this.Heroe = heroeService;
        });
    });
  }

}
