import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OutResponse } from '../dto/response/out.response';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileResponse } from '../dto/response/file.response';
import { AlmacenListarResponse } from '../dto/response/almacen-listar.response';
import * as printJS from 'print-js';

@Injectable()
export class GenericService {

  constructor(private http: HttpClient) { }

  public listarComprobantes(): Observable<OutResponse<AlmacenListarResponse[]>> {
    return this.http.get<OutResponse<AlmacenListarResponse[]>>(`${environment.siserpInterbankUrl}/comprobantes/listarComprobantes`);
  }

  public obtenerComprobante(req: AlmacenListarResponse): Observable<OutResponse<FileResponse>> {
    return this.http.post<OutResponse<FileResponse>>(`${environment.siserpInterbankUrl}/comprobantes/obtenerComprobante`, req);
  }

  public convertArchivoToBlob(data: Blob): Blob {
    return new Blob([data], { type: 'application/pdf' });
  }

  public convertToBlobFromByte(fResp: any): Blob {
    const byteCharacters = atob(fResp.data);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: fResp.type });
    const resultBlob: any = blob;
    resultBlob.lastModifiedDate = new Date();
    resultBlob.name = fResp.nombre;

    return blob;
  }

  public printPDF(blob: any): void {
    const blobObject = new Blob([blob], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blobObject);
    //window.open(url);
    printJS({
      printable: url,
      type: 'pdf',
    })
  }
}
