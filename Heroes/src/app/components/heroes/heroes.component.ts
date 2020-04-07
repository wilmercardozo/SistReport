import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../servicios/heroes.service';
import { Heroe } from 'src/app/Modelos/heroe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {

  heroes: Heroe[] = [];

  constructor(private _heroesService: HeroesService, private router: Router ) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {
    this._heroesService.getHeroes()
      .subscribe((heroesService: Heroe[]) => {
        this.heroes = heroesService;
      }, error => {
        console.log(error);
      });
  }


  btnCrear() {
    let heroe = new Heroe();
    heroe.Nombre = 'Batman';
    heroe.Bio = 'Los rasgos principales de Batman se resumen en «destreza física, habilidades deductivas y obsesión». La mayor parte de las características básicas de los cómics han variado por las diferentes interpretaciones que le han dado al personaje.';
    heroe.Img = 'assets/img/batman.png',
    heroe.Aparicion = '1939-05-01',
    heroe.Casa = 'DC';
    this._heroesService.createHeroe(heroe)
      .subscribe((heroeService: Heroe) => {
        this.router.navigate(['/heroes']);
      });
  }

}
