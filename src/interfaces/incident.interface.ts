import { Priority, IncidentStatus } from '../types';

export interface Incident {
    readonly id: string;
    titulo: string;
    descripcion: string;
    reportadoPor: string;
    prioridad: Priority;
    estado: IncidentStatus;
    fechaCreacion: Date;
}
