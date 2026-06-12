import { ClassroomReportDTO } from '../dtos/incident-report.dto';

export class ReportGenerator {
    static printReport(reportDTO: ClassroomReportDTO): void {
        console.log('\n' + '='.repeat(80));
        console.log('REPORTE DE INCIDENTES - SALON ' + reportDTO.salon);
        console.log('='.repeat(80));
        console.log('Fecha: ' + reportDTO.fechaGeneracion.toLocaleString());
        console.log('='.repeat(80));
        
        const report = reportDTO.reporte;
        
        console.log('\nTotal incidentes: ' + report.totalIncidentes);
        console.log('\nAlta: ' + report.incidentesPorPrioridad.Alta + ' | Media: ' + report.incidentesPorPrioridad.Media + ' | Baja: ' + report.incidentesPorPrioridad.Baja);
        console.log('\nAbierto: ' + report.incidentesPorEstado.Abierto + ' | En Progreso: ' + report.incidentesPorEstado['En Progreso'] + ' | Resuelto: ' + report.incidentesPorEstado.Resuelto);
        
        console.log('\nLISTADO ORDENADO POR PRIORIDAD:');
        
        for (let i = 0; i < report.incidentesOrdenados.length; i++) {
            const inc = report.incidentesOrdenados[i];
            console.log((i + 1) + '. [' + inc.prioridad + '] ' + inc.titulo + ' - ' + inc.reportadoPor);
        }
        
        console.log('\n' + '='.repeat(80));
    }
}