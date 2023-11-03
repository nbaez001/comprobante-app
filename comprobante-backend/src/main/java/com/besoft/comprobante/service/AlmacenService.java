package com.besoft.comprobante.service;

import java.util.List;

import com.besoft.comprobante.dto.response.AlmacenListarResponse;
import com.besoft.comprobante.dto.response.FileResponse;
import com.besoft.comprobante.dto.response.OutResponse;

public interface AlmacenService {

	public OutResponse<List<AlmacenListarResponse>> listarAlmacen();

	public OutResponse<FileResponse> obtenerComprobante(AlmacenListarResponse req);
}
