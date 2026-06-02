import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import * as Papa from 'papaparse';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './upload.html',
  styleUrl: './upload.scss'
})
export class App {

  //inicializar variable para almacenar archivo
  file: File | null = null;
  data: any[] = [];

  //Fn: guardar archivo seleccionado en variable : file
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (!this.file) {
      console.log('No file selected');  // pendiente validación
    }
  }

  onUpload() {

    if (!this.file) {
      console.log('No file selected');
      return;
    }

    Papa.parse(this.file, {

      header: true,
      skipEmptyLines: true,

      complete: (result) => {

        this.data = result.data as any[];

        console.log('CSV DATOS:', this.data); // info de tabla
      },

      // pendientes validaciones

    });
  }


}
