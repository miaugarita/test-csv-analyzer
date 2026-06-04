import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { CsvApiService } from '../../services/api-csv';
import { DataTableValues } from '../../model';


@Component({
  selector: 'csv-upload',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
  ],
  templateUrl: './csv-upload.html',
  styleUrl: './csv-upload.scss',
})

export class CsvUploadComponent {

  // archivo seleccionado
  file: File | null = null;

  // datos válidos
  data: DataTableValues[] = [];

  // errores
  errors: string[] = [];

  // columnas tabla
  displayedColumns: string[] = [
    'Folio',
    'Fecha',
    'Categoria',
    'Monto',
    'Estatus'
  ];

  //INYECTAR SERVICIO
  constructor(
    private csvApiService: CsvApiService,
    private cdr: ChangeDetectorRef
  ) {}

  // seleccionar archivo
  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  // procesar CSV
  async onUpload() {

console.log('CLICK');

    if (!this.file) {
      console.log('No file selected');
      return;
    }

console.log('Procesando:', this.file.name);

    //parsear CSV
    const parsedData = await this.csvApiService.parseCsv(this.file);

 console.log('Datos parseados:', parsedData);

    //validar CSV
    const validation = this.csvApiService.validateCsvData(parsedData, {
      requiredFields: [
        'Folio',
        'Fecha',
        'Categoria',
        'Monto',
        'Estatus'
      ],
      uniqueField: 'Folio',
      numericFields: [
        'Monto',
        'Estatus'
      ],
    });

    this.errors = validation.errors;

    // detener flujo si hay errores
    if (!validation.isValid) {
      this.data = [];
      this.cdr.detectChanges();
      return;
    }

    this.data = [...validation.data];
    //refrescas
    this.cdr.detectChanges();
  }
}
