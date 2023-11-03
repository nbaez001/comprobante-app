package com.besoft.comprobante.dto.response;

import java.io.Serializable;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AlmacenListarResponse implements Serializable {
	private static final long serialVersionUID = 1L;

	private String ruta;
	private String nombre;
	private Date fecha;

}
