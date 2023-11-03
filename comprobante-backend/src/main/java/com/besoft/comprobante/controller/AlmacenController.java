package com.besoft.comprobante.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.besoft.comprobante.dto.response.AlmacenListarResponse;
import com.besoft.comprobante.dto.response.FileResponse;
import com.besoft.comprobante.dto.response.OutResponse;
import com.besoft.comprobante.service.AlmacenService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/comprobante-backend/comprobantes")
@Slf4j
public class AlmacenController {
	
	@Autowired
	AlmacenService almacenService;

	@GetMapping("/listarComprobantes")
	public OutResponse<List<AlmacenListarResponse>> listarAlmacen() {
		log.info("[REGISTRAR ALMACEN][CONTROLLER][INICIO]");
		OutResponse<List<AlmacenListarResponse>> out = almacenService.listarAlmacen();
		log.info("[REGISTRAR ALMACEN][CONTROLLER][FIN]");
		return out;
	}
	
	@PostMapping("/obtenerComprobante")
	public OutResponse<FileResponse> obtenerComprobante(@RequestBody AlmacenListarResponse req) {
		log.info("[OBTENER COMPROBANTE][CONTROLLER][INICIO]");
		OutResponse<FileResponse> out = almacenService.obtenerComprobante(req);
		log.info("[OBTENER COMPROBANTE][CONTROLLER][FIN]");
		return out;
	}

}
