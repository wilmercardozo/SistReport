
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';

import { ProyectoComponent } from '../formularios/proyecto/proyecto.component';
import { AutomaticoComponent } from './automatico/automatico.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule
  ],
  declarations: [
    ProyectoComponent,
    AutomaticoComponent
  ],
  exports: [
    ProyectoComponent,
    AutomaticoComponent
  ]
})

export class FormulariosModule { }
