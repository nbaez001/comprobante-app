package com.besoft.comprobante.util;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.besoft.comprobante.dto.response.FileResponse;
import com.besoft.comprobante.dto.response.OutResponse;

import lombok.extern.slf4j.Slf4j;
import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.export.JRPdfExporter;

@Component
@Slf4j
public class ReporteUtil {

	public OutResponse<FileResponse> generarReportePDF(String urlReporte, Map<String, Object> params,
			String reportName) {
		OutResponse<FileResponse> out = new OutResponse<>();

		JRPdfExporter exporter = new JRPdfExporter();
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

		try {
			InputStream targetStream = this.getClass().getClassLoader().getResourceAsStream(urlReporte);

			JasperPrint jp = JasperFillManager.fillReport(targetStream, params, new JREmptyDataSource());

			exporter.setParameter(JRExporterParameter.JASPER_PRINT, jp);
			exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, outputStream);
			exporter.exportReport();

			FileResponse resp = new FileResponse();
			resp.setNombre(reportName);
			resp.setType("application/pdf");
			resp.setData(outputStream.toByteArray());

			out.setRCodigo(0);
			out.setRMensaje("EXITO");
			out.setObjeto(resp);
		} catch (JRException e) {
			log.info("Unable to process download");
			out.setRCodigo(500);
			out.setRMensaje(e.getMessage());
			out.setObjeto(null);
		} 
		return out;
	}
}