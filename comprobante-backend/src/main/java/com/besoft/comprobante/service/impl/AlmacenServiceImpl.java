package com.besoft.comprobante.service.impl;

import com.besoft.comprobante.dto.response.AlmacenListarResponse;
import com.besoft.comprobante.dto.response.FileResponse;
import com.besoft.comprobante.dto.response.OutResponse;
import com.besoft.comprobante.service.AlmacenService;
import com.besoft.comprobante.util.ConstanteUtil;
import com.besoft.comprobante.util.ReporteUtil;
import lombok.extern.slf4j.Slf4j;
import net.sf.jasperreports.engine.JRParameter;
import org.apache.commons.io.FileUtils;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.attribute.FileTime;
import java.util.List;
import java.util.*;

@Service
@Slf4j
public class AlmacenServiceImpl implements AlmacenService {

    @Autowired
    ReporteUtil reporteUtil;

    @Value("${reportes.files.comprobante}")
    private String comprobante;

    @Override
    public OutResponse<List<AlmacenListarResponse>> listarAlmacen() {
        log.info("[LISTAR ALMACEN][SERVICE][INICIO]");
        OutResponse<List<AlmacenListarResponse>> out = new OutResponse<>();
        List<AlmacenListarResponse> lista = new ArrayList<>();

        String directorio = "C:/Users/NERIO/Downloads";
        File directorioFile = new File(directorio);

        if (directorioFile.exists() && directorioFile.isDirectory()) {
            String[] extensiones = {ConstanteUtil.PDF, ConstanteUtil.JPEG};
            List<File> archivos = (List<File>) FileUtils.listFiles(directorioFile, extensiones, false);

            for (File archivo : archivos) {
                AlmacenListarResponse archivoData = new AlmacenListarResponse();
                archivoData.setNombre(archivo.getName());
                archivoData.setRuta(archivo.getAbsolutePath());

                try {
                    LinkOption[] options = {};
                    FileTime fechaCreacion = (FileTime) Files.getAttribute(archivo.toPath(), "creationTime", options);
                    archivoData.setFecha(new Date(fechaCreacion.toMillis()));
                } catch (IOException e) {
                    e.printStackTrace();
                }

                lista.add(archivoData);
            }

            // ORDER DESCENDENTE POR FECHA
            Collections.sort(lista, new Comparator<AlmacenListarResponse>() {
                @Override
                public int compare(AlmacenListarResponse objeto1, AlmacenListarResponse objeto2) {
                    return objeto2.getFecha().compareTo(objeto1.getFecha());
                }
            });

            out.setObjeto(lista);
        } else {
            out.setRCodigo(500);
            out.setRMensaje("El directorio no existe o no es válido.");
        }

        log.info("[LISTAR ALMACEN][SERVICE][FIN]");
        return out;
    }

    @Override
    public OutResponse<FileResponse> obtenerComprobante(AlmacenListarResponse req) {
        log.info("[OBTENER COMPROBANTE][SERVICE][INICIO]");
        OutResponse<FileResponse> out = new OutResponse<>();

        String fileExtension = obtenerExtension(req.getNombre());
        if (fileExtension.equals(ConstanteUtil.PDF)) {
            out = obtenerComprobantePdf(req);
        } else {
            out = obtenerComprobanteJpeg(req);
        }

        log.info("[OBTENER COMPROBANTE][SERVICE][FIN]");
        return out;
    }

    private OutResponse<FileResponse> obtenerComprobantePdf(AlmacenListarResponse req) {
        OutResponse<FileResponse> out = new OutResponse<>();
        try {
            byte[] bytes = extraerComprobantePdf(req.getRuta());
            bytes = convertirPdfAImagen(bytes);

            Map<String, Object> params = new HashMap<>();
            params.put("pLogoEmpresa", ImageIO.read(new ByteArrayInputStream(bytes)));

            Locale locale = new Locale("en", "US");
            params.put(JRParameter.REPORT_LOCALE, locale);

            log.info("[OBTENER COMPROBANTE][SERVICE][PARAMS-INPUT][" + params.toString() + "]");

            out = reporteUtil.generarReportePDF(comprobante, params, "comprobante.pdf");
            log.info("[IMPRIMIR COMPROBANTE VENTA][SERVICE][FIN]");
        } catch (IOException e) {
            log.info(e.getMessage());
            out.setRCodigo(500);
            out.setRMensaje(e.getMessage());
        }
        return out;
    }

