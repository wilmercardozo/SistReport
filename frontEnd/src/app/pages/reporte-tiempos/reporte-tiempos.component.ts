import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte-tiempos',
  templateUrl: './reporte-tiempos.component.html',
  styleUrls: ['./reporte-tiempos.component.scss']
})
export class ReporteTiemposComponent implements OnInit {

  public showCard: boolean;

  constructor() { }

  ngOnInit(): void {
    this.showCard = true;
  }

}
