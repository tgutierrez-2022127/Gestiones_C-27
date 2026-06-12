import { IncidentReport } from '../interfaces/incident-report.interface';

export class ClassroomReportDTO {
    constructor(public readonly salon: string, public readonly fechaGeneracion: Date, public readonly reporte: IncidentReport) {}
    static create(salon: string, reporte: IncidentReport): ClassroomReportDTO {
        return new ClassroomReportDTO(salon, new Date(), reporte);
    }
}
