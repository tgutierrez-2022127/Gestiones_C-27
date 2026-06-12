import { Incident } from '../interfaces/incident.interface';
import { CreateIncidentDTO, UpdateIncidentStatusDTO } from '../dtos/create-incident.dto';
import { IncidentReport } from '../interfaces/incident-report.interface';
import { Priority, IncidentStatus } from '../types';

export class IncidentService {
    private incidents: Map<string, Incident> = new Map();

    createIncident(dto: CreateIncidentDTO): Incident {
        const id = 'INC-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        const newIncident: Incident = {
            id: id,
            titulo: dto.titulo,
            descripcion: dto.descripcion,
            reportadoPor: dto.reportadoPor,
            prioridad: dto.prioridad,
            estado: 'Abierto',
            fechaCreacion: new Date()
        };
        this.incidents.set(id, newIncident);
        return newIncident;
    }

    getAllIncidents(): Incident[] {
        return Array.from(this.incidents.values());
    }

    generateClassroomReport(salon: string): IncidentReport {
        const allIncidents = this.getAllIncidents();
        
        const incidentesPorPrioridad = {
            Alta: 0,
            Media: 0,
            Baja: 0
        };
        
        const incidentesPorEstado = {
            Abierto: 0,
            'En Progreso': 0,
            Resuelto: 0
        };
        
        const priorityOrder = {
            'Alta': 1,
            'Media': 2,
            'Baja': 3
        };
        
        const incidentesOrdenados = [...allIncidents].sort((a, b) => {
            return priorityOrder[a.prioridad] - priorityOrder[b.prioridad];
        });
        
        allIncidents.forEach(incident => {
            incidentesPorPrioridad[incident.prioridad]++;
            incidentesPorEstado[incident.estado]++;
        });
        
        return {
            salon: salon,
            totalIncidentes: allIncidents.length,
            incidentesPorPrioridad: incidentesPorPrioridad,
            incidentesPorEstado: incidentesPorEstado,
            incidentesOrdenados: incidentesOrdenados.map(inc => ({
                id: inc.id,
                titulo: inc.titulo,
                prioridad: inc.prioridad,
                estado: inc.estado,
                reportadoPor: inc.reportadoPor,
                fechaCreacion: inc.fechaCreacion
            }))
        };
    }
}