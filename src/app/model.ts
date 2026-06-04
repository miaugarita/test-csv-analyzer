export interface DataTableValues {
  Folio: string;
  Fecha: string;
  Categoria: string;
  Monto: number;
  Estatus: number;
}

export interface CsvSummary {
  totalRecords: number;
  totalAmount: number;
  byStatus: Record<string, number>;
  byCategory: Record<string, number>;
}

export interface CsvValidationConfig {
  requiredFields: (keyof DataTableValues)[];
  uniqueField: keyof DataTableValues;
  numericFields?: (keyof DataTableValues)[];
}

export interface CsvValidationResult {
  isValid: boolean;
  data: DataTableValues[];
  errors: string[];
}
