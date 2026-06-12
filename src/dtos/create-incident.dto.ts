import { Priority, IncidentStatus } from '../types';

export interface CreateIncidentDTO {
    titulo: string;
    descripcion: string;
    reportadoPor: string;
    prioridad: Priority;
}

export interface UpdateIncidentStatusDTO {
    id: string;
    nuevoEstado: IncidentStatus;
}
