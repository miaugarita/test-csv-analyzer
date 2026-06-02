import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import * as Papa from 'papaparse';

// Interface para estructura de datos CSV
interface DataTableValues {
  Folio: string;
  Fecha: string;
  Categoria: string;
  Monto: string;
  Estatus: string;
}

@Component({
  selector: 'app-root',

  standalone: true,

  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule, MatTableModule],

  templateUrl: './upload.html',
  styleUrl: './upload.scss',
})
export class App {
  // archivo seleccionado
  file: File | null = null;

  // datos CSV
  data: DataTableValues[] = [];

  // columnas tabla material
  displayedColumns: string[] = ['Folio', 'Fecha', 'Categoria', 'Monto', 'Estatus'];

  // guardar archivo seleccionado
  onFileSelected(event: any) {
    this.file = event.target.files[0];

    if (!this.file) {
      console.log('No file selected');
    }
  }

  // leer CSV
  onUpload() {
    if (!this.file) {
      console.log('No file selected');
      return;
    }

    Papa.parse(this.file, {
      header: true,
      skipEmptyLines: true,

      complete: (result) => {
        const parsedData = result.data as DataTableValues[];

        const folios = new Set<string>();
        const errors: string[] = [];

        //validar si hay datos
        if (!parsedData || parsedData.length === 0 || Object.keys(parsedData[0]).length === 0) {
          console.log('❌ El CSV solo contiene cabeceras o está vacío');
          return;
        }

        for (const [index, item] of parsedData.entries()) {
          const row = index + 1;

          // definir valores de campos
          const folio = String(item.Folio ?? '').trim();
          const fecha = String(item.Fecha ?? '').trim();
          const categoria = String(item.Categoria ?? '').trim();
          const monto = String(item.Monto ?? '').trim();
          const estatus = String(item.Estatus ?? '').trim();

          //campos vacíos
          if (!folio || !fecha || !categoria || !monto || !estatus) {
            errors.push(`❌ Fila ${row}: campos vacíos`);
            continue;
          }

          //duplicados
          if (folios.has(folio)) {
            errors.push(`❌ Fila ${row}: folio repetido (${folio})`);
            continue;
          }
          folios.add(folio);

          //validar monto
          if (isNaN(Number(monto))) {
            errors.push(`❌ Fila ${row}: monto inválido`);
            continue;
          }
        }

        // mostrar errores
        if (errors.length > 0) {
          console.log('ERRORES CSV:', errors);
          return;
        }

        // si todo está bien
        this.data = [...parsedData];

        console.log('CSV VALIDADO ✔️', this.data);
      },
    });
  }
}
