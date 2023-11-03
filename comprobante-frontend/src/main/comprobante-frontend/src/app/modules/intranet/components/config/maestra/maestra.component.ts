import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GenericService } from '../../../services/generic.service';
import { DatePipe } from '@angular/common';
import { OutResponse } from '../../../dto/response/out.response';
import { CONSTANTES } from 'src/app/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidationService } from 'src/app/core/services/validation.service';
import { FileResponse } from '../../../dto/response/file.response';
import { AlmacenListarResponse } from '../../../dto/response/almacen-listar.response';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-maestra',
  templateUrl: './maestra.component.html',
  styleUrls: ['./maestra.component.scss']
})
export class MaestraComponent implements OnInit {
  exportar = false;
  index: number;

  listaAlmacenResponse: AlmacenListarResponse[];

  displayedColumns: string[];
  dataSource: MatTableDataSource<AlmacenListarResponse>;
  isLoading: boolean = false;

  formularioGrp: FormGroup;
  formErrors: any;

  columnsGrilla = [
    {
      columnDef: 'nombre',
      header: 'Nombre',
      cell: (m: AlmacenListarResponse) => `${m.nombre}`
    }, {
      columnDef: 'fecha',
      header: 'Fecha',
      cell: (m: AlmacenListarResponse) => (m.fecha != null) ? `${this.datePipe.transform(m.fecha, 'dd/MM/yyyy h:mm a')}` : ''
    }];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    @Inject(ValidationService) private validationService: ValidationService,
    @Inject(GenericService) private genericService: GenericService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.formularioGrp = this.fb.group({
      fecInicio: ['', []],
      fecFin: ['', []],
    });

    this.formErrors = this.validationService.buildFormErrors(this.formularioGrp, this.formErrors);
    this.formularioGrp.valueChanges.subscribe((val: any) => {
      this.validationService.getValidationErrors(this.formularioGrp, this.formErrors, false);
    });

    this.listaAlmacenResponse = [];

    this.definirTabla();
    this.inicializarVariables();
  }

  inicializarVariables(): void {
    this.buscar();
  }

  definirTabla(): void {
    this.displayedColumns = [];
    this.columnsGrilla.forEach(c => {
      this.displayedColumns.push(c.columnDef);
    });
    this.displayedColumns.unshift('id');
    this.displayedColumns.push('opt');
  }

  public cargarDatosTabla(): void {
    if (this.listaAlmacenResponse.length > 0) {
      this.dataSource = new MatTableDataSource(this.listaAlmacenResponse);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.dataSource = new MatTableDataSource([]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  buscar(): void {
    this.dataSource = null;
    this.isLoading = true;

    this.genericService.listarComprobantes().subscribe(
      (data: OutResponse<AlmacenListarResponse[]>) => {
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.listaAlmacenResponse = data.objeto;
        } else {
          this.listaAlmacenResponse = [];
        }
        this.cargarDatosTabla();
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this._snackBar.open(error.statusText, '✖', { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
        this.isLoading = false;
      }
    );
  }

  imprimirComprobante(obj: AlmacenListarResponse): void {
    this.spinner.show();

    this.genericService.obtenerComprobante(obj).subscribe(
      (data: OutResponse<FileResponse>) => {
        console.log(data);
        this.spinner.hide();
        if (data.rcodigo == 0) {
          let blob = this.genericService.convertToBlobFromByte(data.objeto);
          this.genericService.printPDF(blob)
        } else {
          this._snackBar.open(data.rmensaje, '✖', { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
        }
      },
      error => {
        this.spinner.hide();
        console.log(error);
        this._snackBar.open(error.statusText, '✖', { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
      }
    );
  }
}
