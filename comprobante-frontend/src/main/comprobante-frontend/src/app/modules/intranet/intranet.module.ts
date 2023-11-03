import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';

import { IntranetRoutingModule } from './intranet-routing.module';
import { MaterialModule } from '../material.module';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { MaestraComponent } from './components/config/maestra/maestra.component';
import { IntranetComponent } from './intranet.component';
import { PdfViewerComponent } from './components/shared/pdf-viewer/pdf-viewer.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { SharedModule } from '../shared.module';
import { SharedIntranetService } from './services/shared-intranet.service';
import { IconModule } from '../icon.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  entryComponents: [
    
  ],
  declarations: [
    IntranetComponent,
    NavbarComponent,
    MaestraComponent,
    PdfViewerComponent,
  ],
  imports: [
    CommonModule,
    IntranetRoutingModule,
    SharedModule,
    MaterialModule,
    IconModule,
    NgxExtendedPdfViewerModule,
  ],
  providers: [
    ...SharedIntranetService,
    DatePipe,
    DecimalPipe,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },//DATEPICKER MUESTRA LA FECHA EN FORMATO DD/MM/YYYY
  ]
})
export class IntranetModule { }
