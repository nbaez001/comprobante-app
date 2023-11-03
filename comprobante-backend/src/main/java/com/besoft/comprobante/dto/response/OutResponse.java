package com.besoft.comprobante.dto.response;

import java.io.Serializable;

import com.besoft.comprobante.util.ConstanteUtil;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OutResponse<T> implements Serializable {

	private static final long serialVersionUID = 1L;
	private Integer rCodigo;
	private String rMensaje;
	private T objeto;

	public OutResponse() {
		this.rCodigo = ConstanteUtil.R_COD_EXITO;
		this.rMensaje = ConstanteUtil.R_MSG_EXITO;
	}

	public OutResponse(Integer rCodigo, String rMensaje) {
		this.rCodigo = rCodigo;
		this.rMensaje = rMensaje;
	}

	public OutResponse(Integer rCodigo, String rMensaje, T objeto) {
		this.rCodigo = rCodigo;
		this.rMensaje = rMensaje;
		this.objeto = objeto;
	}
}
