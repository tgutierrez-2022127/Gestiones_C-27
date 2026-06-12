import { Priority, IncidentStatus } from '../types';

export interface IncidentReport {
    salon: string;
    totalIncidentes: number;
    incidentesPorPrioridad: { Alta: number; Media: number; Baja: number; };
    incidentesPorEstado: { Abierto: number; 'En Progreso': number; Resuelto: number; };
    incidentesOrdenados: Array<{ id: string; titulo: string; prioridad: Priority; estado: IncidentStatus; reportadoPor: string; fechaCreacion: Date; }>;
}
