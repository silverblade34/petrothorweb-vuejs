import { reportesData } from '../services/ReportsService';
import XLSX from 'xlsx';

export function exportarDatosAExcel(consulta) {
  return new Promise((resolve, reject) => {
    reportesData(consulta.cliente, consulta.cisterna, consulta.fechaDesde, consulta.fechaHasta)
      .then(response => {
        const dataExportar = response.data.data.map((resultado) => ({
          id: resultado.id,
          Ticket: resultado.idticket,
          Cisterna: resultado.codcisterna,
          Nombre: resultado.nombre,
          Cliente: resultado.cliente,
          Detalle: resultado.detalle,
          Conductor: resultado.conductor,
          Equipo: resultado.equipo,
          Facturación: resultado.facturacion,
          Fecha: resultado.fecha,
          Galones: resultado.galones,
          Horometro: resultado.horometro,
          Odometro: resultado.odometro,
          Punto: resultado.punto,
          Recibido_por: resultado.recibido,
          Guia: resultado.guia,
          Latitud: resultado.latitud,
          Longitud: resultado.longitud,
        }));

        // Crear una hoja de cálculo de Excel
        const workbook = XLSX.utils.book_new();
        // Convertir la matriz de datos a una hoja de cálculo de Excel
        const worksheet = XLSX.utils.json_to_sheet(dataExportar);
        // Agregar la hoja de cálculo al libro de trabajo
        const sheetName = 'Datos';
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

        // Guardar el archivo de Excel
        XLSX.writeFile(workbook, 'reporte.xlsx', { bookType: 'xlsx', type: 'buffer' });

        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
}
