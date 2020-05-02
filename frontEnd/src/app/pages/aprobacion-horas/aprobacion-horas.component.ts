import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aprobacion-horas',
  templateUrl: './aprobacion-horas.component.html',
  styleUrls: ['./aprobacion-horas.component.css']
})
export class AprobacionHorasComponent implements OnInit {

  public showCard: boolean;
  constructor() { }

  ngOnInit(): void {
    this.showCard = true;
  }

}
