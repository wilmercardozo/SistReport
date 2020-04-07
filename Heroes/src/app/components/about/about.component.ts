import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../Modelos/heroe';
import { HeroesService } from '../../servicios/heroes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {

  constructor( ) { }

  ngOnInit() {
  }

}
