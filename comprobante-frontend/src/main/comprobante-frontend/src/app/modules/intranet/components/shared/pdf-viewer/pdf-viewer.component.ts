import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {
  base64Pdf: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.base64Pdf = this.data.objeto.data;
  }
}