    private byte[] extraerComprobantePdf(String ruta) {
        byte[] croppedPdfBytes = null;

        try {
            PDDocument documento = Loader.loadPDF(new File(ruta));

            int pageIndex = 0;
            PDPage pagina = documento.getPage(pageIndex);

            float x = 35;
            float y = 400;
            float ancho = 199;
            float alto = 10;

            pagina.setMediaBox(new PDRectangle(x, y, x + ancho, y + alto));

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            documento.save(outputStream);

            documento.close();

            croppedPdfBytes = outputStream.toByteArray();
            System.out.println("[OBTENER COMPROBANTE][SERVICE][EXITO]");
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("[OBTENER COMPROBANTE][SERVICE][EXCEPTION]");
        }
        return croppedPdfBytes;
    }

    private byte[] convertirPdfAImagen(byte[] croppedPdfBytes) {
        byte[] bytes = null;

        try {
            PDDocument document = Loader.loadPDF(croppedPdfBytes);

            PDFRenderer pdfRenderer = new PDFRenderer(document);

            BufferedImage bim = pdfRenderer.renderImageWithDPI(0, 300, ImageType.RGB);

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(bim, "png", baos); // You can change the format ("png", "jpg", etc.) as needed

            document.close();

            return baos.toByteArray();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return bytes;
    }

    private String obtenerExtension(String fileName) {
        String fileExtension = "";
        if (fileName != null) {
            int lastIndex = fileName.lastIndexOf(".");
            if (lastIndex != -1) {
                fileExtension = fileName.substring(lastIndex + 1);
            }
        }

        return fileExtension;
    }

    private OutResponse<FileResponse> obtenerComprobanteJpeg(AlmacenListarResponse req) {
        OutResponse<FileResponse> out = new OutResponse<>();
        try {
            byte[] bytes = extraerComprobanteJpeg(req.getRuta());

            Map<String, Object> params = new HashMap<>();
            params.put("pLogoEmpresa", ImageIO.read(new ByteArrayInputStream(bytes)));

            Locale locale = new Locale("en", "US");
            params.put(JRParameter.REPORT_LOCALE, locale);

            log.info("[OBTENER COMPROBANTE][SERVICE][PARAMS-INPUT][" + params.toString() + "]");

            out = reporteUtil.generarReportePDF(comprobante, params, "comprobante.pdf");
            log.info("[IMPRIMIR COMPROBANTE VENTA][SERVICE][FIN]");
        } catch (IOException e) {
            log.info(e.getMessage());
            out.setRCodigo(500);
            out.setRMensaje(e.getMessage());
        }
        return out;
    }

    private byte[] extraerComprobanteJpeg(String ruta) {
        byte[] croppedPdfBytes = null;

        try {
            BufferedImage originalImage = ImageIO.read(new File(ruta));

            int cropX = 50; // Adjust the left cropping boundary
            int cropY = 30; // Adjust the top cropping boundary
            int cropWidth = originalImage.getWidth() - 100; // Adjust the width of the cropped area
            int cropHeight = originalImage.getHeight() - 80; // Adjust the height of the cropped area

            // Crop the image
            BufferedImage croppedImage = originalImage.getSubimage(cropX, cropY, cropWidth, cropHeight);

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            ImageIO.write(croppedImage, "jpeg", outputStream);

            croppedPdfBytes = outputStream.toByteArray();
            System.out.println("[OBTENER COMPROBANTE][SERVICE][EXITO]");
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("[OBTENER COMPROBANTE][SERVICE][EXCEPTION]");
        }
        return croppedPdfBytes;
    }
}
