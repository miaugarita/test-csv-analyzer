import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { CsvUploadComponent } from './app/components/csv-upload/csv-upload';

bootstrapApplication(CsvUploadComponent, appConfig)
  .catch((err) => console.error(err));


