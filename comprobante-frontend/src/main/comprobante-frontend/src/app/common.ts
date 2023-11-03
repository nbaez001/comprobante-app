export const APIS = {
    sunat: 'https://dniruc.apisperu.com/api/v1/ruc/',
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5iYWV6MDAxQGdtYWlsLmNvbSJ9.IeOAsr7D33ymILQ5dwg2F2HbAbDcKXwtqUrsIHGR8gw'
}

export const MENSAJES_PANEL = {
    INTRANET: {
        CONFIGURACION: {
            MAESTRA: {
                REGISTRAR: {
                    TITLE: 'REGISTRAR MAESTRA'
                },
                MODIFICAR: {
                    TITLE: 'MODIFICAR MAESTRA'
                },
                REGISTRARCHILD: {
                    TITLE: 'REGISTRAR SUB-ITEMS MAESTRA'
                }
            },
            CUENTABANCO: {
                REGISTRAR: {
                    TITLE: 'REGISTRAR CUENTA BANCARIA'
                },
                MODIFICAR: {
                    TITLE: 'MODIFICAR CUENTA BANCARIA'
                }
            }
        },
        ADMINISTRACION: {
            PRODUCTO: {
                REGISTRAR: {
                    TITLE: 'REGISTRAR PRODUCTO'
                },
                EDITAR: {
                    TITLE: 'MODIFICAR PRODUCTO'
                }
            },
            PROVEEDOR: {
                REGISTRAR: 'REGISTRAR PROVEEDOR',
                EDITAR: 'MODIFICAR PROVEEDOR',
                REGISTRAR_REP_LEGAL: 'REGISTRAR REPRESENTANTE LEGAL'
            },
            COMPROBANTE: {
                REGISTRAR: {
                    TITLE: 'REGISTRAR COMPROBANTE'
                },
                EDITAR: {
                    TITLE: 'MODIFICAR COMPROBANTE'
                }
            },
            CAJA: {
                REGISTRAR: {
                    TITLE: 'REGISTRAR CAJA'
                },
                EDITAR: {
                    TITLE: 'MODIFICAR CAJA'
                }
            },
        },
        OPERACIONES: {
            VENTA: {
                REGISTRAR: {
                    TITLE: 'REGISTRAR VENTA'
                },
                OBS_VENTA: {
                    TITLE: 'MENSAJE DE OBSERVACION DE VENTA'
                },
                ENVIAR_COMPROBANTE: {
                    TITLE: 'ENVIAR COMPROBANTE ELECTRONICO'
                },
                BUSCAR_PRODUCTO: {
                    TITLE: 'BUSCAR PRODUCTO POR DETALLE'
                },
                VER: {
                    TITLE: 'VER DETALLE VENTA'
                }
            },
            CAJERO: {
                REGISTRAR: {
                    TITLE: 'REGISTRAR CAJERO'
                },
                MODIFICAR: {
                    TITLE: 'MODIFICAR CAJERO'
                },
                CERRAR: {
                    TITLE: 'CERRAR CAJERO'
                }
            },
            NOTA_CREDITO: {
                REGISTRAR: {
                    TITLE: 'REGISTRAR NOTA CREDITO'
                },
                BUSCAR_COMPROBANTE: {
                    TITLE: 'BUSCAR COMPROBANTE'
                },
                OBS_VENTA: {
                    TITLE: 'MENSAJE DE OBSERVACION DE NOTA CREDITO'
                },
                ENVIAR_COMPROBANTE: {
                    TITLE: 'ENVIAR NOTA DE CREDITO ELECTRONICO'
                }
            },
        }
    }
};

export const MENSAJES = {
    ERROR_FOREIGN_KEY: 'No se eliminar una categoria que tiene sub items',
    EXITO_OPERACION: 'Operacion exitosa',
    MSG_CONFIRMACION: '¿Esta seguro de continuar?',
    MSG_USUARIO_NO_APETURA_CAJA: 'Usted no tiene ningun cajero aperturado, solicite al administrador que ingrese al menu OPERACIONES > CAJEROS y asigne una caja a su usuario',
    MSG_EXITO_VENTA: 'Se ha realizado la venta exitodamente'
};

export const MAESTRAS = {
    ESTADO_REGISTRO: 1,
    GENERO: 2,
    TIPO_PROVEEDOR: 3,
    TIPO_PRODUCTO: 4,
    ESTADO_CIVIL: 5,
    ESTADO_VENTA: 6,
    ESTADO_CAJERO: 7,
    TIPO_OPERACION: 8,
    ESTADO_NOTA_CREDITO: 9,
    PARAMETROS_POS: 10,


    TIPO_COMPROBANTE: 101,
    TIPO_UNIDAD_MEDIDA_COMERCIAL: 103,
    TIPO_DOCUMENTO_IDENTIDAD: 106,
    TIPO_NOTA_CREDITO: 109
};

export const TIPO_COMPROBANTE = {
    FACTURA: '01',
    BOLETA: '03',
    NOTA_CREDITO: '07',
    NOTA_DEBITO: '08',
    TICKET_MAQUINA_REGISTRADORA: '12',
};

export const TIPO_DOCUMENTO_IDENTIDAD = {
    RUC: '6',
    DNI: '1'
};

export const ACTIVO_LISTA: any[] = [{ id: 1, nombre: 'ACTIVO' }, { id: 0, nombre: 'INACTIVO' }]

export const CONSTANTES = {
    ACTIVO: 1,
    INACTIVO: 0,
    ID_MODULO_APP: 3,
    R_COD_EXITO: 0,
    COD_CONFIRMACION: 1,
    COD_SIN_CONFIRMACION: 0,
};
export const ESTADO_COMPROBANTE: any = {
    COD_REGITRADO: '00',
    COD_JSON_GENERADO: '01',
    COD_XML_GENERADO: '02',
    COD_ACEPTADO_SUNAT: '03',
    COD_ACEPTADO_SUNAT_OBS: '04',
    COD_RECHAZADO_SUNAT: '05',
    COD_ERROR_JSON: '06',
    COD_NO_PERFIL_ENV_COMPROB: '10',
    COD_ACEPTADO_REEN_SUNAT: '11',
    COD_ELIMINADO: '20',
}

export const ESTADO_CAJERO = {
    COD_PENDIENTE: '1',
    COD_APERTURADO: '2',
    COD_CERRADO: '3',
}

export const TIPO_OPERACION = {
    INGRESO: '1',
    EGRESO: '2',
}

export const ENVIAR_COMPROBANTE_SUNAT = {
    SI: '1',
    NO: '0',
}

export const MODULOS = {
    LOGISTICA: 'LOGISTICA',
    VENTAS: 'VENTAS'
}

// PARA LOGICA EN REGISTRO DE NOTAS DE CREDITO
export const TIPO_NOTA_CREDITO = {
    ANULACION_OPERACION: '01',
    ANULACION_ERROR_RUC: '02',
    CORRECCION_ERROR_DESCRIPCION: '03',
    DESCUENTO_GLOBAL: '04',
    DESCUENTO_X_ITEM: '05',
    DEVOLUCION_TOTAL: '06',
    DEVOLUCION_X_ITEM: '07',
    OTROS_CONCEPTOS: '10',
};